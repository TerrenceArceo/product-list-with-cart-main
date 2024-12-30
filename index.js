const dessertList = document.getElementById("dessert-list")
const cart = document.getElementById("cart")
let dessertData =

fetch('../data.json')
    .then(res => res.json())
    .then(data => {
        dessertData = data
        let htmlContent = ''

        dessertData.forEach((dessert, index) => {
            let dessertPrice = dessert.price
            htmlContent += `
            <div class="dessert-item">
                <picture>
                    <source media="(min-width: 900px)" srcset="${dessert.image.desktop}">
                    <source media="(min-width: 712px)" srcset="${dessert.image.tablet}">
                    <img src="${dessert.image.mobile}" alt="IfItDoesntMatchAnyMedia" class="main-img">
                </picture>
                <button class="btn add-btn" id="${index}">
                    <img src="../assets/images/icon-add-to-cart.svg" class="add-to-cart-icon">
                    Add to Cart
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