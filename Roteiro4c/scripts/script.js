const map = L.map('map').setView([-15.7942, -47.8822], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
let marcador;


const carrinho = [];


const adicionarCarrinho = (livro) => {
    carrinho.push(livro);
    atualizarCarrinho();
    alert(`Livro "${livro}" adicionado ao carrinho!`);
}

const atualizarCarrinho = () => {
    const contador = document.getElementById('carrinho-contador');
    const lista = document.getElementById('itens-carrinho');
    contador.innerText = carrinho.length;
    lista.innerHTML = '';
    carrinho.forEach((livro, index) => {
    const item = document.createElement('li');
    item.textContent = livro;
    lista.appendChild(item);
    });
}

const toggleCarrinho = () => {
    const carrinhoEl = document.getElementById('carrinho');
    carrinhoEl.style.display = carrinhoEl.style.display === 'block' ? 'none' : 'block';
}

const esvaziarCarrinho = () => {
    carrinho.length = 0;
    atualizarCarrinho();
}

const buscarEnderecoPorCep = async () => {
    const cepInput = document.getElementById('cep');
    const enderecoInput = document.getElementById('endereco');
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.erro) {
            alert('CEP não encontrado. Por favor, verifique o número digitado.');
            enderecoInput.value = '';
            return;
        }

        const enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        enderecoInput.value = enderecoCompleto;

        localizarEndereco();

    } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        alert('Não foi possível buscar o CEP. Verifique sua conexão ou tente novamente.');
    }
};

document.getElementById('cep').addEventListener('blur', buscarEnderecoPorCep);

const localizarEndereco = () => {
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;

    if (!cep || !endereco) {
    alert("Por favor, preencha o CEP e o endereço completo.");
    return;
    }

    const query = encodeURIComponent(`${endereco}, ${cep}, Brasil`);
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
    .then(res => res.json())
    .then(data => {
        if (data.length > 0) {
        const { lat, lon } = data[0];
        map.setView([lat, lon], 16);

        if (marcador) map.removeLayer(marcador);
        marcador = L.marker([lat, lon]).addTo(map)
            .bindPopup("Endereço de entrega").openPopup();
        } else {
        alert("Endereço não encontrado. Verifique os dados.");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Erro ao buscar localização. Tente novamente mais tarde.");
    });
}

//Carregar endereço do bind via CEP.