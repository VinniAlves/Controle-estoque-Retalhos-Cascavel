import React, { useEffect, useState } from "react";
import { Payment, columns } from "./Table/columns"
import { DataTable } from "./Table/dataTable"


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        codPeca: 1345,
        peca: "Coluna A C/ Coluna de Parabrisa",
        descricao: "Quadro de Porta LE Hyundai HB20 SEDAN",
        marca: "Hyundai",
        veiculo: "HB20",
        modelo: "Sedan",
        ano: 2020,
        statusAnuncio: "Com Anúncio"
      },
      {
        codPeca: 4576,
        peca: "Coluna A C/ Coluna de Parabrisa",
        descricao: "Quadro de Porta LE Hyundai HB20 SEDAN",
        marca: "Hyundai",
        veiculo: "HB20",
        modelo: "Sedan",
        ano: 2020,
        statusAnuncio: "Sem Anúncio"
      },{
        codPeca: 113345,
        peca: "Coluna A C/ Coluna de Parabrisa",
        descricao: "Quadro de Porta LE Hyundai HB20 SEDAN",
        marca: "Hyundai",
        veiculo: "HB20",
        modelo: "Sedan",
        ano: 2020,
        statusAnuncio: "Vendido"
      },
    ]
  }


    export default function Listagem(){
        const [data, setData] = useState<Payment[]>([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            async function fetchData() {
              const result = await getData();
              setData(result);
              setLoading(false);
            }
        
            fetchData();
          }, []);

    return(
        <>
            <div className="w-[75%]  h-90  p-[20px] 
            border border-[#E4E4E7] rounded-[4px]
            shadow
            flex flex-wrap gap-[15px]  content-center" >

            
        <div className="container mx-auto py-10">
           
            {loading ? <p>Carregando...</p> : <DataTable columns={columns} data={data} />}
        </div>



            </div>
        </>
    )

}

