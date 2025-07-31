// operador rest - Agrupar
function total(...numeros) {
    let total = 0
    numeros.forEach(n => total += n)
    return total
}

//Agrupou em uma estrutura do tipo array
//console.log(total(2, 3, 4, 5, 6, 8, 9))

// usar spread com objeto
/*
const funcionario = { nome: 'CAIO JHONATAN', salario: 12348.99}
const exemplo1 = {ativo: false, funcionario}
exemplo1.nome = 'EDUARDO AUGUSTO'
//console.log(funcionario, exemplo1)

const funcionario1 = {...exemplo1}
const funcionario2 = {...funcionario1, idade: 45}
const funcionario3 = {...funcionario2, idade: 35}

console.log(funcionario1, funcionario2, funcionario3)
*/
// usar spread com array

const grupoA = ['IAN ARTHUR', 'ANDRÉ', 'MATHEUS']
const grupoFuncionarios = [{ nome: 'ALFREDO', salario: 12348.99}, 
{ nome: 'RENAN', salario: 12348.99}, 
{ nome: 'ANA PAULA', salario: 12348.99}]
const grupoFinal = [...grupoFuncionarios, grupoA, ...grupoFuncionarios]
console.log(grupoFinal)

