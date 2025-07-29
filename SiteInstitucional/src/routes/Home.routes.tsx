import type { JSX } from "react";
import Home from "../screens/Home"

const ROUTE_PATH = "/"

const PATHHome: {path:string; element: JSX.Element}[]=[
    {
        path: ROUTE_PATH,
        element: <Home/>
    }
];

export default PATHHome