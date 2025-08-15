const combinarObjetos = (obj1, obj2, callback) => 
    callback({ ...obj1, ...obj2 });

const exibirResultado = (resultado) => 
    console.log(resultado);

combinarObjetos(
    { nome: "Cristian", idade: 22 },
    { cidade: "Campina Grande", curso: "Engenharia" },
    exibirResultado
);
