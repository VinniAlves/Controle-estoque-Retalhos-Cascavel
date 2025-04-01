"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { BadgeDollarSign, ChevronDown, ChevronRight,Pencil,Trash2 } from "lucide-react"
import iconMercado from "./image/mercado-libre.svg"

import React, { useState } from "react"
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
  codFabricante:string,
  valor:number,
  peso: number,
  altura: number,
  comprimento:number ,
  largura: number,
  localizacao: string,
  linkML:string
}





export const columns: ColumnDef<Payment>[] = [

  
  {
    id: "editInfo",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Button   className="border-none shadow-none" variant="outline" size="icon">
          <Pencil/>
        </Button>
      )
    },
  },
  {
    id: "remInfo",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Button className="border-none shadow-none" variant="outline" size="icon">
          <Trash2 />
        </Button>
      )
    },
  },
  {
    id: "venderItem",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Button className="border-none shadow-none" variant="outline" size="icon">
          <BadgeDollarSign />
          </Button>
      )
    },
  },
  {
    accessorKey: "codPeca",
    header: "Cod. Peça",
  },
  {
    accessorKey: "peca",
    header: "Peça",
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
  },
  {
    accessorKey: "marca",
    header: "Marca",
  },
  {
    accessorKey: "veiculo",
    header: "Veículo",
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
    header: "Status Anúncio",
  },
  {
    accessorKey: "codFabricante",
    header: "Cod. Fabricante",
  },
  {
    accessorKey: "valor",
    header: "Valor",
  },
  {
    accessorKey: "peso",
    header: "Peso",
  },
  {
    accessorKey: "altura",
    header: "Altura",
  },
  {
    accessorKey: "comprimento",
    header: "Comprimento",
  },
  {
    accessorKey: "largura",
    header: "Largura",
  },
  {
    accessorKey: "localizacao",
    header: "Localização",
  },
  {
    header: "Link Mercado",
    id: "editInfo",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Button   className="border-none shadow-none" variant="outline" size="icon">
          <img src={iconMercado}></img>
        </Button>
      )
    },
  },
  


  
 
  
]
