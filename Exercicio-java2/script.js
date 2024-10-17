const itens = [ 
    { nome: 'mouse', preco: 80, estoque: 20 },
    { nome: 'teclado', preco: 100, estoque: 15 },
    { nome: 'impressora', preco: 300, estoque: 6 },
    { nome: 'notebook', preco: 2000, estoque: 3 },
    { nome: 'computador', preco: 4000, estoque: 1 }
];

let itensCarrinho = [];

// Função para buscar itens
const botaobuscar = document.getElementById('buscaritem');

function buscaritem() {
    const buscar = botaobuscar.value;
    const itemFiltrados = itens.filter(item => 
        item.nome.toLowerCase().includes(buscar.toLowerCase())
    );

    const divResultados = document.getElementById('produtos'); 
    divResultados.innerHTML = '';  

    if (buscar === '') {
        item.forEach(item => {
            divResultados.innerHTML +=
            `<p>${item.nome} - R$ ${item.preco.toFixed(2)} 
            <button onclick='adicionaraocarrinho(${JSON.stringify(item)})'>Adicionar ao Carrinho</button>
            </p>`;
        });
        return; 
    }
    // Mostra os produtos filtrados
    itemFiltrados.forEach(item => {
        divResultados.innerHTML +=
            `<p>${item.nome} - R$ ${item.preco.toFixed(2)} 
            <button onclick='adicionaraocarrinho(${JSON.stringify(item)})'>Adicionar ao Carrinho</button>
            </p>`;
    });
}

// Função para adicionar ao carrinho
function adicionaraocarrinho(itemselect) {
    const produto = itens.find(i => i.nome === itemselect.nome); 

    if (produto && produto.estoque > 0) { 
        itensCarrinho.push(itemselect);
        produto.estoque--; 
        atualizarCarrinho();
    } else {
        alert("Acabou o estoque");
    }
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
    const divcarrinho = document.getElementById('carrinho');
    divcarrinho.innerHTML = 'Carrinho:'; 
    let total = 0;

    itensCarrinho.forEach(item => {
        divcarrinho.innerHTML += `
            <p>${item.nome} - R$ ${item.preco.toFixed(2)} 
            <button onclick='remover(${JSON.stringify(item)})'> X </button></p>`;
        total += item.preco;
    });

    const totalitens = document.getElementById('total');
    totalitens.innerText = total.toFixed(2);
}

// Função para remover do carrinho
function remover(item) {
    const encontraitem = itensCarrinho.findIndex(carrinhoItem => 
        carrinhoItem.nome === item.nome && carrinhoItem.preco === item.preco
    );

    if (encontraitem !== -1) {
        
        itensCarrinho.splice(encontraitem, 1);

        
        const produtoEstoque = itens.find(produto => produto.nome === item.nome);
        if (produtoEstoque) {
            produtoEstoque.estoque++;
        }
        atualizarCarrinho();
    }
}

// Adicionando um lista para o botão de buscar
botaobuscar.addEventListener('input', buscaritem);

function ordenarcarrinho() {
    itensCarrinho.sort((a, b) => a.preco - b.preco); 
    atualizarCarrinho(); 
}









