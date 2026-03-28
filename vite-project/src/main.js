const modalCLose = document.querySelector('.modal__close')
const card = document.querySelector('.cards-card')
const overlay = document.querySelector('.overlay')

card.addEventListener('click', function() {
    overlay.style.display = 'flex'
})

modalCLose.addEventListener('click', function() {
    overlay.style.display = 'none'
})