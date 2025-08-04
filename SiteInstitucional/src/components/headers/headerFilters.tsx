

import Logo from '../../assets/Retalhos_Cascavel_PNG-1.png'
import { BiLogoWhatsapp,BiPhoneCall,BiSearchAlt } from "react-icons/bi";
import HeadersDate from '../../mocks/Headers.json'
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';


function HeaderFilters(){

    const dateCategory = HeadersDate
    
    const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {

    navigate('/');
  };


return(
      
    <div className=' flex flex-col gap-[30px] justify-center items-center m-[30px]  '>
           
        <div className='flex  '>
          
            <div onClick={handleClick} className='cursor-pointer'>
                <img className='max-w-3xs max-h-3xs' src={Logo}></img>

            </div>
   
            <div className=' flex flex-col gap-[20px] mr-[100px] ml-[100px]'>
                <div className='flex gap-[40px] text-sm'>
                    <div className='flex gap-[10px]'> 
                        <BiPhoneCall className='w-[25px] h-[25px] text-blue-400'/>
                        <p>Fale conosco</p>
                    </div>
                    <div className='flex gap-[10px]'>
                        <BiLogoWhatsapp className='w-[25px] h-[25px] text-green-400' />
                        <p>Chat Online</p>
                    </div>
                </div>
                
                <div className='flex gap-[25px] items-center border-1 rounded-md w-[1300px] max-w-5xl h-[50px] pl-[5px] '>
                    <input placeholder='Digite o que deseja encontrar' className=' w-[1100px] max-w-5xl h-[46px]  outline-none'></input>
                    <BiSearchAlt className='flex w-[30px] h-[30px] ml-[10px] mr-[10px] text-red-600' />
                </div>
            </div>
        </div>
       <div className="relative">
  {/* Menu principal */}
  <div className="flex gap-[40px] justify-center">
    {dateCategory.tipo.map((date) => (
      <div
        key={date.nome}
        onMouseEnter={() => setOpenMenu(date.nome)}
        onMouseLeave={() => setOpenMenu(null)}
        className="relative"
      >
        <button className="p-[5px] rounded-md hover:bg-base-color hover:text-white transition-colors">
          <p className="text-lg text-neutral-500">{date.nome}</p>
        </button>
      </div>
    ))}
  </div>

  {/* Modal fixo abaixo do menu */}
  {openMenu && (
    <div
      onMouseEnter={() => setOpenMenu(openMenu)}
      onMouseLeave={() => setOpenMenu(null)}
      className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg z-10 flex justify-start px-10 py-6"
    >
      <div className="w-2/3">
        <ul className="space-y-2">
          {dateCategory.tipo
            .find((item) => item.nome === openMenu)
            ?.marcas.map((marca) => (
              
              <li
  key={marca}
  className="hover:bg-gray-100 p-2 rounded cursor-pointer"
  onClick={() => navigate(`/produtos/${openMenu}/${marca}`)}
>
  {marca}
</li>
            ))}
        </ul>
      </div>

      {/* Exibir imagem se houver "capa" */}
      {dateCategory.tipo.find((item) => item.nome === openMenu)?.capa && (
        <div className="w-1/3 pl-10">
          <img
            src={
              dateCategory.tipo.find((item) => item.nome === openMenu)?.capa
            }
            alt={`Capa de ${openMenu}`}
            className="rounded-md max-h-48 object-contain"
          />
        </div>
      )}
    </div>
  )}
</div>


    </div>

    )
}

export default HeaderFilters