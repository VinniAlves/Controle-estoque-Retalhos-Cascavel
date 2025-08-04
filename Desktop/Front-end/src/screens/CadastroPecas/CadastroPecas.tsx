import Filtro from "./Components/filtro"
import Listagem from "./Components/Listagem"

function CadastroPecas(){
    return(
        <div>
            
            <div className="w-full flex flex-col items-center ">
               <Filtro></Filtro>
                <Listagem></Listagem>
            </div>
        </div>
        
    )
}
export default CadastroPecas