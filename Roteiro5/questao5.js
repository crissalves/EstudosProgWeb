const colocarTodasLetrasEmMaiusculoEm500ms = input =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      typeof input === 'string' ? resolve(input.toUpperCase()) : reject(input);
    }, 500)
  );

const inverteTodasLetras = str =>
  new Promise((resolve, reject) => {
    if (typeof str !== 'string') return reject(str);
    resolve(str.split('').reverse().join(''));
  });
 
colocarTodasLetrasEmMaiusculoEm500ms('Olá Mundo')
  .then(inverteTodasLetras) 
  .then(resultado => console.log('Resultado:', resultado)) 
  .catch(err => console.error('Erro:', err)); 

colocarTodasLetrasEmMaiusculoEm500ms(123)
  .then(inverteTodasLetras)
  .then(resultado => console.log('Resultado:', resultado))
  .catch(err => console.error('Erro (esperado):', err));