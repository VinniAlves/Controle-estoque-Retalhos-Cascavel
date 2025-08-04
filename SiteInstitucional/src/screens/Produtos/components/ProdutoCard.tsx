type Categorias={
    id: string;
  titulo_produto: string;
  descricao_produto: string;
  valor: string;
  link: string;
  foto: string;
}



function ProdutoCard({produto}:{ produto: Categorias[]}) {

console.log(produto)

  return (
    <div className="border rounded p-4 shadow-sm hover:shadow-md transition">
      <img src={produto.foto} alt={produto.titulo_produto} className="h-40 object-contain mb-2 mx-auto" />
      <p className="text-sm text-gray-700 font-semibold">{produto.titulo_produto}</p>
      <p className="text-green-600 font-bold text-lg mt-2">R$ {produto.valor}</p>
    </div>
  );
}

export default ProdutoCard;
