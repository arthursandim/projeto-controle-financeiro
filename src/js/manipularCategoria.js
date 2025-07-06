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
    tabela.setAttribute('border', '1');
    tabela.setAttribute('data-cy', `card-despesa-${categoria.id}`)
    tabela.id = `tabela-despesa-${categoria.id}`;

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');

    const thNome = document.createElement('th');
    thNome.textContent = prompt('Digite o nome da categoria');
    thNome.colSpan = 2;


    trHead.appendChild(thNome);

    thead.appendChild(trHead);

    // Criar TBODY com uma linha exemplo
    const tbody = document.createElement('tbody');

    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    const botaoAdicionarDespesa = document.createElement('button');
    botaoAdicionarDespesa.textContent = 'Adicionar despesa';
    botaoAdicionarDespesa.addEventListener('click', () => criarLinhaConta(tabela.id));

    //tabela.textContent = `Categoria`;
    categoria.appendChild(tabela);
    categoria.appendChild(botaoAdicionarDespesa);
    divCategorias.appendChild(categoria);


}

function criarLinhaConta(idTabela) {
    const tabela = document.getElementById(idTabela);
    const tbody = tabela.querySelector('tbody');

    const tr = document.createElement('tr');

    const tdNome = document.createElement('td');
    tdNome.textContent = prompt('Digite o nome da despesa: ');

    const tdValor = document.createElement('td');
    tdValor.textContent = prompt('Digite o valor da despesa: ');

    tr.appendChild(tdNome);
    tr.appendChild(tdValor);
    tbody.appendChild(tr);
}