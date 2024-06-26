

const arrayProducts = afficherCart ()

/**création funct afficher cart qui crawl le local storage*/

function afficherCart () {
    /** création tableau produits */

    const tableauProduits = []

    for (var i = 0; i < localStorage.length; i++){
        key=localStorage.key(i)

/**spit de la key pour récupérer l'ID & la Color*/
        const myArray = key.split("-")
        let id= myArray[0]
        let color= myArray [1]
        let quantity= localStorage.getItem(key)
        const tableauProduit = []
        tableauProduit["id"]= id
        tableauProduit["color"]= color
        tableauProduit["quantity"]= quantity
        tableauProduits [i] = tableauProduit
        console.log (tableauProduit)
        
        afficherArticle (id,color,quantity)
    
    }

    console.log (tableauProduits)

/** affichage du prix total */
    afficherPrixTotal () 


/** récupération de la valeur tableauProduits*/
    return (tableauProduits)
}

async   function afficherArticle (id,color,quantity) {

    const produit= await lireProduit(id)

/**création de baliste article */    
    const article = document.createElement("article");
    article.classList.add("cart__item")
    article.setAttribute ("data-id",id)
    article.setAttribute ("data-color",color)

    const section = document.getElementById ("cart__items")
    section.appendChild (article)

/**création du div pour img */  
    const divImg = document.createElement("div")
    divImg.classList.add("cart__item__img")
    divImg.innerHTML = `<img src="` + produit.imageUrl +`" alt="` + produit.altTxt+ `">`

    article.appendChild(divImg)

/**création du div content */
    const divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")
    article.appendChild(divContent)

/**création du div description (name + color + prix) */
    const divDescription = document.createElement("div")
    divDescription.classList.add("cart__item__content__description")
    divDescription.innerHTML = `<h2>` + produit.name + `</h2>` + `<p>` + color + `</p>` + `<p>` + produit.price + ` €</p>`
    divContent.appendChild(divDescription)

/**création du div settings */
    const divSettings = document.createElement("div")
    divSettings.classList.add("cart__item__content__settings")
    divContent.appendChild(divSettings)

/**création du div quantity */
    const divQuantity = document.createElement("div")
    divQuantity.classList.add("cart__item__content__settings__quantity")
    divQuantity.innerHTML = `<p>Qté : </p>`
    divSettings.appendChild(divQuantity)

/**création du input quantity */
    const divInputQuantity = document.createElement("input")
    divInputQuantity.setAttribute("type","number")
    divInputQuantity.classList.add("itemQuantity")
    divInputQuantity.name = "itemQuantity"
    divInputQuantity.min = "1"
    divInputQuantity.max = "100"
    divInputQuantity.value = quantity

    divQuantity.appendChild(divInputQuantity)
    
    /**ajout d'évènement modif quantité */

    divInputQuantity.addEventListener("change", function () {
        let quantity = Number(divInputQuantity.value)
        let article = divInputQuantity.closest(".cart__item")
        let id=article.getAttribute("data-id")       
        let color=article.getAttribute("data-color")
        modifQuantite (id, color, quantity)
    })


    /**création du div delete */
    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    divDelete.innerHTML = `<p class="deleteItem">Supprimer</p>`
    divSettings.appendChild(divDelete)

    /**ajout d'évènement clic supprimer */

    divDelete.addEventListener("click", function () {
        let article = divDelete.closest(".cart__item")
        let id=article.getAttribute("data-id")       
        let color=article.getAttribute("data-color")
        deleteArticle (id, color)
        article.remove()
    })
}

/**calcul prix ttl */


