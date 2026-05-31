const modalElement = document.getElementById('loginModal');

// Instância do Modal
const loginModal = new bootstrap.Modal(modalElement);

// botão do Modal
const btnLogin = document.getElementById('btnLogin');

// evento clique
btnLogin.addEventListener('click', () => {
    loginModal.show();
});