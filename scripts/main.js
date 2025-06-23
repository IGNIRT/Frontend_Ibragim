'use strict';
const localCardsData = [
    {
        cardID: "1",
        title: "Light Commercial Buildings",
        img: "image/Rectangle_3.png",
        subtitle: "Strato",
        content: "Light Commercial",
        links1: "Extremely Simple",
        links2: "Compatible with Strato Enterprise",
        links3: "Learn more ->",
    },
    {
        cardID: "2",
        title: "Large Facilities",
        img: "image/Rectangle_4.png",
        subtitle: "Strato",
        content: "Enterprise",
        links1: "Flexible and Powerful Software",
        links2: "Integrates with Strato Light Commercial",
        links3: "Learn more ->",
    },
    {
        cardID: "3",
        title: "Add-on solution available",
        img: "image/Ablaka.png",
        subtitle: "Strato",
        content: "Cloud Services",
        links1: "Alerting and Backup",
        links2: "Energy Efficiency Services",
        links3: "Learn more ->",
    }
];
class App {
    constructor() {
        this.cardsData = [];
        this.autoScrollInterval = null;
        this.currentSlideIndex = 0;
        this.isAnimating = false;
        this.preloader = document.querySelector('.preloader');
        this.cardsContainer = document.getElementById("projects__content");
        this.formModal = document.getElementById('formModal');
        this.setupPreloader();
        this.loadCardData();
        this.setupEventListeners();
    }
    setupPreloader() {
        if (!this.preloader)
            return;
        this.preloader.classList.remove('hidden');
        window.addEventListener('load', () => {
            this.preloader.classList.add('hidden');
            setTimeout(() => {
                this.preloader.style.display = 'none';
            }, 500);
        });
    }
    loadCardData() {
        fetch('data.json')
            .then(response => {
            if (!response.ok)
                throw new Error('Не удалось загрузить данные');
            return response.json();
        })
            .then((data) => {
            this.cardsData = Array.isArray(data) && data.length > 0
                ? data
                : localCardsData;
            this.renderCards();
        })
            .catch(error => {
            console.error('Ошибка загрузки:', error);
            this.cardsData = localCardsData;
            this.renderCards();
        });
    }
    createCardHTML(cardData) {
        return `
            <article class="projects__light animate-card" data-card-id="${cardData.cardID}">
                <p class="projects__title__light">${cardData.title}</p>
                <img class="projects__image" src="${cardData.img}" alt="${cardData.title}" loading="lazy">
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
    renderCards() {
        var _a, _b;
        if (!this.cardsContainer)
            return;
        if (!((_a = this.cardsContainer.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains('projects__container'))) {
            const wrapper = document.createElement('div');
            wrapper.className = 'projects__container';
            (_b = this.cardsContainer.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(wrapper, this.cardsContainer);
            wrapper.appendChild(this.cardsContainer);
        }
        this.cardsContainer.innerHTML = '';
        this.cardsContainer.classList.add('projects__content');
        this.cardsData.forEach((card, index) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(this.createCardHTML(card), 'text/html');
            const cardElement = doc.body.firstElementChild;
            if (cardElement) {
                cardElement.style.animationDelay = `${index * 0.2}s`;
                this.cardsContainer.appendChild(cardElement);
            }
        });
        this.initializeSlider();
        this.setupHoverEffects();
    }
    initializeSlider() {
        const slidesContainer = this.cardsContainer;
        if (!slidesContainer || slidesContainer.children.length === 0)
            return;
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
        const calculatePosition = (index) => {
            const container = slidesContainer.parentElement;
            if (!container)
                return 0;
            const slide = slidesContainer.children[index];
            if (!slide)
                return 0;
            const containerWidth = container.clientWidth;
            const slideWidth = slide.offsetWidth;
            return (containerWidth - slideWidth) / 2 - slide.offsetLeft;
        };
        const goToSlide = (index) => {
            if (this.isAnimating)
                return;
            this.isAnimating = true;
            const totalSlides = slidesContainer.children.length;
            if (index < 0)
                index = totalSlides - 1;
            if (index >= totalSlides)
                index = 0;
            Array.from(slidesContainer.children).forEach(card => {
                card.classList.remove('active');
            });
            const activeSlide = slidesContainer.children[index];
            if (activeSlide) {
                activeSlide.classList.add('active');
            }
            slidesContainer.style.transition = 'transform 0.5s ease-in-out';
            slidesContainer.style.transform = `translateX(${calculatePosition(index)}px)`;
            this.currentSlideIndex = index;
            setTimeout(() => {
                this.isAnimating = false;
                slidesContainer.style.transition = '';
            }, 500);
        };
        const startAutoScroll = () => {
            if (slidesContainer.children.length > 1) {
                this.autoScrollInterval = window.setInterval(() => {
                    goToSlide(this.currentSlideIndex + 1);
                }, 3000);
            }
        };
        const container = slidesContainer.parentElement;
        if (container) {
            container.addEventListener('mouseenter', () => {
                if (this.autoScrollInterval) {
                    clearInterval(this.autoScrollInterval);
                    this.autoScrollInterval = null;
                }
            });
            container.addEventListener('mouseleave', startAutoScroll);
        }
        window.addEventListener('resize', () => {
            slidesContainer.style.transition = 'none';
            goToSlide(this.currentSlideIndex);
            setTimeout(() => {
                slidesContainer.style.transition = '';
            }, 50);
        });
        goToSlide(0);
        startAutoScroll();
    }
    setupHoverEffects() {
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.projects__light');
            if (card) {
                card.classList.add('card-hover');
            }
        });
        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.projects__light');
            if (card) {
                card.classList.remove('card-hover');
            }
        });
    }
    setupForm() {
        const form = document.getElementById('contactForm');
        if (!form)
            return;
        const inputs = form.querySelectorAll('input');
        const openButtons = document.querySelectorAll('.header__login');
        const closeButton = document.querySelector('.exit-button');
        const cancelButton = document.querySelector('.cancel-button');
        inputs.forEach((input, index) => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % inputs.length;
                    inputs[nextIndex].focus();
                }
            });
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value.toString();
            });
            console.log('Данные формы:', formObject);
            this.closeModal();
        });
        openButtons.forEach(btn => {
            btn.addEventListener('click', () => this.openModal());
        });
        if (closeButton)
            closeButton.addEventListener('click', () => this.closeModal());
        if (cancelButton)
            cancelButton.addEventListener('click', () => this.closeModal());
        this.formModal.addEventListener('click', (e) => {
            if (e.target === this.formModal) {
                this.closeModal();
            }
        });
    }
    openModal() {
        this.formModal.style.display = 'flex';
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }
    closeModal() {
        this.formModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }
    setupEventListeners() {
        this.setupForm();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
//# sourceMappingURL=main.js.map