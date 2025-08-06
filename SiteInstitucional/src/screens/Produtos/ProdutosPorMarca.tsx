import { useParams, useNavigate } from 'react-router-dom';
import HeadersData from '../../mocks/Headers.json';
import GallerysData from '../../mocks/Gallerys.json';
import { useEffect } from 'react';

function ProdutosPorMarca() {
  const { tipo, marca } = useParams();
  const navigate = useNavigate();

  const tipoSelecionado = HeadersData.tipo.find(
    (item) => item.nome.toLowerCase() === tipo?.toLowerCase()
  );

  const marcas = tipoSelecionado?.marcas || [];

  const existeMarca = marcas.includes(marca || '');

  const categoria = GallerysData.data.find((cat) =>
    cat.titulo_categoria.toLowerCase().includes(tipo?.toLowerCase() || '')
  );

  // Geração de ID único e produtos filtrados
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const produtosFiltrados = categoria?.produtos
    .filter((produto) => produto.marca.toLowerCase() === marca?.toLowerCase())
    .map((produto, index) => {
      const id = btoa(`${tipo}-${marca}-${produto.titulo_produto}-${index}`).replace(/=/g, '');
      return { ...produto, id };
    }) || [];

  // Salva todos os produtos filtrados no localStorage (opcional)
  useEffect(() => {
    localStorage.setItem('galeria-produtos', JSON.stringify(produtosFiltrados));
  }, [produtosFiltrados]);

  if (!tipoSelecionado || !existeMarca) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-500">Categoria ou marca inválida</h1>
      </div>
    );
  }

  return (
    <div className="p-10 w-full justify-center flex">
     

      {produtosFiltrados.length === 0 ? (
        <p className="text-gray-500 text-lg">Nenhum produto encontrado para esta marca.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6 max-w-[1600px] ">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              onClick={() => navigate(`/detalhe/${produto.id}`)}
              className="cursor-pointer w-[300px] h-[400px] flex-shrink-0 border rounded shadow-sm bg-white p-2 flex flex-col gap-[20px] text-sm hover:shadow-md transition"
            >
              <div className="w-full h-[200px] bg-gray-100 mb-2 flex items-center justify-center">
                {produto.foto ? (
                  <img
                    src={produto.foto}
                    alt={produto.titulo_produto}
                    className="object-contain h-full w-full"
                  />
                ) : (
                  'Sem imagem'
                )}
              </div>
              <h3 className="font-semibold">{produto.titulo_produto}</h3>
      <p className="text-gray-500 text-xs mb-1 line-clamp-4 h-[68px]">{produto.descricao_produto}</p>
      <p className="font-bold text-green-500">{produto.valor}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProdutosPorMarca;
