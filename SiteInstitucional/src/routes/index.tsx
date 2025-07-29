
import { useMemo } from "react";
import PATHHome from "./Home.routes";

function useRoutes(){
    const routes = useMemo(()=>[
         ...PATHHome
    ],[])
    return routes

}

export default useRoutes;