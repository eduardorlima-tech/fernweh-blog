const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    irParaLogin();
});

const inpNome = document.getElementById('ipt_nome');
const inpEmail = document.getElementById('ipt_email');
const inp = document.getElementById('ipt');
const eyeBtn = document.getElementById('eyeBtn');
const eyeIcon = eyeBtn.querySelector('i');

const inpEmailLogin = document.getElementById('ipt_email_login');
const inpSenhaLogin = document.getElementById('ipt_senha_login');
const eyeBtnLogin = document.querySelector('.sign-in #eyeBtn');
const eyeIconLogin = eyeBtnLogin.querySelector('i');

const pStatus = document.getElementById('pStatus');
const range = document.querySelector('.rangeStatus');
const strengthIcon = document.querySelector('#strengthIcon i');

eyeBtn.addEventListener('click', () => {
    if (inp.type === 'password') {
        inp.type = 'text';
        eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        inp.type = 'password';
        eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
});

eyeBtnLogin.addEventListener('click', () => {
    if (inpSenhaLogin.type === 'password') {
        inpSenhaLogin.type = 'text';
        eyeIconLogin.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        inpSenhaLogin.type = 'password';
        eyeIconLogin.classList.replace('fa-eye-slash', 'fa-eye');
    }
});

function calcularScore(value) {
    const temMinuscula = /[a-z]/.test(value);
    const temMaiuscula = /[A-Z]/.test(value);
    const temNumero = /[0-9]/.test(value);
    const temEspecial = /[^A-Za-z0-9\s]/.test(value);
    const temTamanho = value.length >= 8;

    return [temTamanho, temMaiuscula, temMinuscula, temNumero, temEspecial].filter(Boolean).length;
}

inp.addEventListener('input', () => {
    updateStrength(calcularScore(inp.value));
});

function updateStrength(score) {

    if (score <= 1) {
        pStatus.innerText = 'Fraca';
        pStatus.style.color = '#ef4444';

        range.style.width = '20%';
        range.style.background = '#ef4444'

        strengthIcon.className = 'fa-solid fa-shield';
        strengthIcon.parentElement.style.color = '#ef4444';
        strengthIcon.parentElement.style.background = 'rgba(239, 68, 68, 0.1)'
    } else if (score <= 3) {
        pStatus.innerText = 'Média';
        pStatus.style.color = '#f59e0b';

        range.style.width = '65%';
        range.style.background = '#f59e0b'

        strengthIcon.className = 'fa-solid fa-shield';
        strengthIcon.parentElement.style.color = '#f59e0b';
        strengthIcon.parentElement.style.background = 'rgba(245, 158, 11, 0.1)'
    } else {
        pStatus.innerText = 'Forte';
        pStatus.style.color = '#22c55e';

        range.style.width = '100%';
        range.style.background = '#22c55e'

        strengthIcon.className = 'fa-solid fa-shield';
        strengthIcon.parentElement.style.color = '#22c55e';
        strengthIcon.parentElement.style.background = 'rgba(34, 197, 94, 0.1)'
    }
}

function irParaLogin() {
    container.classList.remove("active");
}

function limparCadastro() {
    inpNome.value = '';
    inpEmail.value = '';
    inp.value = '';
    inp.type = 'password';
    eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    updateStrength(0);
}

function cadastrar() {
    const nomeVar = inpNome.value.trim();
    const emailVar = inpEmail.value.trim();
    const senhaVar = inp.value;

    if (nomeVar === "" || emailVar === "" || senhaVar === "") {
        alert("Preencha todos os campos.");
    } else if (nomeVar.length < 3) {
        alert("Digite um nome com pelo menos 3 caracteres.");
    } else if (emailVar.indexOf("@") === -1 || emailVar.indexOf(".") === -1) {
        alert("Digite um e-mail válido.");
    } else if (calcularScore(senhaVar) < 4) {
        alert("A senha precisa ser forte (pelo menos 4 critérios).");
    } else {
        alert("Cadastro realizado com sucesso!");
        limparCadastro();
        irParaLogin();
    }
}

function entrar() {
    const emailVar = inpEmailLogin.value.trim();
    const senhaVar = inpSenhaLogin.value;

    if (emailVar === "" || senhaVar === "") {
        alert("Preencha todos os campos.");
    } else if (emailVar.indexOf("@") === -1 || emailVar.indexOf(".") === -1) {
        alert("Digite um e-mail válido.");
    } else {
        window.location.href = "dashboard/dashboard.html";
    }
}