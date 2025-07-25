const dadosDefault = [
    {produto: "Notebook", preco:4500, quantidade: 3, vendedor:"Sara"},
    {produto: "Celular", preco: 2300, quantidade: 5, vendedor:"Matheus"},
    {produto: "Monitor", preco: 1200, quantidade: 2, vendedor:"Gabriel"},
    {produto: "Teclado", preco: 350, quantidade: 4, vendedor:"Sara"},
    {produto: "Notebook", preco:4500, quantidade: 6, vendedor:"Gabriel"},
    {produto: "Monitor", preco: 1200, quantidade: 3, vendedor:"Matheus"}
]

const gerarRelatorio = (vendas) => {
    let totalGeral = 0;
    let relatorio = "Relatório de Vendas:\n";
    let comissoesPorVendedor = {}; 
    let formatadorBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    for (let i = 0; i < vendas.length; i++) {
        const venda = vendas[i];
        const precoTotal = venda.preco * venda.quantidade;
        const comissao = precoTotal * 0.05;
        relatorio += 
            `- Produto: ${venda.produto}\n` +
            `  Quantidade: ${venda.quantidade}\n` +
            `  Preço unitário: ${formatadorBRL.format(venda.preco)}\n` +
            `  Preço total: ${formatadorBRL.format(precoTotal)}\n` +
            `  Vendedor: ${venda.vendedor}\n` +
            "\n";
        totalGeral += precoTotal;

        if (!comissoesPorVendedor[venda.vendedor]) {
            comissoesPorVendedor[venda.vendedor] = 0;
        }
        comissoesPorVendedor[venda.vendedor] += comissao;
    }

    relatorio += 
        `.......... \n ` +
        `Total Geral: ${formatadorBRL.format(totalGeral)}\n` +
        `Total de comissão (5%): \n`
        ;

    for (const vendedor in comissoesPorVendedor) {
        relatorio += `${vendedor}: ${formatadorBRL.format(comissoesPorVendedor[vendedor])}\n`;
    }

    console.log(relatorio);
}

gerarRelatorio(dadosDefault);