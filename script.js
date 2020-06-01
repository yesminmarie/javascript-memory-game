const imagesList = ["img/apple.jpg", "img/banana.jpg", "img/cherry.jpg", "img/grape.jpg", "img/lemon.jpg",
    "img/mango.jpg", "img/olive.jpg", "img/pear.jpg", "img/pineapple.jpg", "img/strawberry.jpg"]

const imagesListDuplicated = [...imagesList, ...imagesList]

//algoritmo de embaralhamento de Fisher-Yates
//embaralha o array de imagens
for (let i = imagesListDuplicated.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = imagesListDuplicated[i]
    imagesListDuplicated[i] = imagesListDuplicated[j]
    imagesListDuplicated[j] = temp
}

//seleciona o elemento com a clase board
const board = document.querySelector('.board')

for (let i = 0; i < imagesListDuplicated.length; i++) {
    //para cada imagem da lista, será criada uma div com a classe 'card-container'
    const cardContainer = document.createElement('div')
    cardContainer.setAttribute('class', 'card-container')

    //para cada imagem da lista, será criada uma div com a classe 'card' 
    //e também um atributo data que possuirá o nome da imagem. Exemplo: data-image = "img/apple.jpg"
    const card = document.createElement('div')
    card.setAttribute('class', 'card')
    card.setAttribute('data-image', imagesListDuplicated[i])

    //adiciona evento de clique ao card e cria a classe 'is-flipped' para o cartão virar
    card.addEventListener('click', function () {
        verifyFlippedCard(card)
    })

    //serão criadas outras duas divs, uma para o 'front' e outra para o 'back'
    const flipCardFront = document.createElement('div')
    flipCardFront.setAttribute('class', 'flip-card-front')

    const flipCardBack = document.createElement('div')
    flipCardBack.setAttribute('class', 'flip-card-back')

    //para cada imagem da lista, será criado também um elemento de imagem
    const img = document.createElement('img')
    img.setAttribute('src', imagesListDuplicated[i])

    //a imagem será inserida na div de classe 'flipCardBack'
    flipCardBack.appendChild(img)

    //as divs 'flip-card-front' e 'flip-card-back' serão inseridas dentro de 'card'
    card.appendChild(flipCardFront)
    card.appendChild(flipCardBack)

    //a div de classe 'card' será inserida dentro de 'card-container'
    cardContainer.appendChild(card)

    //a div de classe 'card-container' será inserida dentro de 'board'
    board.appendChild(cardContainer)
}

let firstCardFlipped
let secondCardFlipped
let hasFlippedCard = false

function verifyFlippedCard(card) {
    if (!hasFlippedCard) {
        card.classList.toggle('is-flipped')
        firstCardFlipped = card
        hasFlippedCard = true
        console.log("firstImage:")
        console.log(firstCardFlipped)
    }
    else {
        card.classList.toggle('is-flipped')
        secondCardFlipped = card
        hasFlippedCard = false
        console.log("secondImage:")
        console.log(secondCardFlipped)
    }
    if (firstCardFlipped.dataset.image === secondCardFlipped.dataset.image) {
        card.classList.add('is-flipped')
    }
}
