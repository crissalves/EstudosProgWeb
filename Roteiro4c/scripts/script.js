const LCC3_COORDS = { lat: -7.2185, lon: -35.9083 };

const livros = [{
    id: 1,
    titulo: 'Estruturas de Dados e Algoritmos',
    autor: 'Mark Allen Weiss',
    preco: 129.90
}, {
    id: 2,
    titulo: 'Clean Code',
    autor: 'Robert C. Martin',
    preco: 89.90
}, {
    id: 3,
    titulo: 'Design Patterns',
    autor: 'Erich Gamma',
    preco: 109.90
}];

const carrinho = [];
let marcador;

const map = L.map('map').setView([-15.7942, -47.8822], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

function renderizarLivros() {
    const container = document.getElementById('book-list-container');
    if (!container) return;
    container.innerHTML = '';

    livros.forEach(livro => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
            <h3>${livro.titulo}</h3>
            <p>Autor: ${livro.autor}</p>
            <p>Preço: R$ ${livro.preco.toFixed(2).replace('.', ',')}</p>
            <button onclick="adicionarCarrinho(${livro.id})">Adicionar ao Carrinho</button>
        `;
        container.appendChild(bookDiv);
    });
}

const adicionarCarrinho = (livro) => {
    carrinho.push(livro);
    atualizarCarrinho();
    alert(`Livro "${livro}" adicionado ao carrinho!`);
};

const atualizarCarrinho = () => {
    const contador = document.getElementById('carrinho-contador');
    const lista = document.getElementById('itens-carrinho');
    const totalEl = document.getElementById('carrinho-total');

    contador.innerText = carrinho.length;
    lista.innerHTML = '';
    
    carrinho.forEach(livro => {
        const item = document.createElement('li');
        item.textContent = livro;
        lista.appendChild(item);
    });

    if (totalEl) {
        totalEl.textContent = '0,00';
    }
};

const toggleCarrinho = () => {
    const carrinhoEl = document.getElementById('carrinho');
    carrinhoEl.style.display = carrinhoEl.style.display === 'block' ? 'none' : 'block';
};

const esvaziarCarrinho = () => {
    carrinho.length = 0;
    atualizarCarrinho();
};

const buscarEnderecoPorCep = async () => {
    const cepInput = document.getElementById('cep');
    const enderecoInput = document.getElementById('endereco');
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) return;

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
        
        await localizarEndereco(false);

    } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        alert('Não foi possível buscar o CEP. Verifique sua conexão ou tente novamente.');
    }
};

const calcularCustoEntrega = async (destinoLat, destinoLon) => {
    const card = document.getElementById('delivery-info-card');
    const distanciaEl = document.getElementById('distancia-km');
    const custoEl = document.getElementById('custo-frete');

    const url = `https://router.project-osrm.org/route/v1/driving/${LCC3_COORDS.lon},${LCC3_COORDS.lat};${destinoLon},${destinoLat}?overview=false`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
            throw new Error('Não foi possível calcular a rota.');
        }

        const distanciaEmMetros = data.routes[0].distance;
        const distanciaEmKm = distanciaEmMetros / 1000;
        const custoTotal = distanciaEmKm * 1.20;

        distanciaEl.textContent = distanciaEmKm.toFixed(2);
        custoEl.textContent = custoTotal.toFixed(2).replace('.', ',');
        card.style.display = 'block';
    } catch (error) {
        console.error("Erro ao calcular rota:", error);
        card.style.display = 'none';
    }
};

const localizarEndereco = async (exibirCusto = false) => {
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const deliveryCard = document.getElementById('delivery-info-card');

    if (deliveryCard) {
        deliveryCard.style.display = 'none';
    }

    if (!cep || !endereco) {
        alert("Por favor, preencha o CEP e o endereço completo.");
        return;
    }

    const query = encodeURIComponent(`${endereco}, ${cep}, Brasil`);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro na requisição: ${response.statusText}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            map.setView([lat, lon], 16);

            if (marcador) map.removeLayer(marcador);
            marcador = L.marker([lat, lon]).addTo(map).bindPopup("Endereço de entrega").openPopup();
            
            if (exibirCusto) {
                await calcularCustoEntrega(lat, lon);
            }

        } else {
            alert("Endereço não encontrado no mapa. Verifique os dados.");
        }
    } catch (err) {
        console.error("Falha ao buscar localização no mapa:", err);
        alert("Erro ao buscar a localização no mapa. Tente novamente mais tarde.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', buscarEnderecoPorCep);
    }
});