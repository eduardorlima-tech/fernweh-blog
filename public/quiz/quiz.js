var PAGINA_LOGIN = '../login.html';
var PAGINA_INICIO = 'index.html';
var PAGINA_DASHBOARD = '../dashboard/dashboard.html';

var QTD_MUSICAS = 3;

var usuarioId = sessionStorage.ID_USUARIO;

var jaRespondeu = false;

var SETA = '<svg width="16" height="12" viewBox="0 0 16 12"><path d="M1 6h13M9 1l5 5-5 5" fill="none" stroke="#2a2619" stroke-width="1.5"/></svg>';

var perfis = ['Comilão', 'Improvisador', 'Fotógrafo', 'Dorminhoco'];

var perguntas = [
    { titulo: 'Quantos países você já visitou?', dica: 'Digite um número.', tipo: 'numero' },
    {
        titulo: 'Em quais continentes você já viajou?',
        dica: 'Marque quantos quiser.',
        tipo: 'multipla',
        colunas: 'duas-colunas',
        opcoes: ['América', 'Europa', 'Ásia', 'África', 'Oceania'],
        rotulos: ['América', 'Europa', 'Ásia', 'África', 'Oceania']
    },
    {
        titulo: 'O que não pode faltar na sua mala?',
        dica: 'Escolha uma opção.',
        tipo: 'unica',
        opcoes: ['Uma sacola vazia para trazer comidinha de lá.', 'Nada planejado, só uma muda de roupa e fé.', 'Carregador portátil e tripé.', 'O travesseiro de casa.']
    },
    { titulo: 'Quantas viagens você já concluiu?', dica: 'Digite um número.', tipo: 'numero' },
    {
        titulo: 'O que você faz ao chegar no hotel?',
        dica: 'Escolha uma opção.',
        tipo: 'unica',
        opcoes: ['Pergunto onde fica o melhor restaurante antes de largar a mala.', 'Largo a mala e saio sem rumo.', 'Gravo o vídeo do quarto para o story.', 'Deito "só um minutinho" e acordo no dia seguinte.']
    },
    {
        titulo: 'Quantas viagens você fez em cada mês no último ano?',
        dica: 'Digite um número para cada mês. Se não viajou, deixe 0.',
        tipo: 'meses',
        opcoes: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        rotulos: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    { titulo: 'Quantos dias, no total, você passou viajando no último ano?', dica: 'Digite um número de 0 a 366.', tipo: 'numero' },
    {
        titulo: 'Qual frase mais combina com você numa viagem?',
        dica: 'Escolha uma opção.',
        tipo: 'unica',
        opcoes: ['"Só mais uma entradinha antes do prato principal".', '"A gente descobre quando chegar".', '"Espera, deixa eu tirar só mais uma".', '"O passeio é a gente descansar".']
    },
    { titulo: 'Quantas viagens você tem planejadas?', dica: 'Digite um número.', tipo: 'numero' },
    {
        titulo: 'Qual é a trilha sonora da sua trip?',
        dica: 'Escolha 3 músicas: o artista ajuda a achar a música certa e a capa aparece na dashboard.',
        tipo: 'musica'
    }
];

var respostas = [];
var atual = 0;

function iniciar() {
    if (usuarioId == undefined) {
        alert('Faça login para responder o quiz.');
        window.location.href = PAGINA_LOGIN;
        return;
    }

    carregarRespostasSalvas(function () {
        mostrarPergunta();
    });
}

function carregarRespostasSalvas(depois) {
    fetch('/dashboard/carregar/' + usuarioId)
        .then(function (response) {
            if (response.ok) {
                return response.json().then(function (json) {
                    jaRespondeu = true;
                    preencherComRespostasSalvas(json);
                });
            }
        })
        .catch(function (falha) {
            console.log(falha);
        })
        .then(function () {
            depois();
        });
}

function preencherComRespostasSalvas(json) {
    respostas[0] = json.quiz.paises_visitados;
    respostas[3] = json.quiz.viagens_concluidas;
    respostas[6] = json.quiz.dias_viajando;
    respostas[8] = json.quiz.viagens_planejadas;

    respostas[1] = json.continentes;

    var quantidades = [];
    for (var i = 0; i < 12; i++) {
        quantidades.push(0);
    }
    for (var m = 0; m < json.meses.length; m++) {
        var posicao = perguntas[5].rotulos.indexOf(json.meses[m].mes);
        quantidades[posicao] = json.meses[m].quantidade;
    }
    respostas[5] = quantidades;

    var musicas = [];
    for (var j = 0; j < json.musicas.length && j < QTD_MUSICAS; j++) {
        musicas.push({ artista: json.musicas[j].artista, musica: json.musicas[j].titulo });
    }

    if (musicas.length > 0) {
        respostas[9] = musicas;
    }
}

function mostrarPergunta() {
    var p = perguntas[atual];
    var resposta = respostas[atual];
    var html = '';

    titulo.innerHTML = p.titulo;
    dica.innerHTML = p.dica;
    erro.innerHTML = '';
    contagem.innerHTML = 'Pergunta ' + (atual + 1) + ' de ' + perguntas.length;

    var porcentagem = ((atual + 1) / perguntas.length) * 100;
    barra.style.width = porcentagem + '%';
    pin.style.left = porcentagem + '%';

    if (p.tipo == 'numero') {
        html = '<input type="number" min="0" step="1" id="campo_numero" class="campo" placeholder="Ex.: 5">';
    }

    if (p.tipo == 'multipla') {
        html = '<div class="grade-chips ' + p.colunas + '">';
        for (var i = 0; i < p.opcoes.length; i++) {
            var classe = 'chip';
            if (resposta != undefined && resposta.indexOf(p.opcoes[i]) != -1) {
                classe = 'chip marcado';
            }
            html += '<button type="button" class="' + classe + '" data-valor="' + p.opcoes[i] + '" onclick="marcarChip(this)">';
            html += '<span>' + p.rotulos[i] + '</span><span class="sinal"></span></button>';
        }
        html += '</div>';
    }

    if (p.tipo == 'unica') {
        for (var j = 0; j < p.opcoes.length; j++) {
            var marcado = '';
            if (resposta == p.opcoes[j]) {
                marcado = 'checked';
            }
            html += '<label class="opcao"><input type="radio" name="opcao" value="' + j + '" ' + marcado + '>';
            html += '<span>' + p.opcoes[j] + '</span></label>';
        }
    }

    if (p.tipo == 'meses') {
        html = '<div class="grade-chips quatro-colunas">';
        for (var n = 0; n < p.rotulos.length; n++) {
            html += '<label class="mes-campo"><span>' + p.rotulos[n] + '</span>';
            html += '<input type="number" min="0" step="1" id="campo_mes_' + n + '" class="campo" placeholder="0"></label>';
        }
        html += '</div>';
    }

    if (p.tipo == 'musica') {
        for (var k = 0; k < QTD_MUSICAS; k++) {
            html += '<p class="campo-label">Música ' + (k + 1) + '</p>';
            html += '<div class="linha-musica">';
            html += '<input type="text" id="campo_artista_' + k + '" class="campo" maxlength="100" placeholder="Artista" aria-label="Artista da música ' + (k + 1) + '">';
            html += '<input type="text" id="campo_musica_' + k + '" class="campo" maxlength="150" placeholder="Nome da música" aria-label="Nome da música ' + (k + 1) + '">';
            html += '</div>';
        }
    }

    area.innerHTML = html;

    if (p.tipo == 'numero' && resposta != undefined) {
        campo_numero.value = resposta;
    }
    if (p.tipo == 'meses' && resposta != undefined) {
        for (var q = 0; q < resposta.length; q++) {
            document.getElementById('campo_mes_' + q).value = resposta[q];
        }
    }
    if (p.tipo == 'musica' && resposta != undefined) {
        for (var s = 0; s < resposta.length; s++) {
            document.getElementById('campo_artista_' + s).value = resposta[s].artista;
            document.getElementById('campo_musica_' + s).value = resposta[s].musica;
        }
    }

    btn_proxima.disabled = false;

    if (atual == perguntas.length - 1) {
        btn_proxima.innerHTML = 'Salvar respostas ' + SETA;
    } else {
        btn_proxima.innerHTML = 'Próxima ' + SETA;
    }
}

function marcarChip(botao) {
    botao.classList.toggle('marcado');
}

function guardarResposta() {
    var p = perguntas[atual];

    if (p.tipo == 'numero') {
        var numero = Number(campo_numero.value);

        if (campo_numero.value == '' || numero < 0 || !Number.isInteger(numero)) {
            erro.innerHTML = 'Digite um número inteiro maior ou igual a zero.';
            return false;
        }

        if (atual == 6 && numero > 366) {
            erro.innerHTML = 'O máximo é 366 dias.';
            return false;
        }

        respostas[atual] = numero;
    }

    if (p.tipo == 'multipla') {
        var marcados = document.querySelectorAll('.chip.marcado');
        if (marcados.length == 0) {
            erro.innerHTML = 'Marque pelo menos uma opção.';
            return false;
        }
        var lista = [];
        for (var i = 0; i < marcados.length; i++) {
            lista.push(marcados[i].getAttribute('data-valor'));
        }
        respostas[atual] = lista;
    }

    if (p.tipo == 'unica') {
        var escolhida = document.querySelector('input[name="opcao"]:checked');
        if (escolhida == null) {
            erro.innerHTML = 'Escolha uma opção para continuar.';
            return false;
        }
        respostas[atual] = p.opcoes[escolhida.value];
    }

    if (p.tipo == 'meses') {
        var quantidades = [];

        for (var m = 0; m < p.rotulos.length; m++) {
            var qtd = Number(document.getElementById('campo_mes_' + m).value);

            if (qtd < 0 || !Number.isInteger(qtd)) {
                erro.innerHTML = 'Use números inteiros maiores ou iguais a zero.';
                return false;
            }

            quantidades.push(qtd);
        }

        respostas[atual] = quantidades;
    }

    if (p.tipo == 'musica') {
        var musicas = [];

        for (var k = 0; k < QTD_MUSICAS; k++) {
            var artista = document.getElementById('campo_artista_' + k).value.trim();
            var nomeMusica = document.getElementById('campo_musica_' + k).value.trim();

            if (artista == '' || nomeMusica == '') {
                erro.innerHTML = 'Preencha o artista e o nome da música ' + (k + 1) + '.';
                return false;
            }

            musicas.push({ artista: artista, musica: nomeMusica });
        }

        respostas[atual] = musicas;
    }

    return true;
}

function proxima() {
    if (guardarResposta() == false) {
        return;
    }

    if (atual == perguntas.length - 1) {
        finalizar();
    } else {
        atual++;
        mostrarPergunta();
    }
}

function voltar() {
    if (atual == 0) {
        window.location.href = PAGINA_INICIO;
    } else {
        atual--;
        mostrarPergunta();
    }
}

function calcularResultado() {
    var posicoesPerfil = [2, 4, 7];
    var pontos = [0, 0, 0, 0];

    for (var i = 0; i < posicoesPerfil.length; i++) {
        var posicao = perguntas[posicoesPerfil[i]].opcoes.indexOf(respostas[posicoesPerfil[i]]);
        pontos[posicao]++;
    }

    var maior = 0;
    for (var j = 1; j < pontos.length; j++) {
        if (pontos[j] > pontos[maior]) {
            maior = j;
        }
    }

    return perfis[maior];
}

function finalizar() {
    btn_proxima.disabled = true;
    btn_proxima.innerHTML = 'Buscando as capas...';
    erro.innerHTML = '';

    buscarCapas(respostas[9], function (musicas) {
        btn_proxima.innerHTML = 'Salvando...';

        var dados = {
            usuarioId: usuarioId,
            paisesVisitados: respostas[0],
            viagensConcluidas: respostas[3],
            viagensPlanejadas: respostas[8],
            diasViajando: respostas[6],
            perfil: calcularResultado(),
            meses: mesesAbreviados(),
            continentes: respostas[1],
            musicas: musicas
        };

        if (jaRespondeu) {
            enviarParaOBackend('PUT', '/quiz/editar/' + usuarioId, dados);
        } else {
            enviarParaOBackend('POST', '/quiz/cadastrar', dados);
        }
    });
}

function buscarCapas(lista, depois) {
    var musicas = [];
    var terminadas = 0;

    for (var i = 0; i < lista.length; i++) {
        musicas[i] = { titulo: lista[i].musica, artista: lista[i].artista, capa: null };

        buscarCapa(i, lista[i].artista, lista[i].musica, function (posicao, capa) {
            musicas[posicao].capa = capa;
            terminadas++;

            if (terminadas == lista.length) {
                depois(musicas);
            }
        });
    }
}

function buscarCapa(posicao, artista, nomeMusica, depois) {
    var capa = null;
    var termo = encodeURIComponent(artista + ' ' + nomeMusica);
    var url = 'https://itunes.apple.com/search?term=' + termo + '&media=music&entity=song&country=BR&limit=1';

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            if (json.resultCount > 0) {
                capa = json.results[0].artworkUrl100.replace('100x100bb', '600x600bb');
            }
        })
        .catch(function (falha) {
            console.log(falha);
        })
        .then(function () {
            depois(posicao, capa);
        });
}

function mesesAbreviados() {
    var lista = [];

    for (var i = 0; i < respostas[5].length; i++) {
        lista.push({ mes: perguntas[5].rotulos[i], quantidade: respostas[5][i] });
    }

    return lista;
}

function enviarParaOBackend(metodo, url, dados) {
    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(function (response) {
            if (response.ok) {
                window.location.href = PAGINA_DASHBOARD;
            } else {
                response.text().then(function (texto) {
                    console.log(texto);

                    if (metodo == 'POST' && texto.indexOf('Duplicate entry') != -1) {
                        enviarParaOBackend('PUT', '/quiz/editar/' + usuarioId, dados);
                    } else if (response.status == 400) {
                        mostrarErroAoSalvar(texto);
                    } else {
                        mostrarErroAoSalvar('Não foi possível salvar as respostas. Tente de novo.');
                    }
                });
            }
        })
        .catch(function (falha) {
            console.log(falha);
            mostrarErroAoSalvar('Não foi possível salvar as respostas. Tente de novo.');
        });
}

function mostrarErroAoSalvar(mensagem) {
    erro.innerHTML = mensagem;
    btn_proxima.disabled = false;
    btn_proxima.innerHTML = 'Salvar respostas ' + SETA;
}