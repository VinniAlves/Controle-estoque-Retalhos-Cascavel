-- SCHEMA
create schema if not exists estoque;

-- Tabela de status fixos
create table if not exists estoque.part_status (
  id serial primary key,
  code text unique not null,        -- 'COM_ANUNCIO' | 'SEM_ANUNCIO' | 'VENDIDO' | 'PENDENTE'
  label text not null
);

-- Seed de status
insert into estoque.part_status (code, label) values
('COM_ANUNCIO','Com Anúncio'),
('SEM_ANUNCIO','Sem Anúncio'),
('VENDIDO','Vendido'),
('PENDENTE','Pendente')
on conflict (code) do nothing;

-- Tabela de peças
create table if not exists estoque.parts (
  id bigserial primary key,
  codigo_peca text not null,
  peca text not null,
  descricao text,
  marca text,
  veiculo text,
  modelo text,
  ano integer,
  status_id integer references estoque.part_status(id),
  codigo_fabricante text,
  valor text,           -- conforme solicitado: string
  peso double precision,
  altura double precision,
  comprimento double precision,
  largura double precision,
  localizacao text,
  link_mercado text,
  quantidade integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

-- Índices úteis
create index if not exists idx_parts_codigo_peca on estoque.parts (codigo_peca);
create index if not exists idx_parts_codigo_fabricante on estoque.parts (codigo_fabricante);
create index if not exists idx_parts_marca on estoque.parts (marca);
create index if not exists idx_parts_veiculo on estoque.parts (veiculo);
create index if not exists idx_parts_ano on estoque.parts (ano);
create index if not exists idx_parts_status_id on estoque.parts (status_id);
create index if not exists idx_parts_deleted_at on estoque.parts (deleted_at);

-- Tabela de imagens (Base64)
create table if not exists estoque.part_images (
  id bigserial primary key,
  part_id bigint not null references estoque.parts(id) on delete cascade,
  base64 text not null,    -- a imagem inteira em Base64
  position smallint,       -- opcional: ordem
  created_at timestamptz default now()
);

create index if not exists idx_part_images_part_id on estoque.part_images (part_id);

-- Trigger para manter updated_at
create or replace function estoque.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_parts_touch on estoque.parts;
create trigger trg_parts_touch
before update on estoque.parts
for each row execute function estoque.touch_updated_at();

-- Trigger para status automático baseado no link_mercado
-- Se link_mercado não for vazio -> COM_ANUNCIO; senão -> SEM_ANUNCIO (se não for VENDIDO/PENDENTE explicitamente).
create or replace function estoque.set_status_from_link()
returns trigger as $$
declare
  id_com integer;
  id_sem integer;
begin
  select id into id_com from estoque.part_status where code = 'COM_ANUNCIO';
  select id into id_sem from estoque.part_status where code = 'SEM_ANUNCIO';

  if (new.link_mercado is not null and length(trim(new.link_mercado)) > 0) then
    new.status_id := id_com;
  else
    -- só define SEM_ANUNCIO automaticamente se não estiver setado VENDIDO/PENDENTE manualmente
    if new.status_id is null then
      new.status_id := id_sem;
    else
      -- mantém caso já tenha sido definido VENDIDO/PENDENTE
      null;
    end if;
  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_parts_status on estoque.parts;
create trigger trg_parts_status
before insert or update on estoque.parts
for each row execute function estoque.set_status_from_link();
