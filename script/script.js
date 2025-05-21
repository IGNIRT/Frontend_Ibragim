const cards = {
  card1: {
    cardID: "1",
    img: "/image/Rectangle_3.png",
    title: "Light Commercial Buildingsовороте",
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
      <article class="projects__light">
                        <img class="projects__image" src="${cardData.img}" alt="">
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

/* function resultOnLoad() {
  document.getElementById("projects").insertAdjacentHTML() = createCard(cardData); 
} */

for (const card in cards) {
  console.log(cards[card]);
  createCard(card);
}
