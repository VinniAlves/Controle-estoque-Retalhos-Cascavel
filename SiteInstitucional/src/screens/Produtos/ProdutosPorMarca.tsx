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
  const imagemCapa = tipoSelecionado?.capa || '';

  const existeMarca = marcas.includes(marca || '');

  const categoria = GallerysData.data.find((cat) =>
    cat.titulo_categoria.toLowerCase().includes(tipo?.toLowerCase() || '')
  );

  // Geração de ID único e produtos filtrados
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
    <div className="p-10">
      <div className="flex items-center gap-6 mb-8">
        {imagemCapa && (
          <img src={imagemCapa} alt="Capa" className="w-32 h-32 object-contain" />
        )}
        <h1 className="text-3xl font-bold">
          {tipoSelecionado.nome} - {marca}
        </h1>
      </div>

      {produtosFiltrados.length === 0 ? (
        <p className="text-gray-500 text-lg">Nenhum produto encontrado para esta marca.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              onClick={() => navigate(`/detalhe/${produto.id}`)}
              className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer"
            >
              <div className="h-40 bg-gray-100 rounded mb-2 flex items-center justify-center text-sm text-gray-400">
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
              <p className="font-semibold text-gray-700 text-sm truncate">{produto.titulo_produto}</p>
              <p className="text-xs text-gray-500 line-clamp-2">{produto.descricao_produto}</p>
              <p className="text-green-600 font-bold mt-1">{produto.valor}</p>
              <p className="text-[10px] text-gray-400 mt-1">Código: {produto.codigo || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProdutosPorMarca;
