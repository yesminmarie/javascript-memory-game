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

    //adiciona evento de clique ao card e chama a função verifyFlippedCard
    card.addEventListener('click', verifyFlippedCard)

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

let firstCardFlipped = null //armazena o primeiro cartão virado
let secondCardFlipped = null //armazena o segundo cartão virado
let hasFlippedFirstCard = false //será true se o primeiro cartão foi clicado
let hasFlippedSecondCard = false //será true se o segundo cartão foi clicado
let contMoves = 0
const moves = document.querySelector('.moves')

function verifyFlippedCard() {
    //se o primeiro cartão foi clicado
    if (!hasFlippedFirstCard) {
        //adiciona a classe 'is-flipped' para fazer o cartão virar
        this.classList.add('is-flipped')
        //armazena o cartão clicado em firstCardFlipped
        firstCardFlipped = this
        //o primeiro cartão foi virado (true)
        hasFlippedFirstCard = true
        contMoves += 1
        //moves.disabled = true
        moves.innerHTML = contMoves
    }
    //se o segundo cartão foi clicado
    else if (!hasFlippedSecondCard) {
        //se o jogador clicar no mesmo cartão clicado anteriormente, retorna sem fazer nada
        if (this === firstCardFlipped) return
        //senão, adiciona a classe is-flipped' para fazer o cartão virar
        this.classList.add('is-flipped')
        //armazena o cartão clicado em secondCardFlipped
        secondCardFlipped = this
        //o segundo cartão foi virado (true)
        hasFlippedSecondCard = true
        //deixa os dois cartões abertos durante 2 segundos e chama a função que verifica se os dois são iguais
        setTimeout(() => { verifyIfMatched(firstCardFlipped, secondCardFlipped) }, 1500)

    }

}

function verifyIfMatched(card1, card2) {
    //se o primeiro cartão virado é igual ao segundo
    if (card1.dataset.image === card2.dataset.image) {
        //remove o evento de click nos dois cartões
        card1.removeEventListener('click', verifyFlippedCard)
        card2.removeEventListener('click', verifyFlippedCard)
        //retorna o valor false para as duas variáveis para que o jogador possa continuar o jogo 
        hasFlippedFirstCard = false
        hasFlippedSecondCard = false
    }
    //senão
    else {
        //remove a classe 'is-flipped' dos dois cartões para que eles sejam desvirados
        card1.classList.remove('is-flipped')
        card2.classList.remove('is-flipped')
        //retorna o valor false para as duas variáveis para que o jogador possa continuar o jogo 
        hasFlippedFirstCard = false
        hasFlippedSecondCard = false
    }
}