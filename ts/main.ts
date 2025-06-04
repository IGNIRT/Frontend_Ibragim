'use strict';

// Импортируем интерфейсы
import { Card, FormData } from './interfaces';

document.addEventListener('DOMContentLoaded', () => {
    const localCards: Card[] = [
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

    let cardsData: Card[] = [...localCards]; // Начальные данные

    const preloader = document.querySelector('.preloader') as HTMLElement;
    if (preloader) {
        preloader.classList.remove('hidden');
    }

    // Скрыть прелоадер после загрузки
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('hidden');

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // ===================== ЗАГРУЗКА ДАННЫХ =====================
    fetch('data.json')
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить данные');
            }
            return response.json();
        })
        .then((data: Card[]) => {
            // Проверяем, что данные в правильном формате
            if (Array.isArray(data) && data.length > 0) {
                cardsData = data;
            }
            renderCards();
        })
        .catch((error: Error) => {
            console.error('Ошибка загрузки data.json:', error);
            // Используем локальные данные при ошибке
            cardsData = [...localCards];
            renderCards();
        });

    // ================ КАРТОЧКИ ПРОДУКТОВ ================
    function createCard(cardData: Card): string {
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
    function renderCards(): void {
        const container = document.getElementById("projects__content") as HTMLElement;
        if (!container) {
            console.error('Контейнер для карточек не найден');
            return;
        }

        container.innerHTML = "";

        // Создание карточек с последовательной задержкой анимации
        cardsData.forEach((cardData: Card, index: number) => {
            const cardHTML = createCard(cardData);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = cardHTML;
            const cardElement = tempDiv.firstElementChild as HTMLElement;

            // Установка задержки для эффекта появления
            cardElement.style.animationDelay = `${index * 0.2}s`;
            container.appendChild(cardElement);
        });

        // Инициализация слайдера после создания карточек
        initializeSlider();
    }

    // ================ СЛАЙДЕР КАРТОЧЕК ================
    function initializeSlider(): void {
        const slidesContainer = document.querySelector(".projects__content") as HTMLElement;
        if (!slidesContainer || slidesContainer.children.length === 0) return;

        let currentIndex: number = 0;
        let cardWidth: number = 0;
        let isAnimating: boolean = false;

        // Расчет размеров карточек для слайдера
        function updateSliderMetrics(): void {
            const firstCard = slidesContainer.children[0] as HTMLElement;
            const style = window.getComputedStyle(firstCard);
            cardWidth = firstCard.offsetWidth +
                parseInt(style.marginRight) +
                parseInt(style.marginLeft);
        }

        // Переход к определенному слайду
        function goToSlide(index: number): void {
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
    function setupHoverEffects(): void {
        document.addEventListener('mouseover', (e: MouseEvent) => {
            const card = (e.target as HTMLElement).closest('.projects__light') as HTMLElement;
            if (card) {
                card.style.transition = 'all 0.3s ease';
                card.style.transform = 'translateY(-5px) scale(1.02)';
                card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
            }
        });

        document.addEventListener('mouseout', (e: MouseEvent) => {
            const card = (e.target as HTMLElement).closest('.projects__light') as HTMLElement;
            if (card) {
                card.style.transform = '';
                card.style.boxShadow = '';
            }
        });
    }

    // ================ ФОРМА ОБРАТНОЙ СВЯЗИ ================
    const form = document.getElementById('contactForm') as HTMLFormElement;
    const dataInputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    const modal = document.getElementById('formModal') as HTMLElement;
    const openModalBtns = document.querySelectorAll('.header__login') as NodeListOf<HTMLElement>;
    const closeModalBtn = document.querySelector('.exit-button') as HTMLElement;
    const cancelBtn = document.querySelector('.cansel-button') as HTMLElement;

    // Обработка перехода между полями формы по Tab
    dataInputs.forEach((input: HTMLInputElement, index: number) => {
        input.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
                event.preventDefault();
                const nextIndex = (index + 1) % dataInputs.length;
                dataInputs[nextIndex].focus();
            }
        });
    });

    // Обработка отправки формы
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const formObject: FormData = {};

        // Сбор данных формы
        formData.forEach((value: FormDataEntryValue, key: string) => {
            formObject[key] = value.toString();
        });

        console.log('Данные формы:', formObject);
        closeModal();
    });

    // Открытие модального окна
    openModalBtns.forEach((btn: HTMLElement) => {
        btn.addEventListener('click', function () {
            modal.style.display = 'flex';
            document.body.classList.add('modal-open');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    function closeModal(): void {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }

    // Обработчики кнопок закрытия
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне модального окна
    modal.addEventListener('click', (e: MouseEvent) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ================ ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ================
    renderCards();      // Отрисовка карточек
    setupHoverEffects(); // Настройка эффектов наведения
});