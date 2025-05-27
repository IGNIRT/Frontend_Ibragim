const cards = {
  card1: {
    cardID: "1",
    img: "/image/Rectangle_3.png",
    title: "Light Commercial Buildings",
    subtitle: "Strato",
    content: "Light Commercial",
    links1: "Extremely Simple",
    links2: "Compatible with Strato Enterprise",
    links3: "Learn more ->",
  },
  card2: {
    cardID: "2",
    img: "/image/Rectangle_4.png",
    title: "Large Facilities",
    subtitle: "Strato",
    content: "Enterprise",
    links1: "Flexible and Powerful Software",
    links2: "Integrates with Strato Light Commercial",
    links3: "Learn more ->",
  },
  card3: {
    cardID: "3",
    img: "/image/Ablaka.png",
    title: "Add-on solution available",
    subtitle: "Strato",
    content: "Cloud Services",
    links1: "Alerting and Backup",
    links2: "Energy Efficiency Services",
    links3: "Learn more ->",
  },
};

function createCard(cardData) {
  return `
    <article class="projects__light animate-card" id="card-${cardData.cardID}">
      <img class="projects__image" src="${cardData.img}" alt="${cardData.title}">
      <p class="projects__title__light">${cardData.title}</p>
      <p class="projects__subtitle__light">${cardData.subtitle}</p>
      <p class="projects__slogan__light">${cardData.content}</p>
      <div class="list__link">
        <a href="#" class="projects__item-link--active__light">
          <p>${cardData.links1}</p>
        </a>
        <div class="create-line"></div>
        <a href="#" class="projects__item-link_2--active__light">
          <p>${cardData.links2}</p>
        </a>
        <nav class="projects__nav">
          <a class="projects__item-link" href="#">${cardData.links3}</a>
        </nav>
      </div>
    </article>
  `;
}

function renderCards() {
  const container = document.getElementById("projects__content");
  if (!container) {
    console.error('Container not found');
    return;
  }

  container.innerHTML = "";

  // Добавляем карточки с задержкой для анимации
  Object.keys(cards).forEach((key, index) => {
    const cardData = cards[key];
    if (cardData) {
      const cardHTML = createCard(cardData);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardHTML;
      const cardElement = tempDiv.firstElementChild;

      // Задержка для последовательного появления
      cardElement.style.animationDelay = `${index * 0.2}s`;

      container.appendChild(cardElement);
    }
  });

  initializeSlider();
}

function initializeSlider() {
  const slidesContainer = document.querySelector(".projects__content");
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  let currentIndex = 0;
  let cardWidth = 0;
  let isAnimating = false;

  function updateSliderMetrics() {
    if (slidesContainer.children.length > 0) {
      cardWidth = slidesContainer.children[0].offsetWidth + 20; // width + margin
    }
  }

  function goToSlide(index) {
    if (isAnimating) return;

    isAnimating = true;
    const totalSlides = slidesContainer.children.length;

    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    slidesContainer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    slidesContainer.style.transform = `translateX(${-index * cardWidth}px)`;

    currentIndex = index;

    // Сброс анимации
    setTimeout(() => {
      isAnimating = false;
      slidesContainer.style.transition = '';
    }, 500);
  }

  // Инициализация размеров
  updateSliderMetrics();
  window.addEventListener('resize', () => {
    updateSliderMetrics();
    goToSlide(currentIndex);
  });

  // Навигация
  prevButton.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    addButtonClickAnimation(prevButton);
  });

  nextButton.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    addButtonClickAnimation(nextButton);
  });

  // Анимация клика на кнопки
  function addButtonClickAnimation(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 200);
  }

  // Инициализация начальной позиции
  goToSlide(0);
}

// Запуск при полной загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  renderCards();

  // Добавляем обработчик для hover-эффектов
  document.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.projects__light');
    if (card) {
      card.style.transform = 'translateY(-5px) scale(1.02)';
      card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.projects__light');
    if (card) {
      card.style.transform = '';
      card.style.boxShadow = '';
    }
  });
});