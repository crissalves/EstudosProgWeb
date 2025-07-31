const alunos = ["José Victor", "Levi", "Daniel"]

const func = a => a + a

function imprimir(nome, index, array) {
    console.log(`${index + 1}. ${nome} -> ${func(nome)} --> ${array}`)
}

const a = alunos.forEach(imprimir)
