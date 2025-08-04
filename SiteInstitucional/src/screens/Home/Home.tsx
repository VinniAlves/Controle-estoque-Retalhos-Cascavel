import Gallerys from "../../components/gallerys"

import GallerysDate from '../../mocks/Gallerys.json'

 function Home(){

return(
    
        <div>

            <Gallerys data={GallerysDate.data}></Gallerys>
        </div>



)

}

export default Home