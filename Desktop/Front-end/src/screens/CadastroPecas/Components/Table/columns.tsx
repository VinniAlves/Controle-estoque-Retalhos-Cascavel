"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  codPeca: number
  peca: string
  descricao: string
  marca: string
  veiculo: string
  modelo: string
  ano: number
  statusAnuncio: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "codPeca",
    header: "CodPeca",
  },
  {
    accessorKey: "peca",
    header: "Peca",
  },
  {
    accessorKey: "descricao",
    header: "Descricao",
  },
  {
    accessorKey: "marca",
    header: "Marca",
  },
  {
    accessorKey: "veiculo",
    header: "Veiculo",
  },
  {
    accessorKey: "modelo",
    header: "Modelo",
  },
  {
    accessorKey: "ano",
    header: "Ano",
  },
  {
    accessorKey: "statusAnuncio",
    header: "StatusAnuncio",
  },
  
]
