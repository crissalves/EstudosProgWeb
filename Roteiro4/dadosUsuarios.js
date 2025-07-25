const usuarios = [
    { nome: "Cleciana", idade: "25", ativo: "true", saldo: "1234.56" },
    { nome: "Gustavo", idade: 30, ativo: true, saldo: 980 },
    { nome: "Rayane", idade: null, ativo: "false", saldo: "1500.90" },
    { nome: "Igor", idade: "NaN", ativo: 1, saldo: undefined },
    { nome: "Samuel", idade: "22 anos", ativo: false, saldo: "0" }
];

const normalizarUsuario = (usuario) => {
    let idade = parseInt(usuario.idade);
    if (
        usuario.idade === null ||
        isNaN(idade) ||
        (typeof usuario.idade === "string" && /\D/.test(usuario.idade.replace(/\s/g, "")))
    ) {
        idade = null;
    }

    let ativo = false;
    if (
        usuario.ativo === true ||
        usuario.ativo === "true" ||
        usuario.ativo === 1 ||
        usuario.ativo === "1"
    ) {
        ativo = true;
    }

    let saldo = parseFloat(usuario.saldo);
    if (isNaN(saldo)) saldo = 0.00;
    saldo = Number(saldo.toFixed(2));

    return {
        nome: usuario.nome,
        idade,
        ativo,
        saldo
    };
};

const processarUsuarios = (usuarios) => {
    const usuariosNormalizados = usuarios.map(normalizarUsuario);
    console.log(usuariosNormalizados);
};

processarUsuarios(usuarios);