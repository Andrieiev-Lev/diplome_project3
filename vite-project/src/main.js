import axios from 'axios';
const modalCLose = document.querySelector('.modal__close')
const overlay = document.querySelector('.overlay')

modalCLose.addEventListener('click', function () {
    overlay.style.display = 'none'
})
overlay.addEventListener('click', function (event) {
    overlay.style.display = 'none'
})
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        overlay.style.display = 'none'
    }

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
            const card = document.querySelectorAll('.cards-card')
            card.forEach(element => {
                element.addEventListener('click', function () {
                    overlay.style.display = 'flex'
                })
            });
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
        const card = document.querySelectorAll('.cards-card')
        console.log(card)
        card.forEach(element => {
            element.addEventListener('click', function () {
                overlay.style.display = 'flex'
            })
        });

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
        return `<li class="cards-card">
            <img src="${imageUrl}" alt="${concert.name}" class="cards-card-img">
            <h3 class="cards-card-title">${concert.name}</h3>
            <h3 class="cards-card-time">${concert.dates.start.localDate}</h3>
            <p class="cards-card-place">${concert._embedded.venues[0].name}</p>
        </li>`;
    })
        .join("");
    postList.innerHTML = markup;
}
function renderInfo(posts) {
    const markup = posts.map((concert, index) => {
        const imageUrl = concert.images && concert.images.length > 0 ? concert.images[0].url : 'https://via.placeholder.com/300'
        return `<li class="cards-card">
            <img src="${imageUrl}" alt="${concert.name}" class="cards-card-img">
            <h3 class="cards-card-title">${concert.name}</h3>
            <h3 class="cards-card-time">${concert.dates.start.localDate}</h3>
            <p class="cards-card-place">${concert._embedded.venues[0].name}</p>
        </li>`;
    })
        .join("");
    postList.innerHTML = markup;
}