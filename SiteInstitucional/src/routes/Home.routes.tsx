import type { JSX } from "react";
import Home from "../screens/Home"
import GalleryDetail from "../screens/GalleryDetail";

const ROUTE_PATH = "/"

const PATHHome: {path:string; element: JSX.Element}[]=[
    {
        path: ROUTE_PATH,
        element: <Home/>
    },
    {
        path: '/detalhe/:id',
        element: <GalleryDetail />,
    }   
];

export default PATHHome