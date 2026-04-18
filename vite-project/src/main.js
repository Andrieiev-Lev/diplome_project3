import axios from 'axios';
const modalCLose = document.querySelector('.modal__close')
const card = document.querySelector('.cards-card')
const overlay = document.querySelector('.overlay')
card.addEventListener('click', function () {
    overlay.style.display = 'flex'
})

modalCLose.addEventListener('click', function () {
    overlay.style.display = 'none'
})
const postList = document.querySelector(".cards");
const search = document.querySelector('.search-inputs-concert')
let currentPage = 1
search.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    try {
      currentPage = 1;
      postList.innerHTML = "";
      const inputData = search.value
      const images = await fetchNewPosts(inputData);
      renderPosts(images);
      currentPage += 1;
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    }
  }
});
async function paintMarkup() {
    try {
        const posts = await fetchPosts();
        console.log(posts)
        renderPosts(posts);
    } catch (error) {
        console.log(error);
    }
};
async function fetchPosts() {
    const response = await axios.get(
        "https://app.ticketmaster.com/discovery/v2/events.json?apikey=ysiWd5ANkbC1Fzhe8MQMKaIFaNSYPtiG&size=20&page=1"
    );

    return response.data._embedded.events;
}
async function fetchNewPosts(value) {
    const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=ysiWd5ANkbC1Fzhe8MQMKaIFaNSYPtiG&size=20&page=1&classificationName=${value}`
    );
    console.log(response)
    return response.data._embedded.events;
}
paintMarkup()
function renderPosts(posts) {
    const markup = posts.map((concert, index) => {
        const imageUrl = concert.images && concert.images.length > 0 ? concert.images[0].url : 'https://via.placeholder.com/300'
        return `<li>
            <img src="${imageUrl}" alt="${concert.name}" class="cards-card-img">
            <h3 class="cards-card-title">${concert.name}</h3>
            <h3 class="cards-card-time">${concert.dates.start.localDate}</h3>
            <p class="cards-card-place">${concert._embedded.venues[0].name}</p>
        </li>`;
    })
    .join("");
    postList.innerHTML = markup;
}