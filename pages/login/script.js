const btnLoginAccount = document.getElementById('btn-login-account');
const btnCreateAccount = document.getElementById('btn-create-account');

btnLoginAccount.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = '../acess-account/index.html';
});

btnCreateAccount.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = '../register/index.html';
});



