/** affichage du contenu du cart ================================================ 
 * stockage des id des articles dans arrayProducts pour futur appel de l'API qui
 *  aura besoin de l'objet contact et de l'array des id des produits du cart
*/
    const arrayProducts = afficherCart ()

/** affichage du prix total ===================================================== 
*/
    afficherPrixTotal () 

/** saisie et controle du formulaire des infos client ============================
  les données saisies sont stockées dans l'objet contact
*/
    let contact = {}

    /**balise first name - controle sur event change*/
    let firstName = document.getElementById ("firstName")
    firstName.addEventListener("change", function () {
        contact.firstName = firstName.value

        /**regex saisie first name */
        let regex = new RegExp ("^([a-zA-Z '-]+)$")
        let firstNameErrorMsg = document.getElementById ("firstNameErrorMsg")
        if (regex.test (contact.firstName)===false) {
            firstNameErrorMsg.innerHTML = "Caractère non valide"
        } else {
            firstNameErrorMsg.innerHTML = ""  /** on efface un éventuel précédent message si OK */
        }
    })

    /**balise last name - controle sur event change*/
    let lastName = document.getElementById ("lastName")
    lastName.addEventListener("change", function () {
        contact.lastName = lastName.value

        /**regex saisie last name */
        let regex = new RegExp ("^([a-zA-Z '-]+)$")
        let lastNameErrorMsg = document.getElementById ("lastNameErrorMsg")
        if (regex.test (contact.lastName)===false) {
            lastNameErrorMsg.innerHTML = "Caractère non valide"
        } else {
            lastNameErrorMsg.innerHTML = "" /** on efface un éventuel précédent message si OK */
        }
    })

    /**balise adresse - controle sur event change */
    let address = document.getElementById ("address")
    address.addEventListener("change", function () {
        contact.address = address.value

        /**regex saisie adresse */
        let regex = new RegExp ("^([0-9a-zA-Z '-]+)$")
        let addressErrorMsg = document.getElementById ("addressErrorMsg")
        if (regex.test (contact.address)===false) {
            addressErrorMsg.innerHTML = "Adresse non valide"
        } else {
            addressErrorMsg.innerHTML = "" /** on efface un éventuel précédent message si OK */
        }
    })

    /**balise city - controle sur event change */
    let city = document.getElementById ("city")
    city.addEventListener("change", function () {
        contact.city = city.value

        /**regex saisie city */
        let regex = new RegExp ("^([a-zA-Z '-]+)$")
        let cityErrorMsg = document.getElementById ("cityErrorMsg")
        if (regex.test (contact.city)===false) {
            cityErrorMsg.innerHTML = "Caractère non valide"
        } else {
            cityErrorMsg.innerHTML = "" /** on efface un éventuel précédent message si OK */
        }
    })
    /**balise email - controle sur event change */
    let email = document.getElementById ("email")
    email.addEventListener("change", function () {
        contact.email = email.value

        /**regex saisie email */
        let regex = new RegExp ("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+")
        let emailErrorMsg = document.getElementById ("emailErrorMsg")
        if (regex.test (contact.email)===false) {
            emailErrorMsg.innerHTML = "Adresse non valide"
            console.log ("erreur")
        } else {
            emailErrorMsg.innerHTML = "" /** on efface un éventuel précédent message si OK */
        }
    })

/**Traitement du bouton commander ============================================= */

    /**récup du formulaire */
    let form = document.querySelector (".cart__order__form")

    /** détection event submit sur formulaire (et non sur le bouton) */
    form.addEventListener ("submit", (event) => {
 
        /**blocage de l'envoi du formulaire en HTML*/
        event.preventDefault ()

        /**on appelle l'API*/
        const reponse = envoyerPost (contact, arrayProducts)
            
    }
)

function afficherCart () {
/** affiche les divers articles du CART à partir du local storage
 * @return {array} = tableau des ID des produits du cart
*/
    /** création tableau des ID produits */
    const tableauProduit = []

    /** boucle sur les lignes du local storage */
    for (var i = 0; i < localStorage.length; i++){
        /** lecture de la key du produit dans le local storage. La key = ID+color */
        key=localStorage.key(i)

        /**spit de la key pour récupérer l'ID & la Color*/
        const myArray = key.split("-")
        let id= myArray[0]
        let color= myArray [1]

        /** lecture de la valeur associée à la key = quantité */
        let quantity= localStorage.getItem(key)

        /** stockage de l'ID dans le tableau des produits */
        tableauProduit[i]= id
        
        /** affichage de l'article */
        afficherArticle (id,color,quantity)
    }

    console.log (tableauProduit)

    /** récupération de la valeur tableauProduits*/
    return (tableauProduit)
}

