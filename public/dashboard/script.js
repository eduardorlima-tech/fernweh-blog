const PAGINA_LOGIN = '../login.html';
const PAGINA_QUIZ = '../quiz/quiz.html';

const usuarioId = sessionStorage.ID_USUARIO;

Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--text-color').trim();
Chart.defaults.borderColor = 'rgba(128, 128, 128, 0.2)';
Chart.defaults.font.family = 'Montserrat';

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const CORES_CONTINENTES = {
    'América': '#695CFE',
    'Europa': '#22c55e',
    'Ásia': '#f59e0b',
    'África': '#ef4444',
    'Oceania': '#3b82f6'
};

let graficoBarra = null;
let graficoRosca = null;

function atualizarCoresGraficos() {
    Chart.defaults.color = getComputedStyle(document.body).getPropertyValue('--text-color').trim();

    if (graficoBarra != null) {
        graficoBarra.update();
    }

    if (graficoRosca != null) {
        graficoRosca.update();
    }
}

document.addEventListener('modoalterado', atualizarCoresGraficos);

function preencherKpis(quiz) {
    document.getElementById('kpiPaises').textContent = quiz.paises_visitados;
    document.getElementById('kpiConcluidas').textContent = quiz.viagens_concluidas;
    document.getElementById('kpiPlanejadas').textContent = quiz.viagens_planejadas;
    document.getElementById('kpiDias').textContent = quiz.dias_viajando;
}

function plotarGraficos(meses, continentes) {

    const valoresMeses = MESES.map(mes => {
        const achado = meses.find(item => item.mes === mes);
        return achado ? achado.quantidade : 0;
    });

    const dadosBarra = {
        labels: MESES,
        datasets: [{
            label: 'Viagens',
            data: valoresMeses,
            backgroundColor: '#695CFE',
            borderRadius: 6
        }]
    };

    const configBarra = {
        type: 'bar',
        data: dadosBarra,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (contexto) => contexto.parsed.y + ' viagem(ns)'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    };

    graficoBarra = new Chart(document.getElementById('graficoLinha'), configBarra);

    const dadosRosca = {
        labels: continentes,
        datasets: [{
            data: continentes.map(() => 1),
            backgroundColor: continentes.map(continente => CORES_CONTINENTES[continente]),
            borderWidth: 0
        }]
    };

    const configRosca = {
        type: 'doughnut',
        data: dadosRosca,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: (contexto) => contexto.label
                    }
                }
            }
        }
    };

    graficoRosca = new Chart(document.getElementById('graficoRosca'), configRosca);
}

function mostrarPerfil(perfil) {
    const cards = document.querySelectorAll('.card-perfil');

    cards.forEach(card => {
        if (card.dataset.perfil === perfil) {
            card.classList.add('ativo');
        } else {
            card.classList.remove('ativo');
        }
    });
}

let faixas = [];
let pontos = [];
let atual = 0;

function criarCapaVazia(musica) {
    const capaVazia = document.createElement('div');
    capaVazia.className = 'capa capa-vazia';
    capaVazia.setAttribute('role', 'img');
    capaVazia.setAttribute('aria-label', `Sem capa para ${musica.titulo}`);
    capaVazia.innerHTML = "<i class='bx bx-music'></i>";
    return capaVazia;
}

function criarCapa(musica) {
    if (!musica.capa) {
        return criarCapaVazia(musica);
    }

    const imagem = document.createElement('img');
    imagem.className = 'capa';
    imagem.src = musica.capa;
    imagem.alt = `Capa de ${musica.titulo}`;
    imagem.addEventListener('error', () => {
        imagem.replaceWith(criarCapaVazia(musica));
    });
    return imagem;
}

function carregarTrilha(musicas) {
    const areaFaixas = document.getElementById('faixas');
    const areaPontos = document.getElementById('pontos');
    areaFaixas.innerHTML = '';
    areaPontos.innerHTML = '';

    faixas = [];
    pontos = [];
    atual = 0;

    if (musicas.length === 0) {
        areaFaixas.innerHTML = '<p class="faixa-titulo">Nenhuma música cadastrada.</p>';
        return;
    }

    musicas.forEach((musica, indice) => {
        const faixa = document.createElement('div');
        faixa.className = 'faixa';

        const titulo = document.createElement('p');
        titulo.className = 'faixa-titulo';
        titulo.textContent = musica.titulo;

        const artista = document.createElement('p');
        artista.className = 'faixa-artista';
        artista.textContent = musica.artista;

        faixa.appendChild(criarCapa(musica));
        faixa.appendChild(titulo);
        faixa.appendChild(artista);
        areaFaixas.appendChild(faixa);

        const ponto = document.createElement('button');
        ponto.className = 'ponto';
        ponto.type = 'button';
        ponto.setAttribute('aria-label', `Ir para a música ${indice + 1}`);
        ponto.addEventListener('click', () => mostrarFaixa(indice));
        areaPontos.appendChild(ponto);
    });

    faixas = document.querySelectorAll('.faixa');
    pontos = document.querySelectorAll('.ponto');
    mostrarFaixa(0);
}

function mostrarFaixa(posicao) {
    if (faixas.length === 0) {
        return;
    }

    faixas[atual].classList.remove('ativa');
    pontos[atual].classList.remove('ativo');

    atual = (posicao + faixas.length) % faixas.length;

    faixas[atual].classList.add('ativa');
    pontos[atual].classList.add('ativo');
}

document.getElementById('btnAnterior').addEventListener('click', () => mostrarFaixa(atual - 1));
document.getElementById('btnProxima').addEventListener('click', () => mostrarFaixa(atual + 1));

function carregarDashboard() {
    fetch('/dashboard/carregar/' + usuarioId)
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    preencherKpis(json.quiz);
                    plotarGraficos(json.meses, json.continentes);
                    mostrarPerfil(json.quiz.perfil);
                    carregarTrilha(json.musicas);
                });
            } else if (response.status == 404) {
                alert('Você ainda não respondeu o quiz.');
                window.location.href = PAGINA_QUIZ;
            } else {
                response.text().then(texto => console.error(texto));
                alert('Erro ao carregar a dashboard.');
            }
        })
        .catch(erro => {
            console.log(erro);
            alert('Erro ao carregar a dashboard.');
        });
}

if (usuarioId == undefined) {
    alert('Faça login para ver a dashboard.');
    window.location.href = PAGINA_LOGIN;
} else {
    carregarDashboard();
}