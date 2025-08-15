const BASE_URL = 'http://demo6810218.mockable.io';

// ----- Função para buscar produtos (GET /produtos) -----
// arrow async: busca a lista de produtos e retorna o array (ou lança erro)
const fetchProducts = async () => {
    try {
        const res = await fetch(`${BASE_URL}/produtos`);
        if (!res.ok) throw new Error(`Erro ao buscar produtos: ${res.status} ${res.statusText}`);
        // converte o corpo da resposta para JSON (esperamos um array de produtos)
        const data = await res.json();
        return data;
    } catch (err) {
        throw err;
    }
};

// ----- Função para criar produto (POST /produtos) -----
// arrow async: envia um produto ao servidor e retorna o objeto criado (ou lança erro)
const createProduct = async product => {
    try {
        // faz a requisição POST para /produtos, enviando JSON no body
        const res = await fetch(`${BASE_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
        });
        // valida o status HTTP; se não for OK/Created, lança erro
        if (!res.ok) throw new Error(`Erro ao criar produto: ${res.status} ${res.statusText}`);

        const created = await res.json();
        
        if (typeof created.status === 'undefined') created.status = 'criado';
        return created;
    } catch (err) {
        throw err;
    }
};

// ----- Função auxiliar: formata e imprime produtos no console -----
// recebe um array de produtos e imprime linhas no formato desejado
const formatAndPrintProducts = products => {
    const formatter = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    products.forEach(prod => {
        const nome = prod.nome ?? '—';
        const preco = (typeof prod.preco === 'number') ? formatter.format(prod.preco) : (prod.preco ?? '—');
        console.log(`Produto: ${nome} | Preço: R$ ${preco}`);
    });
};

// ----- Função principal: orquestra as etapas -----
// busca produtos, exibe, cadastra novo produto e exibe confirmação + lista atualizada
const main = async () => {
    try {
        // 1) solicita ao servidor a lista de produtos
        const produtos = await fetchProducts();
        // 2) imprime a lista recebida no console (formatada)
        formatAndPrintProducts(produtos);
        // 3) define o novo produto a ser cadastrado (altere se quiser)
        const novoProduto = { nome: 'Headset', preco: 250.00 };
        // 4) envia o POST para cadastrar o novo produto e recebe a resposta criada
        const produtoCriado = await createProduct(novoProduto);
        // 5) exibe a mensagem de confirmação no formato requisitado
        console.log(`Produto "${produtoCriado.nome}" criado com sucesso! Status: ${produtoCriado.status}`);
        // 6) atualiza localmente a lista de produtos (imutável) e reexibe a lista atualizada
        const produtosAtualizados = [...produtos, produtoCriado];
        console.log('Lista atualizada de produtos:');
        formatAndPrintProducts(produtosAtualizados);
    } catch (err) {
        console.error('Ocorreu um erro durante a operação:', err);
    }
};

main();