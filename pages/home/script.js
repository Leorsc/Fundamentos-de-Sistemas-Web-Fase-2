const carouselCombinations = {
  combination01: [5, 1, 2],
  combination02: [1, 2, 3],
  combination03: [2, 3, 4],
  combination04: [3, 4, 5],
  combination05: [4, 5, 1],
};

const modalHeader = document.querySelector('.modal-header-type-03');
const iconOpenModalHeader = document.getElementById('icon-open-modal-header');
const iconCloseModalHeader = document.getElementById('icon-close-modal-header');

let currentCombinationIndex = 1;
const totalCombinations = Object.keys(carouselCombinations).length;
const carousel = document.querySelector('.carousel');
let autoSlideInterval;
let currentIndex = 0;

function createCarouselItem(itemNumber) {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('carousel-item');
  itemDiv.id = `item-0${itemNumber}`;

  const img = document.createElement('img');
  img.src = `../../assets/images/carousel/banner-0${itemNumber}.png`;
  img.alt = `Banner ${itemNumber}`;

  itemDiv.appendChild(img);
  return itemDiv;
}

function updateCarousel() {
  const combinationKey = `combination0${currentCombinationIndex}`;
  const [prevItem, centralItem, nextItem] = carouselCombinations[combinationKey];

  carousel.innerHTML = '';

  // Criar os botões "prev" e "next"
  const buttonPrev = document.createElement('button');
  const itemButtonPrev = document.createElement('img');
  itemButtonPrev.src = '../../assets/icons/arrow-left.svg'; // Ícone de seta à esquerda
  itemButtonPrev.alt = 'Previous';
  buttonPrev.appendChild(itemButtonPrev);
  buttonPrev.classList.add('carousel-button', 'prev');

  const buttonNext = document.createElement('button');
  const itemButtonNext = document.createElement('img');
  itemButtonNext.src = '../../assets/icons/arrow-right.svg'; // Ícone de seta à direita
  itemButtonNext.alt = 'Next';
  buttonNext.appendChild(itemButtonNext);
  buttonNext.classList.add('carousel-button', 'next');

  // Criar e exibir os itens do carrossel
  const prevItemDiv = createCarouselItem(prevItem);
  prevItemDiv.classList.add('carousel-item-blur');
  carousel.appendChild(prevItemDiv);

  const centralItemDiv = createCarouselItem(centralItem);
  centralItemDiv.classList.add('carousel-item-central');
  centralItemDiv.appendChild(buttonPrev); // Adicionar os botões no item central
  centralItemDiv.appendChild(buttonNext);
  carousel.appendChild(centralItemDiv);

  const nextItemDiv = createCarouselItem(nextItem);
  nextItemDiv.classList.add('carousel-item-blur');
  carousel.appendChild(nextItemDiv);

  // ** Corrigir o cálculo de offset **
  const bannerWidth = 1300;
  const bannerSpacing = -280;
  const containerWidth = 1920;

  const offset = -(bannerWidth + bannerSpacing);
  carousel.style.transform = `translateX(${offset}px)`;

  // ** Adicionar os eventos de clique para os botões dinâmicos **
  buttonNext.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  buttonPrev.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });
}

function nextSlide() {
  currentCombinationIndex = (currentCombinationIndex % totalCombinations) + 1;
  updateCarousel();
}

function prevSlide() {
  currentCombinationIndex = (currentCombinationIndex - 1 + totalCombinations) % totalCombinations;
  if (currentCombinationIndex === 0) currentCombinationIndex = totalCombinations;
  updateCarousel();
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 5000);
}

updateCarousel();
autoSlideInterval = setInterval(nextSlide, 5000);

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


