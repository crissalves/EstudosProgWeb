const verificaDuplicados = (...parametros) => 
    parametros.some((item, index) => 
        parametros.slice(index + 1).some(outro => outro === item)
    );

console.log(verificaDuplicados(1, "1", 2, 3)); 
console.log(verificaDuplicados(1, 2, 1, "a"));       