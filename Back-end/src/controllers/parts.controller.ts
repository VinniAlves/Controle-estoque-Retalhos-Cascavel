import { Request, Response } from 'express';
import { PartCreateSchema, PartUpdateSchema, PartListQuerySchema } from '../schemas/parts.schema';
import { createPart, getPartById, listParts, softDeletePart, updatePart } from '../repositories/parts.repo';

export async function create(req: Request, res: Response) {
  try {
    const parsed = PartCreateSchema.parse(req.body);

    const partId = await createPart(parsed);
    const item = await getPartById(partId);

    return res.status(201).json(item);
  } catch (e: any) {
    return res.status(400).json({ error: e.message ?? 'Erro ao criar peça' });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    // aceita campos do PartUpdateSchema + campos de imagens
    const parsed = PartUpdateSchema.partial().parse({ ...req.body, id });

    await updatePart(id, {
      ...parsed,
      imagensParaAdicionar: req.body.imagensParaAdicionar,
      imagensParaExcluir: req.body.imagensParaExcluir,
      imagensParaSubstituir: req.body.imagensParaSubstituir
    });

    const item = await getPartById(id);
    return res.json(item);
  } catch (e: any) {
    return res.status(400).json({ error: e.message ?? 'Erro ao atualizar' });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const parsed = PartListQuerySchema.parse(req.query);
    const result = await listParts(parsed as any);
    return res.json(result);
  } catch (e: any) {
    return res.status(400).json({ error: e.message ?? 'Erro ao listar' });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
    const item = await getPartById(id);
    if (!item) return res.status(404).json({ error: 'Não encontrado' });
    return res.json(item);
  } catch (e: any) {
    return res.status(400).json({ error: e.message ?? 'Erro ao buscar' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
    await softDeletePart(id);
    return res.status(204).send();
  } catch (e: any) {
    return res.status(400).json({ error: e.message ?? 'Erro ao excluir' });
  }
}
