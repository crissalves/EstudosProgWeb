const serverRequest = request => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {   
            if(request.length > 4) {
                reject("Brutal.")
            }else{
                resolve(`Sobrou algo pro beta: ${request}`)
            }
        }, 2000) 
    })
};

let entrada = "Criss";
let entrada2 = "ss";

serverRequest(entrada2)
    .then( e=> console.log(e))
    .catch(e=> console.log(e))

console.log("It's over")