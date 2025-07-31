const http = require('http') // Adicione esta linha

const dono = {
    "proprietario": "Silvio Santos",
    "endereco": {
        "cep":'hacked, pay to recover',
        "logradouro": 'hacked, pay to recover',
        "complemento": 'hacked, pay to recover',
        "bairro": 'hacked, pay to recover',
        "localidade": 'hacked, pay to recover',
        "uf": '',
        "geo": {
            "lat": "-23.61919020307765",
            "lng": "-46.70793551534256"
        }
    }
}

const getEndereco = cep => {
    const url = `http://viacep.com.br/ws/${cep}/json` // Use http, não https, com o módulo http
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let resultado = ''
            res.on('data', dados => {
                resultado += dados
            })
            res.on('end', () => {
                try {
                    resolve(JSON.parse(resultado))
                } catch(e) {
                    reject(e)
                }
            })
        })
    })
}

getEndereco('05650000').then(endereco => {
    // Atualiza apenas os campos necessários
    dono.endereco.cep = endereco.cep;
    dono.endereco.bairro = endereco.bairro;
    dono.endereco.localidade = endereco.localidade;

    // Desestruturação dos campos necessários
    const { proprietario, endereco: { cep, bairro, localidade, geo: { lat, lng } } } = dono;

    // Monta a string no formato solicitado
    const resultado = `${proprietario} - ${cep} - ${bairro}, ${localidade} (${lat}, ${lng})`;
    console.log(resultado);
});