
import { useMemo } from "react";
import PATHHome from "./Home.routes";
import PATHProdutos from "./Produtos.routes";


function useRoutes(){
    const routes = useMemo(()=>[
         ...PATHHome,
         ...PATHProdutos
    ],[])
    return routes

}

export default useRoutes;