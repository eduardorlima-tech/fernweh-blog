var PAGINA_LOGIN = '../login.html';

var usuarioId = sessionStorage.ID_USUARIO;

if (usuarioId == undefined) {
    alert('Faça login para acessar o quiz.');
    window.location.href = PAGINA_LOGIN;
}

if (sessionStorage.NOME_USUARIO != undefined) {
    nomeUsuario.innerHTML = sessionStorage.NOME_USUARIO;
}

btnSair.addEventListener('click', function () {
    sessionStorage.clear();
});

btn_editar.style.display = 'none';
btn_excluir.style.display = 'none';

function mostrarBotoes(temRespostas) {
    if (temRespostas) {
        btn_editar.style.display = '';
        btn_excluir.style.display = '';
    } else {
        btn_editar.style.display = 'none';
        btn_excluir.style.display = 'none';
    }
}

function atualizarBotoes() {
    fetch('/dashboard/carregar/' + usuarioId)
        .then(function (resposta) {
            mostrarBotoes(resposta.ok);
        })
        .catch(function (falha) {
            console.log(falha);
            mostrarBotoes(false);
        });
}

function abrirModal() {
    modal.classList.add('aberto');
}

function fecharModal() {
    modal.classList.remove('aberto');
}

function excluirTudo() {
    fetch('/quiz/deletar/' + usuarioId, { method: 'DELETE' })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Erro ' + resposta.status);
            }
            fecharModal();
            atualizarBotoes();
        })
        .catch(function (falha) {
            console.log(falha);
            fecharModal();
            alert('Não foi possível excluir. Tente de novo.');
        });
}

atualizarBotoes();
