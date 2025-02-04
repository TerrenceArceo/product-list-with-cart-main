const dessertList = document.getElementById("dessert-list")
const cart = document.getElementById("cart")
const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')
let dessertData
let totalOrderCount = 0
let chosenItemsList = []



document.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.dataset.targetbtn === e.target.id) {
        e.target.style.visibility = 'hidden'
        document.querySelector(`div[data-atc="${e.target.parentElement.id}"]`).style.visibility = "visible"
        document.querySelector(`img[id="main-img-${e.target.parentElement.id}"]`).classList.add('active-border')
        incrementOrderCount(dessertData, Number(e.target.parentElement.id))
        totalOrderCount++
        chosenItem(dessertData, Number(e.target.parentElement.id))
        renderCartContent(chosenItemsList)
    } else if (e.target.dataset.dec === e.target.id) {
        totalOrderCount--
        decrementOrderCount(dessertData, Number(e.target.parentElement.id))
    } else if (e.target.dataset.inc === e.target.id) {
        totalOrderCount++
        incrementOrderCount(dessertData, Number(e.target.parentElement.id))
    } else if (e.target.dataset.delete) {
        deleteItem(chosenItemsList, Number(e.target.id))
    } else if (e.target.dataset.confirm) {
        confirmOrder(chosenItemsList)
    } else if (e.target.dataset.startover) {
        startNewOrder()
        chosenItemsList = []
        renderCartContent(chosenItemsList)
    }
})

function chosenItem(listOfDesserts, parentId) {
    let targetObj = listOfDesserts.filter((dessert, index) => {
        if (index === parentId) {
            return dessert
        }
    })[0]

    chosenItemsList.push(targetObj)
}

function decrementOrderCount(listOfDesserts, parentId) {
    let targetObj = listOfDesserts.filter((dessert, index) => {
        if (index === parentId) {
            return dessert
        }
    })[0]
    targetObj.orderCount--
    document.querySelector(`span[data-counter="counter${parentId}"]`).textContent = targetObj.orderCount
    if (targetObj.orderCount === 0) {
        document.querySelector(`img[id="main-img-${parentId}"]`).classList.remove('active-border')
        document.querySelector(`div[data-atc="${parentId}"]`).style.visibility = "hidden"
        document.querySelector(`button[id="atc${parentId}"]`).style.visibility = "visible"
        chosenItemsList.splice(chosenItemsList.indexOf(targetObj), 1)
    }
    renderCartContent(chosenItemsList)
}


function incrementOrderCount(listOfDesserts, parentId) {
    let targetObj = listOfDesserts.filter((dessert, index) => {
        if (index === parentId) {
            return dessert
        }
    })
    targetObj[0].orderCount++
    document.querySelector(`span[data-counter="counter${parentId}"]`).textContent = targetObj[0].orderCount
    renderCartContent(chosenItemsList)
}

function deleteItem(list, id) {
    let newCount = 0

    const targetObj = list.filter((dessert, index) => {
        if (index === id) {
            return dessert
        }
    })[0]

    targetObj.orderCount = 0
    chosenItemsList.splice(chosenItemsList.indexOf(targetObj), 1)

    chosenItemsList.forEach(item => {
        newCount += item.orderCount
    })

    totalOrderCount = newCount

    renderCartContent(list)

    dessertData.forEach((dessert, index) => {
        if (dessert === targetObj) {
            document.querySelector(`span[data-counter="counter${index}"]`).textContent = targetObj.orderCount
            document.querySelector(`div[data-atc="${index}"]`).style.visibility = "hidden"
            document.querySelector(`button[id="atc${index}"]`).style.visibility = "visible"
        }
    })
}

function confirmOrder(list) {
    let orderConfirmation = ''
    let order = ''
    let total = ''
    let startNewOrderbtn = ''
    let totalPurchasingAmount = 0

    chosenItemsList.forEach(item => {
        totalPurchasingAmount += item.orderCount * item.price
    })

    overlay.style.display = 'block'

    orderConfirmation = `
        <div class="confirmed-order-top">
            <img src="../assets/images/icon-order-confirmed.svg" class="order-confirmation-icon">
            <h2 class="octitle">Order Confirmed</h2>
            <p class="ocsubtitle">We hope you enjoy your food</p>
        </div>
    `

    list.forEach((item, index) => {
        let totalItemPrice = item.price * item.orderCount

        order += `
            <div class="order">
                <img src="${item.image.thumbnail}" class="img-thumbnail">
                <h3 class="order-title">${item.name}</h3>
                <div class="quantity-container">
                    <p class="quantity">${item.orderCount}x</p>
                    <p class="displayed-price">@ ${item.price.toFixed(2)}</p>
                </div>
                <p class="amount">$${totalItemPrice.toFixed(2)}</p>
            </div>
        `
    })

    total = `
        <div class="order-total">
            <p>Order Total</p>
            <h2>$${totalPurchasingAmount.toFixed(2)}</h2>
        </div>
    `

    startNewOrderbtn = `
        <button class="new-order-btn" data-startover="startover">Start New Order</button>
    `

    modal.innerHTML = orderConfirmation + `<div class="order-container">${order} ${total}</div>` + startNewOrderbtn
}

