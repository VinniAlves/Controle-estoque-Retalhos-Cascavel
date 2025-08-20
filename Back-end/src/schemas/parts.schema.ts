import { z } from 'zod';

export const PartCreateSchema = z.object({
  codigoPeca: z.string().min(1),
  peca: z.string().min(1),
  descricao: z.string().optional(),
  marca: z.string().optional(),
  veiculo: z.string().optional(),
  modelo: z.string().optional(),
  ano: z.number().int().optional(),
  statusId: z.number().int().optional(), // opcional: trigger ajusta pelo link
  codigoFabricante: z.string().optional(),
  valor: z.string().optional(), // conforme pedido: string
  peso: z.number().optional(),
  altura: z.number().optional(),
  comprimento: z.number().optional(),
  largura: z.number().optional(),
  localizacao: z.string().optional(),
  linkMercado: z.string().optional(),
  quantidade: z.number().int().nonnegative().default(0),
  imagensBase64: z.array(z.string()).max(10).optional() // até 10
});

export const PartUpdateSchema = PartCreateSchema.partial().extend({
  id: z.number().int()
});

export const PartListQuerySchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  codigoPeca: z.string().optional(),
  codigoFabricante: z.string().optional(),
  marca: z.string().optional(),
  veiculo: z.string().optional(),
  ano: z.string().optional(),
  peca: z.string().optional(),
  descricao: z.string().optional(),
  statusId: z.string().optional()
});

export type PartCreateDTO = z.infer<typeof PartCreateSchema>;
export type PartUpdateDTO = z.infer<typeof PartUpdateSchema>;
