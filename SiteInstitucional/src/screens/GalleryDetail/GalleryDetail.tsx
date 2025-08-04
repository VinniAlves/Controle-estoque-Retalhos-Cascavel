import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Produto = {
  id: string;
  titulo_produto: string;
  descricao_produto?: string;
  codigo?: string;
  marca?: string;
  imagem?: string;
  unidade?: number;
  valor?: string;
};

export default function GalleryDetail() {
  const { id } = useParams();
  const [produto, setProduto] = useState<Produto | null>(null);

useEffect(() => {
  const dados = localStorage.getItem('galeria-produtos');
  if (dados) {
    const produtos: Produto[] = JSON.parse(dados);
    const item = produtos.find((p) => p.id === id);
    setProduto(item || null);
  }
}, [id]);

  if (!produto) return <div className="p-4">Produto não encontrado</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col  md:flex-row gap-8">
        <img
          src={produto.imagem || '/placeholder.png'}
          alt={produto.titulo_produto}
          className="w-full md:w-4xl h-110 object-contain rounded shadow"
        />
          <div className='text-[13px]'>
            <h1 className="text-[17px] font-bold mb-2">{produto.titulo_produto}</h1>
           
              <p className=" text-gray-500">Cód: {produto.codigo}</p>
              
              <p className=" text-gray-500">Marca: {produto.marca}</p>
          
            <p className=" mt-4 text-gray-700 whitespace-pre-line">
              {produto.descricao_produto}
            </p>
            <p className="mt-4 text-gray-700 whitespace-pre-line">
              Unidade: {produto.unidade}
            </p>
          </div>

        <div className="pt-6 flex flex-col gap-[15px] items-center  md:w-4xl h-38 object-contain rounded shadow">
            <p className="mt-4 text-gray-700 whitespace-pre-line flex gap-[10px]">
              À vista no Pix por
              <span className='text-green-500 font-bold'>{produto.valor}</span>
              
            </p>
            
            <a
              href={`https://wa.me/55SEUNUMERO?text=Tenho%20interesse%20na%20peça:%20${produto.titulo_produto}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition w-[288px]"
            >
              Entrar em contato pelo WhatsApp
            </a>
          </div>
      </div>
    </div>
  );
}
