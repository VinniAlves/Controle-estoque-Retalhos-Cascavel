
import { useMemo } from "react";
import PATHCadastroPecas from "./CadastroPecas.route";

function useRoutes(){
    const routes = useMemo(()=>[
        ...PATHCadastroPecas
    ],[])
    return routes

}

export default useRoutes;