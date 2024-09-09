const btnBack = document.getElementById('btn-back')
const modalHeader = document.querySelector('.modal-header-type-03');
const iconOpenModalHeader = document.getElementById('icon-open-modal-header');
const iconCloseModalHeader = document.getElementById('icon-close-modal-header');

const reviewConfirmationForm = document.getElementById('review-confirmation-form');

reviewConfirmationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = '../../home/index.html';
});

btnBack.addEventListener('click', () => {
  window.location.href = '../choose-professional/index.html';
})

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

createSteps(5, 5);

