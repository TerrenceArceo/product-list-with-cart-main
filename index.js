const dessertList = document.getElementById("dessert-list")
const cart = document.getElementById("cart")
let dessertData =


fetch('../data.json')
    .then(res => res.json())
    .then(data => {
        dessertData = data

        document.addEventListener('click', e => {
            e.preventDefault()
        
            if (e.target.dataset.targetbtn === e.target.id) {
                e.target.style.visibility = 'hidden'
                document.querySelector(`div[data-atc="${e.target.parentElement.id}"]`).style.visibility = "visible"
                incrementOrderCount(dessertData, Number(e.target.parentElement.id))
            } else if (e.target.dataset.dec === e.target.id) {
                decrementOrderCount(dessertData, Number(e.target.parentElement.classList[1]))
            } else if (e.target.dataset.inc === e.target.id) {
                incrementOrderCount(dessertData, Number(e.target.parentElement.classList[1]))
            }
        })

        function decrementOrderCount(listOfDesserts, parentClass) {
            let targetObj = listOfDesserts.filter((dessert, index) => {
                if (index === parentClass) {
                    return dessert
                }
            })
            targetObj[0].orderCount--
            document.querySelector(`span[data-counter="counter${parentClass}"]`).textContent = targetObj[0].orderCount
            if (targetObj[0].orderCount === 0) {
                document.querySelector(`div[data-atc="${parentClass}"]`).style.visibility = "hidden"
                document.querySelector(`button[id="atc${parentClass}"]`).style.visibility = "visible"
            }
        }
        

        function incrementOrderCount(listOfDesserts, parentClass) {
            let targetObj = listOfDesserts.filter((dessert, index) => {
                if (index === parentClass) {
                    return dessert
                }
            })
            targetObj[0].orderCount++
            document.querySelector(`span[data-counter="counter${parentClass}"]`).textContent = targetObj[0].orderCount
        }
        
        let htmlContent = ''

        dessertData.forEach((dessert, index) => {
            let dessertPrice = dessert.price
            dessert["orderCount"] = 0

            htmlContent += `
            <div class="dessert-item" id="${index}">
                <picture>
                    <source media="(min-width: 900px)" srcset="${dessert.image.desktop}">
                    <source media="(min-width: 712px)" srcset="${dessert.image.tablet}">
                    <img src="${dessert.image.mobile}" alt="IfItDoesntMatchAnyMedia" class="main-img">
                </picture>
                <button class="btn add-btn" data-targetbtn="atc${index}" id="atc${index}">             
                    <img src="../assets/images/icon-add-to-cart.svg" class="add-to-cart-icon" >
                    Add to Cart
                </button>
                <div class="add-btn-container hidden" data-atc="${index}" >
                    <button class="dec-btn ${index}" >
                        <svg xmlns="http://www.w3.org/2000/svg" data-dec="dec${index}" id="dec${index}" class="dec" width="10" height="2" fill="currentcolor" viewBox="0 0 10 2"><path fill="currentcolor" d="M0 .375h10v1.25H0V.375Z"/></svg>
                    </button>
                        <span class="count-container" data-counter="counter${index}">${dessert.orderCount}</span>
                    <button class="inc-btn ${index}" >
                        <svg xmlns="http://www.w3.org/2000/svg" data-inc="inc${index}" id="inc${index}" class="inc" width="10" height="10" fill="currentcolor" viewBox="0 0 10 10"><path fill="currentcolor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                    </button>
                </div>
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
