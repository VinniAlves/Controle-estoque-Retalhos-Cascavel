import { pool } from '../db/pool';
import { PartCreateDTO, PartUpdateDTO } from '../schemas/parts.schema';
import { ilike, hasText } from '../utils/sql';

export async function createPart(data: PartCreateDTO) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // status automático também é garantido via trigger
    const insertPart = `
      insert into estoque.parts
      (codigo_peca, peca, descricao, marca, veiculo, modelo, ano, status_id, codigo_fabricante,
       valor, peso, altura, comprimento, largura, localizacao, link_mercado, quantidade)
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
      returning id, status_id
    `;
    const values = [
      data.codigoPeca, data.peca, data.descricao ?? null, data.marca ?? null,
      data.veiculo ?? null, data.modelo ?? null, data.ano ?? null, data.statusId ?? null,
      data.codigoFabricante ?? null, data.valor ?? null, data.peso ?? null, data.altura ?? null,
      data.comprimento ?? null, data.largura ?? null, data.localizacao ?? null,
      data.linkMercado ?? null, data.quantidade ?? 0
    ];
    const { rows } = await client.query(insertPart, values);
    const partId = rows[0].id;

    if (data.imagensBase64 && data.imagensBase64.length) {
      const insertImg = `
        insert into estoque.part_images (part_id, base64, position)
        values ($1,$2,$3)
      `;
      for (let i = 0; i < data.imagensBase64.length; i++) {
        await client.query(insertImg, [partId, data.imagensBase64[i], i]);
      }
    }

    await client.query('COMMIT');
    return partId;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function updatePart(id: number, data: Partial<PartUpdateDTO> & {
  imagensParaAdicionar?: string[],
  imagensParaExcluir?: number[],
  imagensParaSubstituir?: { id: number, base64: string }[]
}) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Monta update dinâmico (somente campos enviados)
    const sets: string[] = [];
    const vals: any[] = [];
    let idx = 1;

    const map: Record<string, any> = {
      codigo_peca: data.codigoPeca,
      peca: data.peca,
      descricao: data.descricao,
      marca: data.marca,
      veiculo: data.veiculo,
      modelo: data.modelo,
      ano: data.ano,
      status_id: data.statusId,
      codigo_fabricante: data.codigoFabricante,
      valor: data.valor,
      peso: data.peso,
      altura: data.altura,
      comprimento: data.comprimento,
      largura: data.largura,
      localizacao: data.localizacao,
      link_mercado: data.linkMercado,
      quantidade: data.quantidade
    };

    for (const k of Object.keys(map)) {
      const v = (map as any)[k];
      if (v !== undefined) {
        sets.push(`${k} = $${idx++}`);
        vals.push(v);
      }
    }

    if (sets.length) {
      const sql = `update estoque.parts set ${sets.join(', ')} where id = $${idx} and deleted_at is null`;
      vals.push(id);
      await client.query(sql, vals);
    }

    // Imagens: excluir
    if (data.imagensParaExcluir?.length) {
      await client.query(
        `delete from estoque.part_images where part_id = $1 and id = any($2::bigint[])`,
        [id, data.imagensParaExcluir]
      );
    }

    // Imagens: substituir
    if (data.imagensParaSubstituir?.length) {
      for (const item of data.imagensParaSubstituir) {
        await client.query(
          `update estoque.part_images set base64 = $1 where id = $2 and part_id = $3`,
          [item.base64, item.id, id]
        );
      }
    }

    // Imagens: adicionar (respeitar máximo 10)
    if (data.imagensParaAdicionar?.length) {
      const { rows } = await client.query(
        `select count(*)::int as total from estoque.part_images where part_id = $1`, [id]
      );
      const totalAtual = rows[0].total as number;
      const disponiveis = Math.max(0, 10 - totalAtual);
      const aAdicionar = data.imagensParaAdicionar.slice(0, disponiveis);

      const insertImg = `insert into estoque.part_images (part_id, base64, position) values ($1,$2,$3)`;
      let posStart = totalAtual;
      for (let i = 0; i < aAdicionar.length; i++) {
        await client.query(insertImg, [id, aAdicionar[i], posStart + i]);
      }
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function listParts(filters: {
  page?: string; pageSize?: string;
  codigoPeca?: string; codigoFabricante?: string; marca?: string; veiculo?: string;
  ano?: string; peca?: string; descricao?: string; statusId?: string;
}) {
  const { page, pageSize, codigoPeca, codigoFabricante, marca, veiculo, ano, peca, descricao, statusId } = filters;

  const where: string[] = ['p.deleted_at is null'];
  const vals: any[] = [];
  let i = 1;

  if (hasText(codigoPeca)) { where.push(`p.codigo_peca ilike $${i++}`); vals.push(ilike(codigoPeca)); }
  if (hasText(codigoFabricante)) { where.push(`p.codigo_fabricante ilike $${i++}`); vals.push(ilike(codigoFabricante)); }
  if (hasText(marca)) { where.push(`p.marca ilike $${i++}`); vals.push(ilike(marca)); }
  if (hasText(veiculo)) { where.push(`p.veiculo ilike $${i++}`); vals.push(ilike(veiculo)); }
  if (hasText(peca)) { where.push(`p.peca ilike $${i++}`); vals.push(ilike(peca)); }
  if (hasText(descricao)) { where.push(`p.descricao ilike $${i++}`); vals.push(ilike(descricao)); }
  if (hasText(ano)) { where.push(`p.ano = $${i++}`); vals.push(Number(ano)); }
  if (hasText(statusId)) { where.push(`p.status_id = $${i++}`); vals.push(Number(statusId)); }

  const whereSql = where.length ? `where ${where.join(' and ')}` : '';

  const countSql = `select count(*)::int as total from estoque.parts p ${whereSql}`;
  const { rows: countRows } = await pool.query(countSql, vals);
  const total = countRows[0].total as number;

  const { limit, offset } = await import('../utils/pagination').then(m => m.toLimitOffset(page, pageSize));

  const listSql = `
    select
      p.*, s.code as status_code, s.label as status_label,
      (select json_agg(json_build_object('id',pi.id,'position',pi.position))
         from estoque.part_images pi where pi.part_id = p.id) as imagens
    from estoque.parts p
    left join estoque.part_status s on s.id = p.status_id
    ${whereSql}
    order by p.created_at desc
    limit ${limit} offset ${offset}
  `;

  const { rows } = await pool.query(listSql, vals);
  return { total, page: Number(filters.page ?? 1), pageSize: Number(filters.pageSize ?? 20), data: rows };
}

export async function getPartById(id: number) {
  const sql = `
    select p.*, s.code as status_code, s.label as status_label,
      (select json_agg(json_build_object('id',pi.id,'position',pi.position,'base64',pi.base64))
         from estoque.part_images pi where pi.part_id = p.id) as imagens
    from estoque.parts p
    left join estoque.part_status s on s.id = p.status_id
    where p.id = $1 and p.deleted_at is null
  `;
  const { rows } = await pool.query(sql, [id]);
  return rows[0] ?? null;
}

export async function softDeletePart(id: number) {
  await pool.query(`update estoque.parts set deleted_at = now() where id = $1 and deleted_at is null`, [id]);
}
