import { data } from '../../../database/database.js';

const btnBack = document.getElementById('btn-back')
const modalHeader = document.querySelector('.modal-header-type-03');
const iconOpenModalHeader = document.getElementById('icon-open-modal-header');
const iconCloseModalHeader = document.getElementById('icon-close-modal-header');
const textarea = document.getElementById('observations');
const charCount = document.getElementById('char-count');
const petServiceElement = document.querySelector('.pet-service');
const serviceForm = document.getElementById('service-form');
const submitButton = document.getElementById('submit-button');

let selectedService = '';
let selectedAdditionalService = '';

function updatePetService() {
  if (selectedAdditionalService) {
    petServiceElement.textContent = `${selectedService} (${selectedAdditionalService})`;
  } else {
    petServiceElement.textContent = selectedService;
  }
}

function toggleSubmitButton() {
  const selectedServiceCard = document.querySelector('.services-container .selected-service');

  if (selectedServiceCard) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'true');
  }
}

textarea.addEventListener('input', function () {
  const currentLength = textarea.value.length;
  const maxLength = textarea.getAttribute('maxlength');
  charCount.textContent = `${currentLength}/${maxLength}`;
});

textarea.addEventListener('focus', function () {
  this.setSelectionRange(0, 0);
});

function renderServices() {
  const servicesContainer = document.getElementById('services-container');
  servicesContainer.innerHTML = '';

  data.services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.classList.add('service-card');
    serviceCard.setAttribute('data-service', service.service);

    const serviceImage = document.createElement('img');
    serviceImage.src = service.image;
    serviceImage.alt = service.service;

    const cardImage = document.createElement('div');
    cardImage.appendChild(serviceImage);

    const serviceName = document.createElement('strong');
    serviceName.textContent = service.service;

    const serviceValue = document.createElement('span');
    serviceValue.textContent = service.value;

    serviceCard.appendChild(cardImage);
    serviceCard.appendChild(serviceName);
    serviceCard.appendChild(serviceValue);

    serviceCard.addEventListener('click', function () {
      document.querySelectorAll('.services-container .service-card').forEach(c => c.classList.remove('selected-service'));
      serviceCard.classList.add('selected-service');

      selectedService = this.getAttribute('data-service');
      updatePetService();

      toggleSubmitButton();
    });

    servicesContainer.appendChild(serviceCard);
  });
}

function renderAdditionalServices() {
  const additionalServicesContainer = document.getElementById('additional-services-container');
  additionalServicesContainer.innerHTML = '';

  data.additionalServices.forEach(service => {
    const additionalServiceCard = document.createElement('div');
    additionalServiceCard.classList.add('service-card');
    additionalServiceCard.setAttribute('data-service', service.service);

    const serviceImage = document.createElement('img');
    serviceImage.src = service.image;
    serviceImage.alt = service.service;

    const serviceName = document.createElement('strong');
    serviceName.textContent = service.service;

    const serviceValue = document.createElement('span');
    serviceValue.textContent = service.value;

    additionalServiceCard.appendChild(serviceImage);
    additionalServiceCard.appendChild(serviceName);
    additionalServiceCard.appendChild(serviceValue);

    additionalServiceCard.addEventListener('click', function () {
      const isSelected = additionalServiceCard.classList.contains('selected-additional-service');

      if (isSelected) {
        additionalServiceCard.classList.remove('selected-additional-service');
        selectedAdditionalService = '';
      } else {
        document.querySelectorAll('.additional-services-container .service-card').forEach(c => c.classList.remove('selected-additional-service'));
        additionalServiceCard.classList.add('selected-additional-service');

        if (this.getAttribute('data-service') === 'Todos os serviços') {
          selectedAdditionalService = 'Escovação de dentes + Hidratação';
        } else {
          selectedAdditionalService = this.getAttribute('data-service');
        }
      }

      updatePetService();
    });

    additionalServicesContainer.appendChild(additionalServiceCard);
  });
}

window.onload = () => {
  renderServices();
  renderAdditionalServices();
};

serviceForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const selectedServiceCard = document.querySelector('.services-container .selected-service');
  const selectedService = selectedServiceCard ? selectedServiceCard.getAttribute('data-service') : null;

  const selectedAdditionalServiceCard = document.querySelector('.additional-services-container .selected-additional-service');
  const selectedAdditionalService = selectedAdditionalServiceCard ? selectedAdditionalServiceCard.getAttribute('data-service') : null;

  const observations = document.getElementById('observations').value;

  console.log('Serviço Selecionado:', selectedService);
  console.log('Serviço Adicional Selecionado:', selectedAdditionalService);
  console.log('Observações:', observations);

  window.location.href = '../choose-store/index.html';
});

btnBack.addEventListener('click', () => {
  window.history.back();
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

createSteps(5, 1);

