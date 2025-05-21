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
      <article class="projects__light" id="card-${cardData.cardID}">
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
    console.error('Container with id "projects" not found in the DOM');
    return;
  }

  container.innerHTML = "";

  for (const key in cards) {
    const cardData = cards[key];
    if (cardData && cardData.cardID && cardData.img && cardData.title && cardData.subtitle && cardData.content) {
      const cardHTML = createCard(cardData);
      container.insertAdjacentHTML("beforeend", cardHTML);
    } else {
      console.error(`Card data for ${key} is missing required properties.`);
    }
  }
}

document.addEventListener("DOMContentLoaded", renderCards);

const slides = document.querySelector(".projects__content");
const slideCount = slides.children.length; //количество карточек  

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

function goToSlide(index) {
  if (index < 0) {
    index = slideCount - 1;
  } else if (index >= slideCount) {
    index = 0;
  }

  currentIndex = index;
  slides.style.transform = `translateX(${-index * (slides.children[0].offsetWidth + 20)}px)`;
  // 20 — это margin-right, учитывайте отступ между карточками
}

prevButton.addEventListener('click', () => {
  goToSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  goToSlide(currentIndex + 1);
});

goToSlide(0);
