const jsonVendas = `[
    {"produto": "Notebook", "valor": 4500},
    {"produto": "Smartphone", "valor": 2500},
    {"produto": "Monitor", "valor": 1200},
    {"produto": "Tablet", "valor": 1800}
]`;


const filtraVendas = (json, minimo) => {
    const vendas = JSON.parse(json);
    const filtradas = vendas.filter(venda => venda.valor > minimo);
    return {
        totalVendas: filtradas.length,
        vendas: filtradas
    };
};



console.log(filtraVendas(jsonVendas, 2000));