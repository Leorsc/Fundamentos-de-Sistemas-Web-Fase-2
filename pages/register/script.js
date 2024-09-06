const formRegister = document.getElementById('form-register');
const btnBack = document.getElementById('btn-back');

const passwordInput = document.getElementById('password-input');
const confirmPasswordInput = document.getElementById('confirm-password-input');

const iconEyePassword = document.getElementById('icon-eye-password');
const iconEyeSlashPassword = document.getElementById('icon-eye-slash-password');
const iconEyeConfirmPassword = document.getElementById('icon-eye-confirm-password');
const iconEyeSlashConfirmPassword = document.getElementById('icon-eye-slash-confirm-password');

formRegister.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = '../home/index.html';
});

btnBack.addEventListener('click', () => {
  window.history.back();
});



function toggleVisibility(input, iconShow, iconHide) {
  if (input.type === 'password') {
    iconShow.classList.remove('hidden');
    iconHide.classList.add('hidden');
    input.type = 'text';
  } else {
    iconShow.classList.add('hidden');
    iconHide.classList.remove('hidden');
    input.type = 'password';
  }
}

iconEyePassword.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleVisibility(passwordInput, iconEyePassword, iconEyeSlashPassword);
  passwordInput.focus();
});

iconEyeSlashPassword.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleVisibility(passwordInput, iconEyePassword, iconEyeSlashPassword);
  passwordInput.focus();
});

iconEyeConfirmPassword.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleVisibility(confirmPasswordInput, iconEyeConfirmPassword, iconEyeSlashConfirmPassword);
  confirmPasswordInput.focus();
});

iconEyeSlashConfirmPassword.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleVisibility(confirmPasswordInput, iconEyeConfirmPassword, iconEyeSlashConfirmPassword);
  confirmPasswordInput.focus();
});
