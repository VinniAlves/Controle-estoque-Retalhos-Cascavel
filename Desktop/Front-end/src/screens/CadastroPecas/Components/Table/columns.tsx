"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { BadgeDollarSign, ChevronDown, ChevronRight,Pencil,Trash2 } from "lucide-react"

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


const  modalMaisInformações= () => {
  const [maisDados,setMaisDados] = useState<boolean> (true);

    if (maisDados) {
        setMaisDados(false)
    }else{
      setMaisDados(true)
    }
    
}



export const columns: ColumnDef<Payment>[] = [

  
  {
    id: "moreInfo",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <Button onClick={modalMaisInformações} className="border-none shadow-none" variant="outline" size="icon" >
          
          
              {maisDados ?
              
                <ChevronRight />:
                  <ChevronDown />
              }
          
        </Button>
      )
    },
  },
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
