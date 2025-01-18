import React from "react";
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { Button } from "@/components/ui/button"

export default function filtro(){
    return(
        <>
            <div className="w-[75%]  h-90  p-[20px] 
            border border-[#E4E4E7] rounded-[4px]
            shadow
            flex flex-wrap gap-[15px]  content-center" >
                 {/* Código Peça */}
                <Input className="w-[49%]" placeholder="Código Peça"></Input>
                    {/* Código do Fabricante */}
                <Input className="w-[49%]" placeholder="Código do Fabricante"></Input>
                {/* Marca */}
                <Select>
                    <SelectTrigger className="w-[32%]">
                        <SelectValue placeholder="Marca" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                {/* Modelo */}
                <Select>
                    <SelectTrigger className="w-[32%]">
                        <SelectValue placeholder="Modelo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                {/* Veiculo */}
                <Select>
                    <SelectTrigger className="w-[32%]">
                        <SelectValue placeholder="Veículo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                {/* Ano */}
                <Select>
                    <SelectTrigger className="w-[32%]">
                        <SelectValue placeholder="Ano" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                {/* Peça */}
                <Select>
                    <SelectTrigger className="w-[32%]">
                        <SelectValue placeholder="Peça" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>

                 {/* Descrição */}
                 <Input className="w-full" placeholder="Descrição"></Input>

                <div className=" flex w-full justify-end gap-[15px]">
                <Button variant="outline" >Limpar</Button>
                <Button variant="destructive" className="bg-red-500 text-white">Pesquisar</Button>
                </div>

            </div>

        </>
    )
}

