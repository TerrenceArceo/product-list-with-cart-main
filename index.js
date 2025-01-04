const dessertList = document.getElementById("dessert-list")
const cart = document.getElementById("cart")
let dessertData =

document.addEventListener('click', e => {
    e.preventDefault()

    if (e.target.dataset.targetbtn === e.target.parentElement.id) {
        e.target.style.visibility = 'hidden'
        document.querySelector(`button[data-atc="${e.target.parentElement.id}"]`).style.visibility = 'visible'
    }
})

fetch('../data.json')
    .then(res => res.json())
    .then(data => {
        dessertData = data
        let htmlContent = ''

        dessertData.forEach((dessert, index) => {
            let dessertPrice = dessert.price
            dessert["uid"] = index

            htmlContent += `
            <div class="dessert-item" id="${index}">
                <picture>
                    <source media="(min-width: 900px)" srcset="${dessert.image.desktop}">
                    <source media="(min-width: 712px)" srcset="${dessert.image.tablet}">
                    <img src="${dessert.image.mobile}" alt="IfItDoesntMatchAnyMedia" class="main-img">
                </picture>
                <button class="btn add-btn atc" data-targetbtn="${index}">             
                    <img src="../assets/images/icon-add-to-cart.svg" class="add-to-cart-icon" >
                    Add to Cart
                </button>
                <button class="btn add-btn hidden inc-dec-btn" data-atc="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="dec" width="10" height="2" fill="currentcolor" viewBox="0 0 10 2"><path fill="currentcolor" d="M0 .375h10v1.25H0V.375Z"/></svg>
                    <span id="order-count">0</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="inc" width="10" height="10" fill="currentcolor" viewBox="0 0 10 10"><path fill="currentcolor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                </button>
                <p class="category">${dessert.category}</p>
                <h2 class="name">${dessert.name}</h2>
                <p class="price">$${dessertPrice.toFixed(2)}</p>
            </div>
            `
        })

        dessertList.innerHTML = htmlContent

    })

const cartHtmlContent = () => {
cart.innerHTML = `
    <div class="cart-container">
        <h2 class="cart-title">Your Cart (0)</h2>
        <div class="cart-content">
            <img class="empty-cart-cake" src="../assets/images/illustration-empty-cart.svg" alt="a picture of cake illustrating that a cart is empty">
            <p class="empty-cart-message">Your added items will appear here</p>
        </div>
    </div>
`
}

cartHtmlContent()