async function afficherArticle (id,color,quantity) {
/** fonction d'affichage d'un article du cart
 * @param {text} id = ID du produit
 * @param {text} color = couleur du produit
 * @param {text} quantity = quantité du produit
 */
    /** lecture des infos du produit par l'API - en asynchrone*/
    const produit= await lireProduitAPI(id)

    /** création de baliste article */    
    const article = document.createElement("article");
    article.classList.add("cart__item")
    article.setAttribute ("data-id",id)
    article.setAttribute ("data-color",color)
    const section = document.getElementById ("cart__items")
    section.appendChild (article)

    /** création du div pour img */  
    const divImg = document.createElement("div")
    divImg.classList.add("cart__item__img")
    divImg.innerHTML = `<img src="` + produit.imageUrl +`" alt="` + produit.altTxt+ `">`
    article.appendChild(divImg)

    /** création du div content */
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
        /**  maj du local storage */
        modifQuantiteLS (id, color, quantity) 
        /** maj total */
        afficherPrixTotal ()
    })

    /**création du div delete */
    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    divDelete.innerHTML = `<p class="deleteItem">Supprimer</p>`
    divSettings.appendChild(divDelete)

    /**ajout d'évènement clic delete - supprime le produit du cart*/
    divDelete.addEventListener("click", function () {
        let article = divDelete.closest(".cart__item")
        let id=article.getAttribute("data-id")       
        let color=article.getAttribute("data-color")
        /** suppression de l'article dans le local storage */
        deleteArticleLS (id, color)
        /** suppression de toute la balise article dans le DOM */
        article.remove()
        /** maj total */
        afficherPrixTotal ()
    })
}

async function afficherPrixTotal () {
/** calcul prix total du CART - on lit les articles dans le local storage puis 
 * le prix via l'API
*/
    let totalPrix = 0
    let totalArticle = 0
    /** boucle sur les articles du local storage */
    for (var i = 0; i < localStorage.length; i++){
        key=localStorage.key(i)
        /**spit de la key pour récupérer l'ID */
        const myArray = key.split("-")
        let id= myArray[0]
        let quantity= localStorage.getItem(key)
        /** lecture des infos produit via l'API */
        const produit= await lireProduitAPI(id)
        /**calcul nombre total d'articles */
        totalArticle= totalArticle+ Number(quantity)
        /**calcul prix total */
        totalPrix= totalPrix + Number(quantity) * produit.price 
    }    

    /**affichage nombre total d'articles */
    let totalQuantity = document.getElementById ("totalQuantity")
    totalQuantity.innerHTML= totalArticle
    
    /**affichage prix total */ 
    let totalPrice = document.getElementById ("totalPrice")
    totalPrice.innerHTML= totalPrix

}


async function envoyerPost (contact, arrayProducts){
/**Fonction d'envoi du post API
 * @param {object} contact = objet contact 
 * @param {array} arrayProducts = tableau des ID produits
 * @return {object} = réponse de l'appel de l'API
*/
    const contactJSON = JSON.stringify(contact)
    const productsJSON = JSON.stringify(arrayProducts)
    let body = `{"contact":` + contactJSON + `, "products":` + productsJSON + `}`
    console.log (body)
    /** POST de l'objet contact et du tableau des IDs produits */
    const reponseJSON = await fetch ('http://localhost:3000/api/products/order',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
    })
    console.log("reponseJSON ===================================")
    console.log(reponseJSON)
    /** conversion de la réponse JSON en variables Javascript */
    let reponse = await reponseJSON.json
    console.log("reponse ===================================")
    console.log (reponse)
    /** return de la réponse */
    return (reponse)

}

        

function modifQuantiteLS (id, color, quantity) {
/** fonction modif quantité dans le local storage en utilisant la clé ID-COLOR.
 * On écrase l'ancienne valeur éventuelle
 * @param {text} id = ID du produit
 * @param {text} color = couleur du produit
 * @param {text} quantity = quantité de produit
*/
    window.localStorage.setItem(id + "-" + color, quantity)
}

function deleteArticleLS (id, color) {
/** fonction delete article du local storage. On supprime ca clé du produit.
 * @param {text} id = ID du produit
 * @param {text} color = couleur du produit
*/
    window.localStorage.removeItem(id + "-" + color)

}

async function lireProduitAPI(id) {
/** recuperation des infos d'un produit via l'API
 * @param {text} id = ID du produit
 * @return {object} = objet js d'un produit
*/
    const reponse =  await fetch("http://localhost:3000/api/products/" + id)
    const produit =  await reponse.json()
    return(produit)
   
}