function startNewOrder() {
    overlay.style.display = 'none'
    totalOrderCount = 0

    dessertData.forEach((item, index) => {
        if (item.orderCount > 0) {
            item.orderCount = 0
            document.querySelector(`img[id="main-img-${index}"]`).classList.remove('active-border')
            document.querySelector(`span[data-counter="counter${index}"]`).textContent = item.orderCount
            document.querySelector(`div[data-atc="${index}"]`).style.visibility = "hidden"
            document.querySelector(`button[id="atc${index}"]`).style.visibility = "visible"
        }
    })
}

function renderCartContent(list) {
    let cartOrderQuantity = ''
    let chosenItemHtml = ''
    let confirmOrderArea = ''
    let totalPurchasingAmount = 0

    chosenItemsList.forEach(item => {
        totalPurchasingAmount += item.orderCount * item.price
    })

    if (list.length === 0) {
        cartOrderQuantity = `<h2 class="cart-title" id="cart-title">Your Cart ${totalOrderCount}</h2>`

        chosenItemHtml = `
            <img src="../assets/images/illustration-empty-cart.svg" class="empty-cart-icon">
            <p class="empty-cart-message">Your added items will appear here</p>
        `

        confirmOrderArea = ''
    } else {
        cartOrderQuantity = `<h2 class="cart-title" id="cart-title">Your Cart ${totalOrderCount}</h2>`

        list.forEach((item, index) => {
            let totalItemPrice = item.price * item.orderCount

            chosenItemHtml += `
                <div class="item-container">
                    <div>
                        <h3 class="item-title">${item.name}</h3>
                        <div class="quantity-container">
                            <p class="quantity">${item.orderCount}x</p>
                            <p class="displayed-price">@ ${item.price.toFixed(2)}</p>
                            <p class="amount">$${totalItemPrice.toFixed(2)}</p>
                        </div>
                    </div>
                    <button data-delete="${index}" id="${index}" class="delete-btn">&#x00D7;</button>
                </div>
            `
        })

        confirmOrderArea = `
            <div class="order-total">
                <p>Order Total</p>
                <h2>$${totalPurchasingAmount.toFixed(2)}</h2>
            </div>
            <div class="carbon-neutral">
                <img src="../assets/images/icon-carbon-neutral.svg" class="carbon-neutral-icon">
                <p>This is a <span>carbon-neutral</span> delivery </p>
            </div>
            <button class="confirm-btn" data-confirm="confirm">Confirm Order</button>
        `
    }

    document.getElementById('cart-content').innerHTML = cartOrderQuantity +  chosenItemHtml + confirmOrderArea
}

fetch('../data.json')
    .then(res => res.json())
    .then(data => {
        dessertData = data        
        
        let htmlContent = ''

        dessertData.forEach((dessert, index) => {
            let dessertPrice = dessert.price
            dessert["orderCount"] = 0

            htmlContent += `
            <div class="dessert-item" id="${index}">
                <picture>
                    <source media="(min-width: 900px)" srcset="${dessert.image.desktop}" >
                    <source media="(min-width: 712px)" srcset="${dessert.image.tablet}" >
                    <img src="${dessert.image.mobile}" alt="a picture of ${dessert.name}" class="main-img" id="main-img-${index}">
                </picture>
                <button class="btn add-btn" data-targetbtn="atc${index}" id="atc${index}">             
                    <img src="../assets/images/icon-add-to-cart.svg" class="add-to-cart-icon" >
                    Add to Cart
                </button>
                <div class="add-btn-container hidden" data-atc="${index}" id="${index}" >
                    <button class="dec-btn" data-dec="dec${index}" id="dec${index}">
                        &#x2212;
                    </button>
                        <span class="count-container" data-counter="counter${index}">${dessert.orderCount}</span>
                    <button class="inc-btn" data-inc="inc${index}" id="inc${index}" >
                        &#43;
                    </button>
                </div>
                <p class="category">${dessert.category}</p>
                <h2 class="name">${dessert.name}</h2>
                <p class="price">$${dessertPrice.toFixed(2)}</p>
            </div>
            `
        })

        dessertList.innerHTML = htmlContent

        const cartHtml = () => {
            cart.innerHTML = `
                <div class="cart-container">
                    <div class="cart-content" id="cart-content">
                        <h2 class="cart-title" id="cart-title">Your Cart ${totalOrderCount}</h2>
                        <img src="../assets/images/illustration-empty-cart.svg" class="empty-cart-icon">
                        <p class="empty-cart-message">Your added items will appear here</p>
                    </div>
                </div>
            `
            }
            
        cartHtml()
})
