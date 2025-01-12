//const ROUTE_PATH = "/cadastropeca"
const ROUTE_PATH = "/"
import React from "react";
import CadastroPecas from "../screens/CadastroPecas"

const PATHCadastroPecas: {path:string; element: JSX.Element}[]=[
    {
        path: ROUTE_PATH,
        element:<CadastroPecas/>
    }
];

export default PATHCadastroPecas