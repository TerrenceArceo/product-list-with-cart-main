const main = document.getElementById("main")
let dessertData =

fetch('../data.json')
    .then(res => res.json())
    .then(data => {
        dessertData = data
        let htmlContent = ''
        
        for (dessert of dessertData) {
            htmlContent += `
                <img src="${dessert.image.mobile}">
                <p>${dessert.category}</p>
                <h2>${dessert.name}</h2>
                <p>${dessert.price}</p>
            `
        }

        main.innerHTML = htmlContent

    })