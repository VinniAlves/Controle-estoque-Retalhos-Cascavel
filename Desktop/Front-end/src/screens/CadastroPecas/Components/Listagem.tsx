import React, { useEffect, useState } from "react";
import { Payment, columns } from "./Table/columns"
import { DataTable } from "./Table/dataTable"


async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      }
    ]
  }



// export default async function Listagem(): Promise<React.JSX.Element>{
//     const data = await getData()

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
            {/* <DataTable columns={columns} data={data} /> */}
            {loading ? <p>Carregando...</p> : <DataTable columns={columns} data={data} />}
        </div>



            </div>
        </>
    )

}

