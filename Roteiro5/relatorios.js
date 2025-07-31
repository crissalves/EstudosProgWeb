const funcionarios = [
    { nome: "Ana", cargo: "Desenvolvedora", salario: 7000 },
    { nome: "Carlos", cargo: "Gerente", salario: 12000 },
    { nome: "Beatriz", cargo: "Analista", salario: 5000 }
];

const formatarSalarioBR = (valor) => {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const gerarRelatorio = (funcionarios) => {
    
    let relatorio = "Relatório de Funcionários:\n" +
        "----------------------------\n";
    let salarioMedio = 0;
    let totalFunccionarios = funcionarios.length;
    for(let i = 0; i < funcionarios.length; i++) {
        const funcionario = funcionarios[i];
        relatorio += `Nome: ${funcionario.nome} - Cargo: ${funcionario.cargo} - Salário: R$ ${formatarSalarioBR(funcionario.salario)}\n`;
        salarioMedio += funcionario.salario;
    }
    relatorio += "----------------------------\n";
    relatorio += `Total de Funcionários: ${totalFunccionarios}\n`;
    relatorio += `Total de Salários: R$ ${formatarSalarioBR(salarioMedio/totalFunccionarios)}\n`;
    return relatorio;
};

console.log(gerarRelatorio(funcionarios));