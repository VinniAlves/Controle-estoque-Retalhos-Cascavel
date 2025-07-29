import Gallerys from "../../components/gallerys"
import HeaderFilters from "../../components/headers"
import GallerysDate from '../../mocks/Gallerys.json'

 function Home(){

return(
    
        <div>
            <HeaderFilters></HeaderFilters>
            <Gallerys data={GallerysDate.data}></Gallerys>
        </div>



)

}

export default Home