import { useRef } from 'react';

type Produto = {
  titulo_produto: string;
  descricao_produto: string;
  valor: string;
  link: string;
  foto: string;
};

type Categoria = {
  titulo_categoria: string;
  subTitulo_categoria: string;
  produtos: Produto[];
};

function Gallerys({ data }: { data: Categoria[] }) {
  return (
    <div className="space-y-10">
      {data.map((categoria, index) => (
        <CategoriaSection key={index} categoria={categoria} />
      ))}
    </div>
  );
}

function CategoriaSection({ categoria }: { categoria: Categoria }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const cardWidth = 300;
      const gap = 16; 
      const visibleCount = 5;

      const scrollAmount = (cardWidth + gap) * visibleCount;

      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full flex flex-col items-center py-8">
      <div className='w-full  flex flex-col max-w-[1618px]'>
        <h2 className="  text-xl font-semibold">{categoria.titulo_categoria}</h2>
        <p className="text-gray-500 ">{categoria.subTitulo_categoria}</p>
        <span className='h-[2px] w-[60px] bg-base-color mb-4'></span>
      </div>
      

      <div className="relative w-full max-w-[1618px] px-6">

        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 z-10 rounded-full"
        >
          ❮
        </button>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto px-[0px] scroll-smooth no-scrollbar"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }}
        >
          {categoria.produtos.map((produto, idx) => (
            <div className="scroll-snap-start" key={idx}>
              <ProdutoCard produto={produto} />
            </div>
          ))}
        </div>

        {/* Botão direito */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 z-10 rounded-full"
        >
          ❯
        </button>
      </div>
    </section>
  );
}

function ProdutoCard({ produto }: { produto: Produto }) {
  return (
    <div className="w-[300px] h-[400px] flex-shrink-0 border rounded shadow-sm bg-white p-2 flex flex-col gap-[20px] text-sm scroll-snap-start">
      <div className="w-full h-[200px] bg-gray-100 mb-2 flex items-center justify-center">
        {produto.foto ? (
          <img src={produto.foto} alt={produto.titulo_produto} className="h-full object-contain" />
        ) : (
          <span className="text-gray-400">[Imagem]</span>
        )}
      </div>
      <h3 className="font-semibold">{produto.titulo_produto}</h3>
      <p className="text-gray-500 text-xs mb-1 line-clamp-4 h-[68px]">{produto.descricao_produto}</p>
      <p className="font-bold text-green-500">{produto.valor}</p>
    </div>
  );
}



export default Gallerys