let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const adicionaAoCarrinho = (nomeProduto, precoProduto) => {
    const produto = { nome: nomeProduto, preco: precoProduto };
    carrinho.push(produto);
    atualizaContagemCarrinho();
    salvarCarrinho();
    alert(`O produto ${nomeProduto} foi adicionado ao seu carrinho.`);
};

const atualizaContagemCarrinho = () => {
    document.getElementById('carrinho-contagem').textContent = carrinho.length;
};

const salvarCarrinho = () => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
};

const carregaCarrinho = () => {
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    atualizaContagemCarrinho();
    mostrarItensCarrinho();
};

const mostrarItensCarrinho = () => {
    const containerCarrinho = document.getElementById('carrinho-container');
    const totalCarrinho = document.getElementById('carrinho-total');
    containerCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((produto, indice) => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('carrinho__item');
        
        itemCarrinho.innerHTML = `
            <img src="./img/${produto.nome}.jpg" alt="${produto.nome}">
            <div class="carrinho__item--detalhes">
                <h3>${produto.nome}</h3>
                <p>${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <button onclick="removerItemCarrinho(${indice})">Remover</button>
        `;

        containerCarrinho.appendChild(itemCarrinho);
        total += produto.preco;
    });

    totalCarrinho.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const removerItemCarrinho = (indice) => {
    carrinho.splice(indice, 1);
    atualizaContagemCarrinho();
    salvarCarrinho();
    mostrarItensCarrinho();
};

const limpaCarrinho = () => {
    carrinho = [];
    atualizaContagemCarrinho();
    salvarCarrinho();
    mostrarItensCarrinho();
};


//RESPOSTAS

//Etapa 02
//URL para buscar: https://viacep.com.br/ws/58400240/json/
//Método http para usar: GET
//Resposta do Reject: reject('Erro ao consultar o CEP'))

const buscarEndereco = (cep) => {
    return new Promise((resolve, reject) => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(cepData => {
                if (cepData.erro) {
                    reject('Erro ao consultar o CEP');
                } else {
                    resolve(cepData);
                }
            })
            .catch(() => {
                reject('Erro ao consultar o CEP');
            });
    });
};


const consultaCep = () => {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length === 8) {
        buscarEndereco(cep)
            .then(data => {
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('complemento').value = data.complemento || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || '';
            })
            .catch(error => alert(error));
    } else {
        alert('CEP inválido!');
    }
};


//Etapa 03
const geraTextoMarketeiro = (dadosFormulario) => {

    const card = document.createElement('div');
    card.className = 'card-marketeiro';
    card.style.maxWidth = '500px';
    card.style.border = '1px solid #1976d2';
    card.style.borderRadius = '16px';
    card.style.padding = '24px 32px';
    card.style.boxShadow = '0 4px 16px rgba(25, 118, 210, 0.15)';
    card.style.margin = '32px auto';
    card.style.fontFamily = 'Segoe UI, Arial, sans-serif';
    card.style.backgroundColor = '#fff';
    card.style.color = '#222';
    card.style.lineHeight = '1.6';

    card.innerHTML = `
        <h2 style="text-align:center; color:#1976d2; margin-bottom:16px;">Informações do Usuário</h2>
        <p style="margin-bottom:12px;">
            <strong>Mensagem:</strong> Apresentamos <b>${dadosFormulario.nome}</b>, um profissional altamente qualificado e referência no desenvolvimento avançado de software. 
            Com uma trajetória pautada pela inovação e excelência, <b>${dadosFormulario.nome}</b> tem se destacado na criação de soluções tecnológicas de alto impacto, 
            transformando desafios complexos em sistemas eficientes e escaláveis.
        </p>
        <p style="margin-bottom:12px;">
            Comunicável e estrategista, <b>${dadosFormulario.nome}</b> pode ser contatado via e-mail em ,<b>${dadosFormulario.email}</b>, 
            mantendo-se sempre disponível para colaborações e projetos que demandem expertise em engenharia de software, inteligência artificial e programação web. 
            Seu principal objetivo no momento é <b>${dadosFormulario.motivo}</b>, reforçando sua busca contínua pelo aprimoramento e pela entrega de soluções robustas e inteligentes.
        </p>
        <p style="margin-bottom:12px;">
            Atualmente, <b>${dadosFormulario.nome}</b> reside na dinâmica cidade de <b>${dadosFormulario.cidade}</b>, no endereço <b>${dadosFormulario.endereco}</b>, 
            CEP <b>${dadosFormulario.cep}</b>, onde continua sua missão de criar e arquitetar aplicações inovadoras.
        </p>
        <p>
            Seu conhecimento aprofundado em diversas linguagens, frameworks e metodologias ágeis o posiciona como um líder técnico capaz de elevar qualquer equipe ao mais alto nível de performance.<br>
            Com uma visão futurista e uma abordagem precisa para o desenvolvimento de software, <b>${dadosFormulario.nome}</b> segue transformando o cenário tecnológico com soluções que transcendem expectativas.
        </p>
    `;
    document.body.appendChild(card);
    
};

//Não mexer neste método
const submeterDados = (event) => {

    event.preventDefault();
    const dadosFormulario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        motivo: document.getElementById('motivo').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('logradouro').value,
        endereco: document.getElementById('complemento').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    };
    geraTextoMarketeiro(dadosFormulario);
};


//Etapa 04
//URL para buscar: https://fakestoreapi.com/products
//Método http para usar: GET
//Resposta do Reject: reject('Erro ao consultar os Produtos'))

const consultarProdutosExternos = () => {
    return new Promise((resolve, reject) => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(produtos => {
                resolve(produtos);
            })
            .catch(() => {
                reject('Erro ao consultar os Produtos');
            });
    });
};

const alterarValoresTabela = () => {
    consultarProdutosExternos()
        .then(data => {
            const tabela = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];
            tabela.innerHTML = ""; 
            data.slice(0, 6).forEach(produto => {
                const row = tabela.insertRow();
                const cellNome = row.insertCell();
                cellNome.innerText = produto.title;
                const cellPreco = row.insertCell();
                cellPreco.innerText = produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const cellImagem = row.insertCell();
                const img = document.createElement('img');
                img.src = produto.image;
                img.alt = produto.title;
                img.style.width = '50px';
                img.style.height = '50px';
                cellImagem.appendChild(img);
            });
        })
        .catch(error => alert(error));
};

//Não mexer neste método
const modificaValores = ([produto1, produto2, produto3, produto4, produto5, produto6]) => {

    const tabela = document.getElementById("tabelaProdutos").getElementsByTagName('tbody')[0];
    tabela.rows[0].cells[1].innerText = produto1.preco;
    tabela.rows[0].cells[2].innerText = produto1.estoque;
    tabela.rows[1].cells[1].innerText = produto2.preco;
    tabela.rows[1].cells[2].innerText = produto2.estoque;
    tabela.rows[2].cells[1].innerText = produto3.preco;
    tabela.rows[2].cells[2].innerText = produto3.estoque;
    tabela.rows[3].cells[1].innerText = produto4.preco;
    tabela.rows[3].cells[2].innerText = produto4.estoque;
    tabela.rows[4].cells[1].innerText = produto5.preco;
    tabela.rows[4].cells[2].innerText = produto5.estoque;
    tabela.rows[5].cells[1].innerText = produto6.preco;
    tabela.rows[5].cells[2].innerText = produto6.estoque;

};

window.onload = carregaCarrinho;