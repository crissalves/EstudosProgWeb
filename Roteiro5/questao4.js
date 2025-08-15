const combinarEOrdenar = (callback, ...arrays) => {
    const combinado = arrays.reduce((acc, arr) => [...acc, ...arr], []);
    const todosNumeros = combinado.length > 0 && combinado.every(item => typeof item === "number");
    const ordenado = todosNumeros ? combinado.sort((a, b) => a - b) : combinado.sort();
    callback(ordenado);
};
