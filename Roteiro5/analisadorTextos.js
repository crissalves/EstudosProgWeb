const frases = [
    "JavaScript é poderoso!",
    "Callbacks são úteis.",
    "Arrow functions são mais curtas."
]

const analisarTexto = (array, callback) => {
    return callback(array);
};

const contarPalavras = (array) => {
    return array.reduce((total, frase) => total + frase.split(' ').length, 0);
};

const maiorFrase = (array) => {
    return array.reduce((maior, frase) => frase.length > maior.length ? frase : maior, "");
};

console.log(analisarTexto(frases, contarPalavras));
console.log(analisarTexto(frases, maiorFrase));