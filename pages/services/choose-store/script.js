import { data } from '../../../database/database.js';

const btnBack = document.getElementById('btn-back')
const modalHeader = document.querySelector('.modal-header-type-03');
const iconOpenModalHeader = document.getElementById('icon-open-modal-header');
const iconCloseModalHeader = document.getElementById('icon-close-modal-header');

const storeForm = document.getElementById('store-form');
const inputStore = document.getElementById('input-store');
const dropdownStore = document.getElementById('dropdown-store');
const iconOpenSelectStore = document.getElementById('icon-open-select-store');
const iconCloseSelectStore = document.getElementById('icon-close-select-store');
const submitButton = document.getElementById('submit-button');

function toggleSubmitButton() {
  const selectedStore = inputStore.value;

  if (selectedStore) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'true');
  }
}

function renderStores() {
  const listDropdownStore = document.getElementById('list-dropdown-store');
  listDropdownStore.innerHTML = '';

  data.stores.forEach(store => {

    const storeCard = document.createElement('div');
    storeCard.classList.add('store-card');

    const storeName = document.createElement('strong');
    storeName.textContent = store.store;
    storeName.classList.add('store-name');

    const storeAddress = document.createElement('p');
    storeAddress.textContent = `${store.address.street}, ${store.address.number}, ${store.address.city} - ${store.address.state}`;
    storeAddress.classList.add('store-address');

    const locationIcon = document.createElement('img');
    locationIcon.src = '../../../assets/icons/location.svg';
    locationIcon.alt = 'Localização';
    locationIcon.classList.add('location-icon');

    const addressContainer = document.createElement('div');
    addressContainer.classList.add('address-container');
    addressContainer.appendChild(locationIcon);
    addressContainer.appendChild(storeAddress);

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'store';
    radioInput.classList.add('store-radio');
    radioInput.setAttribute('data-store', store.store);

    addressContainer.appendChild(storeAddress);

    radioInput.addEventListener('click', function (event) {
      event.stopPropagation();
      inputStore.value = store.store;
      closeDropDownStore();
      toggleSubmitButton()
    });

    storeCard.appendChild(storeName);
    storeCard.appendChild(addressContainer);
    storeCard.appendChild(radioInput);

    listDropdownStore.appendChild(storeCard);
  });

  const selectedStore = inputStore.value;
  if (selectedStore) {
    const radios = document.querySelectorAll('.store-radio');
    radios.forEach(radio => {
      if (radio.getAttribute('data-store') === selectedStore) {
        radio.checked = true;
        const storeCard = radio.closest('.store-card');
        if (storeCard) {
          storeCard.classList.add('active');
        }
      } else {
        const storeCard = radio.closest('.store-card');
        if (storeCard) {
          storeCard.classList.remove('active');
        }
      }
    });
  }
}

window.onload = () => {
  renderStores()
};

storeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = '../choose-date-time/index.html';
});

btnBack.addEventListener('click', () => {
  window.location.href = '../choose-service/index.html';
})

iconOpenSelectStore.addEventListener('click', (event) => {
  event.stopPropagation();
  renderStores();
  openDropDownStore()
});

iconCloseSelectStore.addEventListener('click', (event) => {
  event.stopPropagation();
  closeDropDownStore()
});

document.addEventListener('click', (event) => {
  if (!document.querySelector('.input-container').contains(event.target)) {
    closeDropDownStore()
  }
});

function openDropDownStore() {
  dropdownStore.classList.remove('hidden');
  iconOpenSelectStore.classList.add('hidden');
  iconCloseSelectStore.classList.remove('hidden');
}

function closeDropDownStore() {
  dropdownStore.classList.add('hidden');
  iconCloseSelectStore.classList.add('hidden');
  iconOpenSelectStore.classList.remove('hidden');
}

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

createSteps(5, 2);

