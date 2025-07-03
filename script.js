document.getElementById('botao-criar-categoria').addEventListener('click', criarCategoria);

function criarCategoria() {

    const divCategorias = document.getElementById('categorias');
    const categoriasExistentes = divCategorias.querySelectorAll('[id^="categoria-"]');
    const proximoNumero = categoriasExistentes.length + 1;

    const categoria = document.createElement('div');
    categoria.id = `categoria-${proximoNumero}`;
    categoria.className = `categoria-estilo-${proximoNumero}`;
    categoria.setAttribute('data-cy', `card-categoria-${proximoNumero}`);
    categoria.textContent = `Categoria ${proximoNumero}`

    divCategorias.appendChild(categoria);

}