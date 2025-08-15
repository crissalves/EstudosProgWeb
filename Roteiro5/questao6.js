const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const colocarTodasLetrasEmMaiusculoEm500ms = async input => {
  await delay(500);
  if (typeof input !== 'string') throw input;
  return input.toUpperCase();
};

const inverteTodasLetras = async str => {
  if (typeof str !== 'string') throw str;
  return str.split('').reverse().join('');
};

(async () => {
  try {
    const maiusculas = await colocarTodasLetrasEmMaiusculoEm500ms('Olá Mundo');
    const invertida = await inverteTodasLetras(maiusculas);
    console.log('Resultado:', invertida); 
  } catch (err) {
    console.error('Erro:', err);
  }
})();

(async () => {
  try {
    await colocarTodasLetrasEmMaiusculoEm500ms(123); 
  } catch (err) {
    console.error('Erro (esperado):', err);
  }
})();