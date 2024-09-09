const btnBack = document.getElementById('btn-back')
const modalHeader = document.querySelector('.modal-header-type-03');
const iconOpenModalHeader = document.getElementById('icon-open-modal-header');
const iconCloseModalHeader = document.getElementById('icon-close-modal-header');

const currentMonthYearElement = document.getElementById('current-month-year');
const calendarDaysContainer = document.getElementById('calendar-days');
const dateTimeForm = document.getElementById('date-time-form');
const submitButton = document.getElementById('submit-button');

let selectedDate = null;
let selectedTime = null;
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function toggleSubmitButton() {
  if (selectedDate && selectedTime) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'true');
  }
}

function generateCalendar() {
  calendarDaysContainer.innerHTML = '';

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  currentMonthYearElement.textContent = `${monthNames[currentMonth]} de ${currentYear}`;

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const prevMonthDays = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    prevMonthDays.push(prevMonthLastDay - i);
  }

  function createDaySlot(day, isDisabled = false, isToday = false, isFuture = false) {
    const dayId = `day-${currentYear}-${currentMonth}-${day}`;

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'day-slot';
    radioInput.value = day;
    radioInput.id = dayId;
    radioInput.disabled = isDisabled;

    const label = document.createElement('label');
    label.setAttribute('for', dayId);
    label.textContent = day;

    if (isDisabled) {
      label.classList.add('disabled');
    }
    if (isToday) {
      label.classList.add('today');
    }
    if (isFuture) {
      label.classList.add('future');
    }

    const dayDiv = document.createElement('div');
    dayDiv.classList.add('calendar-day');
    dayDiv.appendChild(radioInput);
    dayDiv.appendChild(label);

    return dayDiv;
  }

  prevMonthDays.forEach(day => {
    const daySlot = createDaySlot(day, true);
    calendarDaysContainer.appendChild(daySlot);
  });

  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDay = new Date(currentYear, currentMonth, day);
    const isToday = currentDay.toDateString() === today.toDateString();
    const isDisabled = currentDay < today;
    const isFuture = currentDay > today;

    const daySlot = createDaySlot(day, isDisabled, isToday, isFuture);
    calendarDaysContainer.appendChild(daySlot);
  }

  const remainingDays = 35 - (prevMonthDays.length + daysInMonth);
  for (let day = 1; day <= remainingDays; day++) {
    const daySlot = createDaySlot(day, true);
    calendarDaysContainer.appendChild(daySlot);
  }

  const dateRadios = document.querySelectorAll('input[name="day-slot"]');
  dateRadios.forEach(radio => {
    radio.addEventListener('change', handleDateSelection);
  });
}

function handleDateSelection(event) {
  selectedDate = event.target.value;
  toggleSubmitButton();
}


function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar();
}

document.querySelector('.prev-month').addEventListener('click', (event) => {
  event.preventDefault();
  changeMonth(-1);
});

document.querySelector('.next-month').addEventListener('click', (event) => {
  event.preventDefault();
  changeMonth(1);
});


function generateTimeSlots() {
  const morningSlotsContainer = document.getElementById('morning-slots');
  const afternoonSlotsContainer = document.getElementById('afternoon-slots');

  morningSlotsContainer.innerHTML = '';
  afternoonSlotsContainer.innerHTML = '';

  function createSlot(hour, minute) {
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    const time = `${formattedHour}:${formattedMinute}`;

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'time-slot';
    radioInput.value = time;
    radioInput.id = `slot-${formattedHour}${formattedMinute}`;

    const label = document.createElement('label');
    label.setAttribute('for', radioInput.id);
    label.textContent = time;

    const slotDiv = document.createElement('div');
    slotDiv.classList.add('time-slot');
    slotDiv.appendChild(radioInput);
    slotDiv.appendChild(label);

    return slotDiv;
  }

  for (let hour = 8; hour < 12; hour++) {
    morningSlotsContainer.appendChild(createSlot(hour, 0));
    morningSlotsContainer.appendChild(createSlot(hour, 30));
  }

  morningSlotsContainer.appendChild(createSlot(12, 0));

  for (let hour = 12; hour < 19; hour++) {
    afternoonSlotsContainer.appendChild(createSlot(hour, 30));
    if (hour + 1 < 19) {
      afternoonSlotsContainer.appendChild(createSlot(hour + 1, 0));
    }
  }

  const timeRadios = document.querySelectorAll('input[name="time-slot"]');
  timeRadios.forEach(radio => {
    radio.addEventListener('change', handleTimeSelection);
  });
}

window.onload = () => {
  generateCalendar();
  generateTimeSlots();
};


function handleTimeSelection(event) {
  selectedTime = event.target.value;
  toggleSubmitButton();
}


dateTimeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  window.location.href = '../choose-professional/index.html';
});

btnBack.addEventListener('click', () => {
  window.location.href = '../choose-store/index.html';
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

createSteps(5, 3);

