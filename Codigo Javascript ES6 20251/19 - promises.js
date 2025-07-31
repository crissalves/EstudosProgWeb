//Promise
function falarDepoisDe(segundos, frase) {
    return new Promise((resolve, reject) => {
        //setTimeout = recebe em milisegundos, por isso está multiplicado por 1000
        setTimeout(() => {
            //importante = resolve só recebe um parâmetro
            if (frase.length < 5){
                reject(`Rejeita ${frase}`)
            }
            else{    
                resolve(frase)            
            }
            //reject("Erro no servidor!")
        }, segundos * 1000)
    })
}
 
falarDepoisDe(20, 'Que!')
    .then(frase => frase.concat('?!?'))
    .then(novaFrase => console.log(novaFrase))
    .catch(e => console.log(e))
console.log('terminou')