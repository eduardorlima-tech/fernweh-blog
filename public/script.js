const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const inp = document.getElementById('ipt');
const eyeBtn = document.getElementById('eyeBtn');
const eyeIcon = eyeBtn.querySelector('i');

const pStatus = document.getElementById('pStatus');
const range = document.querySelector('.rangeStatus');
const strengthIcon = document.querySelector('#strengthIcon i');

eyeBtn.addEventListener('click', () => {
    if(inp.type === 'password') {
        inp.type = 'text';
        eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        inp.type = 'password';
        eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
})

inp.addEventListener('input', () => {

    const value = inp.value;

    let abc = /[a-z]/.test(value);
    let ABC = /[A-Z]/.test(value);
    let numChar = /[0-9]/.test(value);
    let special = /[^A-Za-z0-9]/.test(value);
    let inpLen= value.length >= 8;

    const score = [inpLen, ABC, abc, numChar, special].filter(Boolean).length;

    updateStrength(score)

})

function updateStrength(score) {

    if(score <= 1) {
        pStatus.innerText = 'Fraca';
        pStatus.style.color = '#ef4444';

        range.style.width = '20%';
        range.style.background = '#ef4444'

        strengthIcon.className = 'fa-solid fa-shield';
        strengthIcon.parentElement.style.color = '#ef4444';
        strengthIcon.parentElement.style.background = 'rgba(239, 68, 68, 0.1)'
    } else if(score <= 3) {
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