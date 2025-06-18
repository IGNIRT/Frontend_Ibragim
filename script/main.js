'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const localCards = [
    {
      cardID: "1",
      title: "Light Commercial Buildings",
      img: "/image/Rectangle_3.png",
      subtitle: "Strato",
      content: "Light Commercial",
      links1: "Extremely Simple",
      links2: "Compatible with Strato Enterprise",
      links3: "Learn more ->",
    },
    {
      cardID: "2",
      title: "Large Facilities",
      img: "/image/Rectangle_4.png",
      subtitle: "Strato",
      content: "Enterprise",
      links1: "Flexible and Powerful Software",
      links2: "Integrates with Strato Light Commercial",
      links3: "Learn more ->",
    },
    {
      cardID: "3",
      title: "Add-on solution available",
      img: "/image/Ablaka.png",
      subtitle: "Strato",
      content: "Cloud Services",
      links1: "Alerting and Backup",
      links2: "Energy Efficiency Services",
      links3: "Learn more ->",
    }
  ];

  let cardsData = [...localCards]; // Начальные данные

  document.querySelector('.preloader').classList.remove('hidden');

  // Скрыть прелоадер после загрузки
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('hidden');

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // ===================== ЗАГРУЗКА ДАННЫХ =====================
  fetch('data/cards.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные');
      }
      return response.json();
    })
    .then(data => {
      // Проверяем, что данные в правильном формате
      if (Array.isArray(data) && data.length > 0) {
        cardsData = data;
      }
      renderCards();
    })
    .catch(error => {
      console.error('Ошибка загрузки data.json:', error);
      // Используем локальные данные при ошибке
      cardsData = [...localCards];
      renderCards();
    });

  // ================ КАРТОЧКИ ПРОДУКТОВ ================
  function createCard(cardData) {
    return `
      <article class="projects__light animate-card" id="card-${cardData.cardID}">
        <p class="projects__title__light">${cardData.title}</p>
        <img class="projects__image" src="${cardData.img}" alt="${cardData.title}">
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

 // ================ ОБНОВЛЕННАЯ ФУНКЦИЯ ОТРИСОВКИ КАРТОЧЕК ================
  function renderCards() {
    const container = document.getElementById("projects__content");
    if (!container) return;

    // Создаем контейнер-обертку если его нет
    let wrapper = container.parentElement;
    if (!wrapper.classList.contains('projects__container')) {
      wrapper = document.createElement('div');
      wrapper.className = 'projects__container';
      container.parentNode.insertBefore(wrapper, container);
      wrapper.appendChild(container);
    }

    container.innerHTML = "";
    container.classList.add('projects__content');

    // Создаем карточки
    cardsData.forEach((cardData, index) => {
      const cardHTML = createCard(cardData);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardHTML;
      const cardElement = tempDiv.firstElementChild;
      
      // Установка задержки анимации
      cardElement.style.animationDelay = `${index * 0.2}s`;
      container.appendChild(cardElement);
    });

    // Инициализация слайдера
    initializeSlider();
  }

  // ================ ОБНОВЛЕННАЯ ФУНКЦИЯ ОТРИСОВКИ КАРТОЧЕК ================
  function renderCards() {
    const container = document.getElementById("projects__content");
    if (!container) return;

    // Создаем контейнер-обертку если его нет
    let wrapper = container.parentElement;
    if (!wrapper || !wrapper.classList.contains('projects__container')) {
      wrapper = document.createElement('div');
      wrapper.className = 'projects__container';
      container.parentNode.insertBefore(wrapper, container);
      wrapper.appendChild(container);
    }

    container.innerHTML = "";
    container.classList.add('projects__content');

    // Создаем карточки
    cardsData.forEach((cardData, index) => {
      const cardHTML = createCard(cardData);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardHTML;
      const cardElement = tempDiv.firstElementChild;
      
      // Установка задержки анимации
      cardElement.style.animationDelay = `${index * 0.2}s`;
      container.appendChild(cardElement);
    });

    // Инициализация слайдера
    initializeSlider();
  }

  // ================ ОБНОВЛЕННЫЙ СЛАЙДЕР СО СКРЫТЫМИ КАРТОЧКАМИ ================
  function initializeSlider() {
    const container = document.querySelector(".projects__container");
    const slidesContainer = document.querySelector(".projects__content");
    if (!slidesContainer || slidesContainer.children.length === 0) return;

    let currentIndex = 0;
    let cardWidth = 0;
    let containerWidth = 0;
    let isAnimating = false;
    let autoScrollInterval = null;

    // Расчет размеров элементов
    function updateMetrics() {
      const firstCard = slidesContainer.children[0];
      cardWidth = firstCard.offsetWidth;
      containerWidth = container.offsetWidth;
      
      // Установка фиксированной ширины для контейнера
      slidesContainer.style.width = `${cardWidth * slidesContainer.children.length}px`;
    }

    // Переход к слайду
    function goToSlide(index) {
      if (isAnimating) return;
      isAnimating = true;

      const totalSlides = slidesContainer.children.length;
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      // Сначала скрываем текущую активную карточку
      if (slidesContainer.children[currentIndex]) {
        slidesContainer.children[currentIndex].classList.remove('active');
      }

      // Показываем новую активную карточку
      slidesContainer.children[index].classList.add('active');

      // Центрирование активной карточки
      const offset = (containerWidth / 2) - (cardWidth / 2) - (index * cardWidth);
      
      slidesContainer.style.transform = `translateX(${offset}px)`;
      currentIndex = index;

      setTimeout(() => {
        isAnimating = false;
      }, 500);
    }

    // Автоматическая прокрутка
    function startAutoScroll() {
      if (slidesContainer.children.length < 2) return;
      autoScrollInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 3000);
    }

    function stopAutoScroll() {
      clearInterval(autoScrollInterval);
    }

    // Инициализация слайдера
    updateMetrics();
    window.addEventListener('resize', () => {
      updateMetrics();
      goToSlide(currentIndex);
    });

    // Пауза при наведении
    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);

    // Начальная инициализация
    goToSlide(0);
    startAutoScroll();
  }
  
  // ================ ЭФФЕКТЫ ПРИ НАВЕДЕНИИ ================
  function setupHoverEffects() {
    document.addEventListener('mouseover', (e) => {
      const card = e.target.closest('.projects__light');
      if (card) {
        card.style.transition = 'all 0.3s ease';
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
  }

  // ================ ФОРМА ОБРАТНОЙ СВЯЗИ ================
  const form = document.getElementById('contactForm');
  const dataInputs = document.querySelectorAll('input');
  const modal = document.getElementById('formModal');
  const openModalBtns = document.querySelectorAll('.header__login');
  const closeModalBtn = document.querySelector('.exit-button');
  const cancelBtn = document.querySelector('.cansel-button');

  // Обработка перехода между полями формы по Tab
  dataInputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const nextIndex = (index + 1) % dataInputs.length;
        dataInputs[nextIndex].focus();
      }
    });
  });

  // Обработка отправки формы
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formObject = {};

    // Сбор данных формы
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    console.log('Данные формы:', formObject);
    closeModal();
  });

  // Открытие модального окна
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      modal.style.display = 'flex';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Закрытие модального окна
  function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  // Обработчики кнопок закрытия
  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Закрытие по клику вне модального окна
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ================ ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ================
  renderCards();      // Отрисовка карточек
  setupHoverEffects(); // Настройка эффектов наведения
});