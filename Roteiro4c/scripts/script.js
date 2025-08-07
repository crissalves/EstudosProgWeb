const map = L.map('map').setView([-15.7942, -47.8822], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
let marcador;

const carrinho = [];

function adicionarCarrinho(livro) {
    carrinho.push(livro);
    atualizarCarrinho();
    alert(`Livro "${livro}" adicionado ao carrinho!`);
}

function atualizarCarrinho() {
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

function toggleCarrinho() {
    const carrinhoEl = document.getElementById('carrinho');
    carrinhoEl.style.display = carrinhoEl.style.display === 'block' ? 'none' : 'block';
}

function esvaziarCarrinho() {
    carrinho.length = 0;
    atualizarCarrinho();
}

function localizarEndereco() {
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