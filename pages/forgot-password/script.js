const formForgotPassword = document.getElementById('form-forgot-password');
const btnBack = document.getElementById('btn-back')

formForgotPassword.addEventListener('submit', (event) => {
  event.preventDefault()
  window.location.href = '../home/index.html'
})

btnBack.addEventListener('click', () => {
  window.history.back();
})