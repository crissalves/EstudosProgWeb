function imprimirSoma(a, b){
    console.log(a+b)
}
/*
imprimirSoma(3, 4) 
imprimirSoma('3')
imprimirSoma(3, 5, 6, 7)
imprimirSoma()
*/
//Parameter Default
/*
function soma(a = 2, b = 1){
    console.log(a+b)
}

soma()
soma(0,'1')
soma(undefined, '6')
soma(null, '6')
*/
/*
let soma_02 = function (a = 2, b = 1){
    console.log(a+b)
}

soma_02('3', soma_02())
*/
/*
let soma_02 = (a=1, b=2) => a + b
console.log(soma_02(5))
*/


subtracao = (a=1, b=3) => a - b
console.log(subtracao(5, 6))

const impressao = a => console.log(a)

impressao(`${subtracao(20)} Que Beleza!`)

