'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const cards = {
    card1: {
      cardID: "1",
      title: "Light Commercial Buildings",
      img: "/image/Rectangle_3.png",
      subtitle: "Strato",
      content: "Light Commercial",
      links1: "Extremely Simple",
      links2: "Compatible with Strato Enterprise",
      links3: "Learn more ->",
    },
    card2: {
      cardID: "2",
      title: "Large Facilities",
      img: "/image/Rectangle_4.png",
      subtitle: "Strato",
      content: "Enterprise",
      links1: "Flexible and Powerful Software",
      links2: "Integrates with Strato Light Commercial",
      links3: "Learn more ->",
    },
    card3: {
      cardID: "3",
      title: "Add-on solution available",
      img: "/image/Ablaka.png",
      subtitle: "Strato",
      content: "Cloud Services",
      links1: "Alerting and Backup",
      links2: "Energy Efficiency Services",
      links3: "Learn more ->",
    },
  };

  document.addEventListener('DOMContentLoaded', () => { // Настраиваем обработку события загрузки контента
    setTimeout(() => {
      const preloader = document.querySelector('.preloader'); // Находим наш элемент
      preloader.innerHTML = ''; // Производим действия, возможно другие
    }, 200);
  });
  


  // Create HTML for a single card
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

  // Render all cards to the container
  function renderCards() {
    const container = document.getElementById("projects__content");
    if (!container) {
      console.error('Container not found');
      return;
    }

    container.innerHTML = "";

    // Create cards with staggered animation delay
    Object.keys(cards).forEach((key, index) => {
      const cardData = cards[key];
      const cardHTML = createCard(cardData);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardHTML;
      const cardElement = tempDiv.firstElementChild;

      // Set animation delay for each card
      cardElement.style.animationDelay = `${index * 0.2}s`;
      container.appendChild(cardElement);
    });

    initializeSlider();
  }

  // Initialize card slider functionality
  function initializeSlider() {
    const slidesContainer = document.querySelector(".projects__content");
    let currentIndex = 0;
    let cardWidth = 0;
    let isAnimating = false;

    // Calculate card width including margin
    function updateSliderMetrics() {
      if (slidesContainer.children.length > 0) {
        const firstCard = slidesContainer.children[0];
        const style = window.getComputedStyle(firstCard);
        cardWidth = firstCard.offsetWidth +
          parseInt(style.marginRight) +
          parseInt(style.marginLeft);
      }
    }

    // Navigate to specific slide
    function goToSlide(index) {
      if (isAnimating) return;
      isAnimating = true;

      const totalSlides = slidesContainer.children.length;
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      slidesContainer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      slidesContainer.style.transform = `translateX(${-index * cardWidth}px)`;
      currentIndex = index;

      // Reset animation flag
      setTimeout(() => {
        isAnimating = false;
        slidesContainer.style.transition = '';
      }, 500);
    }

    // Initialize and handle window resize
    updateSliderMetrics();
    window.addEventListener('resize', () => {
      updateSliderMetrics();
      goToSlide(currentIndex);
    });

    // Button click handlers
    // prevButton.addEventListener('click', () => {
    //   goToSlide(currentIndex - 1);
    //   buttonClickAnimation(prevButton);
    // });

    // nextButton.addEventListener('click', () => {
    //   goToSlide(currentIndex + 1);
    //   buttonClickAnimation(nextButton);
    // });

    // Button click animation
    function buttonClickAnimation(button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
    }

    // Initialize first slide
    goToSlide(0);
  }

  // Add hover effects to cards
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

  // Initialize everything
  renderCards();
  setupHoverEffects();
  //Forms 
  const form = document.getElementById('contactForm');
  const dataInputs = document.querySelectorAll('input');
  const modal = document.getElementById('formModal');
  const openModalBtns = document.querySelectorAll('.header__login');
  const closeModalBtn = document.querySelector('.exit-button');
  const cancelBtn = document.querySelector('.cansel-button');
  
  
  dataInputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const nextIndex = (index + 1) % dataInputs.length;
        dataInputs[nextIndex].focus();
      }
    });
  });
  
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const formData = new FormData(form);
    const formObject = {};
  
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
  
    console.log(formObject);
    closeModal();
  });
  
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      modal.style.display = 'flex';
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    });
  });
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }
  
  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  
  
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  
  
});

