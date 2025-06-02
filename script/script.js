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
  fetch('data.json')
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

  // Отрисовка всех карточек в контейнере
  function renderCards() {
    const container = document.getElementById("projects__content");
    if (!container) {
      console.error('Контейнер для карточек не найден');
      return;
    }

    container.innerHTML = "";

    // Создание карточек с последовательной задержкой анимации
    cardsData.forEach((cardData, index) => {
      const cardHTML = createCard(cardData);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardHTML;
      const cardElement = tempDiv.firstElementChild;

      // Установка задержки для эффекта появления
      cardElement.style.animationDelay = `${index * 0.2}s`;
      container.appendChild(cardElement);
    });

    // Инициализация слайдера после создания карточек
    initializeSlider();
  }

  // ================ СЛАЙДЕР КАРТОЧЕК ================
  function initializeSlider() {
    const slidesContainer = document.querySelector(".projects__content");
    if (!slidesContainer || slidesContainer.children.length === 0) return;

    let currentIndex = 0;
    let cardWidth = 0;
    let isAnimating = false;

    // Расчет размеров карточек для слайдера
    function updateSliderMetrics() {
      const firstCard = slidesContainer.children[0];
      const style = window.getComputedStyle(firstCard);
      cardWidth = firstCard.offsetWidth +
        parseInt(style.marginRight) +
        parseInt(style.marginLeft);
    }

    // Переход к определенному слайду
    function goToSlide(index) {
      if (isAnimating) return;
      isAnimating = true;

      const totalSlides = slidesContainer.children.length;
      // Корректировка индекса для циклического перехода
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      // Анимация перемещения
      slidesContainer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      slidesContainer.style.transform = `translateX(${-index * cardWidth}px)`;
      currentIndex = index;

      // Сброс флага анимации после завершения
      setTimeout(() => {
        isAnimating = false;
        slidesContainer.style.transition = '';
      }, 500);
    }

    // Инициализация и обработка изменения размеров окна
    updateSliderMetrics();
    window.addEventListener('resize', () => {
      updateSliderMetrics();
      goToSlide(currentIndex);
    });

    // Начальная позиция слайдера
    goToSlide(0);
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

  /* Загрузка из data.json: */
  fetch('data.json')
    .then(response => {
      if (!response.ok) throw new Error('Не удалось загрузить данные');
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        cardsData = data;
      }
      renderCards();
    })
    .catch(error => {
      console.error('Ошибка загрузки data.json:', error);
      cardsData = [...localCards];
      renderCards();
    });


  function loadWithXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (Array.isArray(data) && data.length > 0) {
            cardsData = data;
          }
        } catch (e) {
          console.error('Ошибка парсинга JSON:', e);
        }
      }
      renderCards();
    };
    xhr.onerror = function () {
      console.error('Ошибка XHR');
      renderCards();
    };
    xhr.send();
  }

  // ================ ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ================
  renderCards();      // Отрисовка карточек
  setupHoverEffects(); // Настройка эффектов наведения
});