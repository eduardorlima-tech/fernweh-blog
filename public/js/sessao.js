function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var id = sessionStorage.ID_USUARIO;

    var nomeUsuario = document.getElementById("nomeUsuario") || document.getElementById("b_usuario");

    if (email != null && nome != null && id != null) {
        if (nomeUsuario != null) {
            nomeUsuario.innerHTML = nome;
        }
        return true;
    } else {
        window.location = "/login.html";
        return false;
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "/login.html";
}

function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar != null) {
        divAguardar.style.display = "flex";
    }
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    if (divAguardar != null) {
        divAguardar.style.display = "none";
    }

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto && divErrosLogin != null) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}
