import ProdutosPorMarca from '../screens/Produtos/ProdutosPorMarca';

import type { JSX } from "react";



const ROUTE_PATH = "/produtos/:tipo/:marca"

const PATHProdutos: {path:string; element: JSX.Element}[]=[
    {
        path: ROUTE_PATH,
        element: <ProdutosPorMarca/>
    }
    
];

export default PATHProdutos