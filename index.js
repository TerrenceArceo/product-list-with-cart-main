const dessertList = document.getElementById("dessert-list")
const cart = document.getElementById("cart")
let dessertData
let totalCount = 0
let chosenItemsList = []


fetch('../data.json')
    .then(res => res.json())
    .then(data => {
        dessertData = data

        document.addEventListener('click', e => {
            e.preventDefault()
            const cartTitle = document.getElementById('cart-title')
        
            if (e.target.dataset.targetbtn === e.target.id) {
                e.target.style.visibility = 'hidden'
                document.querySelector(`div[data-atc="${e.target.parentElement.id}"]`).style.visibility = "visible"
                incrementOrderCount(dessertData, Number(e.target.parentElement.id))
                totalCount++
                cartTitle.textContent = `Your Cart ${totalCount}`
                chosenItem(dessertData, Number(e.target.parentElement.id))
                renderChosenItems(chosenItemsList)
            } else if (e.target.dataset.dec === e.target.id) {
                decrementOrderCount(dessertData, Number(e.target.parentElement.id))
                totalCount--
                cartTitle.textContent = `Your Cart ${totalCount}`
            } else if (e.target.dataset.inc === e.target.id) {
                incrementOrderCount(dessertData, Number(e.target.parentElement.id))
                totalCount++
                cartTitle.textContent = `Your Cart ${totalCount}`
            }
        })

        function decrementOrderCount(listOfDesserts, parentId) {
            let targetObj = listOfDesserts.filter((dessert, index) => {
                if (index === parentId) {
                    return dessert
                }
            })
            targetObj[0].orderCount--
            document.querySelector(`span[data-counter="counter${parentId}"]`).textContent = targetObj[0].orderCount
            if (targetObj[0].orderCount === 0) {
                document.querySelector(`div[data-atc="${parentId}"]`).style.visibility = "hidden"
                document.querySelector(`button[id="atc${parentId}"]`).style.visibility = "visible"
            }
            renderChosenItems(chosenItemsList)
        }
        

        function incrementOrderCount(listOfDesserts, parentId) {
            let targetObj = listOfDesserts.filter((dessert, index) => {
                if (index === parentId) {
                    return dessert
                }
            })
            targetObj[0].orderCount++
            document.querySelector(`span[data-counter="counter${parentId}"]`).textContent = targetObj[0].orderCount
            renderChosenItems(chosenItemsList)
        }

        function chosenItem(listOfDesserts, parentId) {
            let targetObj = listOfDesserts.filter((dessert, index) => {
                if (index === parentId) {
                    return dessert
                }
            })[0]

            chosenItemsList.push(targetObj)
        }

        function renderChosenItems(list) {
            let chosenItemHtml = ''

            list.forEach(item => {
                let totalAmount = item.price * item.orderCount

                chosenItemHtml += `
                    <div class="item-container">
                        <div>
                            <h3 class="item-title">${item.name}</h3>
                            <div class="quantity-container">
                                <p class="quantity">${item.orderCount}x</p>
                                <p class="displayed-price">@ ${item.price.toFixed(2)}</p>
                                <p class="amount">$${totalAmount.toFixed(2)}</p>
                            </div>
                        </div>
                        <button class="delete-btn">&#x00D7;</button>
                    </div>
                `
            })

            document.getElementById('cart-content').innerHTML = chosenItemHtml
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
                    <h2 class="cart-title" id="cart-title">Your Cart ${totalCount}</h2>
                    <div class="cart-content" id="cart-content">
                    </div>
                </div>
            `
            }
            
        cartHtml()
})
