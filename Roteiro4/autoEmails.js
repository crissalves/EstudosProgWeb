const dadosDefault = [
    { nome: "Davi", email: "davi@email.com", plano: "Premium", ativo: true },
    { nome: "Ana", email: "ana@email.com", plano: "Básico", ativo: false },
    { nome: "Carlos", email: "carlos@email.com", plano: "Padrão", ativo: true },
    { nome: "Beatriz", email: "beatriz@email.com", plano: "Básico", ativo: true },
    { nome: "Eduardo", email: "eduardo@email.com", plano: "Premium", ativo: false },
    { nome: "Fernanda", email: "fernanda@email.com", plano: "Padrão", ativo: true}, 
    { nome: "Gabriel", email: "gabriel@email.com", plano: "Premium", ativo: true },
    { nome: "Helena", email: "helena@email.com", plano: "Básico", ativo: false }
]

const gerarEmails = (cliente) => {
    for( let i = 0; i< dadosDefault.length; i++) {
        const cliente = dadosDefault[i];
        if (cliente.ativo) {
            console.log(
            `Para: ${cliente.email}\n`+ 
            `Olá, ${cliente.nome}!\n\n`+
            `Obrigado por ser um assinante do nosso plano ${cliente.plano}! Estamos felizes em tê-lo conosco.\n\n` +
            `Caso precise de suporte, estamos á disposição.\n\n` +
            `Atenciosamente, \n` +
            `Equipe StreamingWeb \n` +
            `...................................\n`);
        } else {
             console.log(
            `Para: ${cliente.email}\n`+ 
            `Olá, ${cliente.nome}!\n\n`+
            `Notamos que sua assinatura do nosso plano ${cliente.plano} está inativa. Que tal voltar e aproveitar nossos contéudos exclusivos?\n\n` +
            `Reative agora e continua sua experiência conosco! \n\n` +
            `Atenciosamente, \n` +
            `Equipe StreamingWeb \n`+
            `...................................\n`);
        }
    }
}


gerarEmails(dadosDefault);