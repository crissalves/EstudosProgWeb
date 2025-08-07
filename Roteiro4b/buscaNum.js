const crypto = require('crypto');

const criptografarMensagem = (texto, chaveSecreta) => {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(chaveSecreta), iv);
    let encrypted = cipher.update(texto, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

const processarNumeros = (numeros, callbackFunction) => 
    numeros
        .filter(n => n % 2 === 0)
        .map(n => callbackFunction(n));

const chaveSecreta = crypto.randomBytes(32);
const numeros = [10, 15, 22, 33, 44, 55];

const resultado = processarNumeros(
    numeros, 
    n => criptografarMensagem(n.toString(), chaveSecreta)
);

console.log(resultado);