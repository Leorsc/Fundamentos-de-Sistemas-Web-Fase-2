import { data } from '../../database/database.js';

const inputType = document.getElementById('input-type');
const dropdownType = document.getElementById('dropdown-type');
const iconOpenSelectType = document.getElementById('icon-open-select-type');
const iconCloseSelectType = document.getElementById('icon-close-select-type');

const inputTemperament = document.getElementById('input-temperament');
const dropdownTemperament = document.getElementById('dropdown-temperament');
const iconOpenSelectTemperament = document.getElementById('icon-open-select-temperament');
const iconCloseSelectTemperament = document.getElementById('icon-close-select-temperament');

const formRegisterPet = document.getElementById('form-register-pet');
const btnBack = document.getElementById('btn-back')

function renderTypes() {
  const listDropdownType = document.getElementById('list-dropdown-type');
  listDropdownType.innerHTML = '';

  data.petType.forEach(type => {
    const typeValue = document.createElement('span');
    typeValue.setAttribute('data-type', type.name);
    typeValue.textContent = type.name;


    typeValue.addEventListener('click', function (event) {
      inputType.value = event.target.textContent;
      closeDropDownType();
    });

    listDropdownType.appendChild(typeValue);
  });
}

function renderTemperament() {
  const listDropdownTemperament = document.getElementById('list-dropdown-temperament');
  listDropdownTemperament.innerHTML = '';

  data.petTemperament.forEach(temperament => {
    const temperamentValue = document.createElement('span');
    temperamentValue.setAttribute('data-temperament', temperament.name);
    temperamentValue.textContent = temperament.name;


    temperamentValue.addEventListener('click', function (event) {
      inputTemperament.value = event.target.textContent;
      closeDropDownType();
    });

    listDropdownTemperament.appendChild(temperamentValue);
  });
}

window.onload = () => {
  renderTypes()
  renderTemperament()
};

formRegisterPet.addEventListener('submit', (event) => {
  event.preventDefault()
  window.location.href = '../pets/index.html'
})

btnBack.addEventListener('click', () => {
  window.history.back();
})

iconOpenSelectType.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!document.querySelector('.input-container').contains(event.target)) {
    closeDropDownTemperament()
  }
  openDropDownType()
});

iconCloseSelectType.addEventListener('click', (event) => {
  event.stopPropagation();
  closeDropDownType()
});

document.addEventListener('click', (event) => {
  if (!document.querySelector('.input-container').contains(event.target)) {
    closeDropDownType()
  }
});

function openDropDownType() {
  dropdownType.classList.remove('hidden');
  iconOpenSelectType.classList.add('hidden');
  iconCloseSelectType.classList.remove('hidden');
}

function closeDropDownType() {
  dropdownType.classList.add('hidden');
  iconCloseSelectType.classList.add('hidden');
  iconOpenSelectType.classList.remove('hidden');
}

iconOpenSelectTemperament.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!document.querySelector('.input-container').contains(event.target)) {
    closeDropDownType()
  }
  openDropDownTemperament()
});

iconCloseSelectTemperament.addEventListener('click', (event) => {
  event.stopPropagation();
  closeDropDownTemperament()
});

document.addEventListener('click', (event) => {
  if (!document.querySelector('.input-container').contains(event.target)) {
    closeDropDownTemperament()
  }
});


function openDropDownTemperament() {
  dropdownTemperament.classList.remove('hidden');
  iconOpenSelectTemperament.classList.add('hidden');
  iconCloseSelectTemperament.classList.remove('hidden');
}

function closeDropDownTemperament() {
  dropdownTemperament.classList.add('hidden');
  iconCloseSelectTemperament.classList.add('hidden');
  iconOpenSelectTemperament.classList.remove('hidden');
}