async function afficherPrixTotal () {

    let totalPrix = 0
    let totalArticle = 0

    for (var i = 0; i < localStorage.length; i++){
        key=localStorage.key(i)

/**spit de la key pour récupérer l'ID */
        const myArray = key.split("-")
        let id= myArray[0]
        let quantity= localStorage.getItem(key)
        
        const produit= await lireProduit(id)

        /**calcul total article */
        totalArticle= totalArticle+ Number(quantity)
        console.log (totalArticle)
      
      
        /**calcul prix total */
        totalPrix= totalPrix + Number(quantity) * produit.price 
        console.log (totalPrix)

    }    

    /**affichage total article */
    let totalQuantity = document.getElementById ("totalQuantity")
    totalQuantity.innerHTML= totalArticle
    
    /**affichage prix total */ 
    let totalPrice = document.getElementById ("totalPrice")
    totalPrice.innerHTML= totalPrix

}

/**formulaire*/

let contact = {}


/**recuperer balises de champs */

/**balise first name */
let firstName = document.getElementById ("firstName")
firstName.addEventListener("change", function () {
    contact.firstName = firstName.value
    console.log (contact.firstName)

    /**regex saisie first name */
    let regex = new RegExp ("^([a-zA-Z '-]+)$")
    let firstNameErrorMsg = document.getElementById ("firstNameErrorMsg")
    if (regex.test (contact.firstName)===false) {
        firstNameErrorMsg.innerHTML = "Caractère non valide"
    } else {
        firstNameErrorMsg.innerHTML = ""
    }

})

/**balise last name */
let lastName = document.getElementById ("lastName")
lastName.addEventListener("change", function () {
    contact.lastName = lastName.value
    console.log (contact.lastName)

    /**regex saisie last name */
    let regex = new RegExp ("^([a-zA-Z '-]+)$")
    let lastNameErrorMsg = document.getElementById ("lastNameErrorMsg")
    if (regex.test (contact.lastName)===false) {
        lastNameErrorMsg.innerHTML = "Caractère non valide"
    } else {
        lastNameErrorMsg.innerHTML = ""
    }

})

/**balise adresse */
let address = document.getElementById ("address")
address.addEventListener("change", function () {
    contact.address = address.value
    console.log (contact.address)

    /**regex saisie adresse */
    let regex = new RegExp ("^([0-9a-zA-Z '-]+)$")
    let addressErrorMsg = document.getElementById ("addressErrorMsg")
    if (regex.test (contact.address)===false) {
        addressErrorMsg.innerHTML = "Adresse non valide"
    } else {
        addressErrorMsg.innerHTML = ""
    }

})

/**balise city */
let city = document.getElementById ("city")
city.addEventListener("change", function () {
    contact.city = city.value
    console.log (contact.city)

    /**regex saisie city */
    let regex = new RegExp ("^([a-zA-Z '-]+)$")
    let cityErrorMsg = document.getElementById ("cityErrorMsg")
    if (regex.test (contact.city)===false) {
        cityErrorMsg.innerHTML = "Caractère non valide"
    } else {
        cityErrorMsg.innerHTML = ""
    }

})
/**balise email */
let email = document.getElementById ("email")
email.addEventListener("change", function () {
    contact.email = email.value
    console.log (contact.email)

    /**regex saisie email ^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$  */
    let regex = new RegExp ("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+")
    let emailErrorMsg = document.getElementById ("emailErrorMsg")
    if (regex.test (contact.email)===false) {
        emailErrorMsg.innerHTML = "Adresse non valide"
        console.log ("erreur")
    } else {
        emailErrorMsg.innerHTML = ""
        console.log ("ok")
    }

})

/**bouton commander */



console.log ("bouton")
console.log (arrayProducts)
























/**fonction modif quantité */
function modifQuantite (id, color, quantity) {

    /**maj quantité local storage */

    window.localStorage.setItem(id + "-" + color, quantity)

    /** maj total */
    afficherPrixTotal ()

}

/**fonction delete article */
function deleteArticle (id, color) {
    window.localStorage.removeItem(id + "-" + color)
    /** maj total */
    afficherPrixTotal ()

}

async function lireProduit(id) {

    /** 
     * recuperation d'un produit
     * @returns produits = objet js d'un produit
    */

    const reponse =  await fetch("http://localhost:3000/api/products/" + id)
    const produit =  await reponse.json()
    return(produit)
   
}

