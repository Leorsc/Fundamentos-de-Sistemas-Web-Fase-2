const btnBack = document.getElementById('btn-back')
const modalHeader = document.querySelector('.modal-header-type-03');
const iconOpenModalHeader = document.getElementById('icon-open-modal-header');
const iconCloseModalHeader = document.getElementById('icon-close-modal-header');
const textarea = document.getElementById('observations');
const charCount = document.getElementById('char-count');
const optionYes = document.getElementById('option-yes');
const optionNo = document.getElementById('option-no');
const professionalForm = document.getElementById('professional-form');
const professionalCards = document.querySelectorAll('.professional-card');


function handleRadioSelection() {
  if (optionYes.checked) {
    textarea.disabled = false;
  } else {
    textarea.disabled = true;
  }
}

optionYes.addEventListener('change', handleRadioSelection);
optionNo.addEventListener('change', handleRadioSelection);

textarea.addEventListener('input', function () {
  const currentLength = textarea.value.length;
  const maxLength = textarea.getAttribute('maxlength');
  charCount.textContent = `${currentLength}/${maxLength}`;
});

textarea.addEventListener('focus', function () {
  this.setSelectionRange(0, 0);
});


function handleProfessionalSelection() {
  professionalCards.forEach(card => {
    card.classList.remove('active');
  });

  this.classList.add('active');

  const radioInput = this.querySelector('.professional-radio');
  radioInput.checked = true;
}

professionalCards.forEach(card => {
  card.addEventListener('click', handleProfessionalSelection);
});

professionalForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedRadio = document.querySelector('.professional-radio:checked');

  if (!selectedRadio) {
    alert('Por favor, selecione um profissional antes de prosseguir.');
    return;
  }

  window.location.href = '../review-confirmation/index.html';
});

btnBack.addEventListener('click', () => {
  window.location.href = '../choose-date-time/index.html';
});

handleRadioSelection();

document.addEventListener('click', (event) => {
  const isClickInsideModal = modalHeader.contains(event.target);
  const isClickOnButton = iconOpenModalHeader.contains(event.target);

  if (!isClickInsideModal && !isClickOnButton) {
    closeModal();
  }
});

iconOpenModalHeader.addEventListener('click', (event) => {
  event.stopPropagation();
  openModal()
});

iconCloseModalHeader.addEventListener('click', (event) => {
  event.stopPropagation();
  closeModal()
});

function openModal() {
  modalHeader.classList.remove('hidden');
  iconOpenModalHeader.classList.add('hidden')
  iconCloseModalHeader.classList.remove('hidden')
}

function closeModal() {
  modalHeader.classList.add('hidden');
  iconOpenModalHeader.classList.remove('hidden')
  iconCloseModalHeader.classList.add('hidden')
}

function createSteps(totalSteps, activeStep) {
  const stepsContainer = document.getElementById('steps-container');

  stepsContainer.innerHTML = '';

  for (let i = 1; i <= totalSteps; i++) {
    const step = document.createElement('div');
    step.classList.add('step');

    if (i === activeStep) {
      step.classList.add('active-step');
    }

    stepsContainer.appendChild(step);
  }
}

createSteps(5, 4);

