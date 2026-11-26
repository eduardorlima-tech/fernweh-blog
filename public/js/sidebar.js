const body = document.querySelector('body'),
      sidebar = body.querySelector('.sidebar'),
      toggle = body.querySelector('.toggle'),
      modeSwtich = body.querySelector('.toggle-switch'),
      modeText = body.querySelector('.mode-text');

if (toggle != null && sidebar != null) {
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('close');
    });
}

if (modeSwtich != null) {
    modeSwtich.addEventListener('click', () => {
        body.classList.toggle('dark');

        if (body.classList.contains('dark')) {
            modeText.innerText = 'Light Mode';
        } else {
            modeText.innerText = 'Dark Mode';
        }

        document.dispatchEvent(new CustomEvent('modoalterado'));
    });
}

const btnSair = document.getElementById('btnSair');

if (btnSair != null) {
    btnSair.addEventListener('click', () => {
        sessionStorage.clear();
    });
}

const nomeUsuario = document.getElementById('nomeUsuario');
const nomeSalvo = sessionStorage.NOME_USUARIO || sessionStorage.NOME;

if (nomeUsuario != null && nomeSalvo != undefined) {
    nomeUsuario.textContent = nomeSalvo;
}
