document.getElementById('botao-criar-categoria').addEventListener('click', criarCategoria);

function criarCategoria() {

    const divCategorias = document.getElementById('categorias');
    const categoriasExistentes = divCategorias.querySelectorAll('[id^="categoria-"]');
    const proximoNumero = categoriasExistentes.length + 1;

    const categoria = document.createElement('div');
    categoria.id = `categoria-${proximoNumero}`;
    categoria.className = `categoria-estilo-${proximoNumero}`;
    categoria.setAttribute('data-cy', `card-categoria-${proximoNumero}`);


    const tabela = document.createElement('table');
    tabela.setAttribute('border', '1')
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');

    const thNome = document.createElement('th');
    thNome.textContent = prompt('Digite o nome da categoria');
    thNome.colSpan = 2;


    trHead.appendChild(thNome);
   
    thead.appendChild(trHead);

    // Criar TBODY com uma linha exemplo
    const tbody = document.createElement('tbody');
    const trBody = document.createElement('tr');

    const tdNome = document.createElement('td');
    tdNome.textContent = 'Exemplo';

    const tdValor = document.createElement('td');
    tdValor.textContent = 'R$ 0,00';

    trBody.appendChild(tdNome);
    trBody.appendChild(tdValor);
    tbody.appendChild(trBody);

    // Juntar tudo na tabela
    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    //tabela.textContent = `Categoria`;
    categoria.appendChild(tabela);

    divCategorias.appendChild(categoria);


}