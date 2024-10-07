/** on crée une fonction main pour la lecture asynchrone via l'API */
main()

async function main() {
/**
 * Fonction principale de product.html - 
 * mis en fonction pour pouvoir être en async sur lireProduitAPI()
 */


/** (A) affichage du contenu du cart ================================================ 
*/
    
    /** (A1) boucle sur les lignes du local storage */
    for (var i = 0; i < localStorage.length; i++){
        /** lecture de la key du produit dans le local storage. La key = ID+color */
        key=localStorage.key(i)

        /**spit de la key pour récupérer l'ID & la Color*/
        const myArray = key.split("-")
        let id= myArray[0]
        let color= myArray [1]

        /** lecture de la valeur associée à la key = quantité */
        let quantity= localStorage.getItem(key)
        /** (A2) lecture des infos du produit par l'API - en asynchrone*/
        const produit= await lireProduitAPI(id)

        /** (A3) Gestion du DOM */

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
            divInputQuantity.setAttribute("min","1")
            divInputQuantity.setAttribute("max","100")
            divInputQuantity.value = quantity
            divQuantity.appendChild(divInputQuantity)
            
            /**ajout d'évènement modif quantité */
            divInputQuantity.addEventListener("change", function () {
                let quantity = Number(divInputQuantity.value)
                if (ctrlQuantite(quantity)) {
                    let article = divInputQuantity.closest(".cart__item")
                    let id=article.getAttribute("data-id")       
                    let color=article.getAttribute("data-color")
                    /**  maj du local storage */
                    modifQuantiteLS (id, color, quantity) 
                    /** pour vérification */
                    logLocalStorage ()
                    /** maj total */
                    afficherPrixTotal ()
                }

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
                /** pour vérification */
                logLocalStorage ()
                /** maj total */
                afficherPrixTotal ()
            })
    }
        

    /** (B) calcul & affichage du prix total ===================================================== 
    */ 
    afficherPrixTotal ()

    /** (C) saisie et controle du formulaire des infos client ============================
     les données saisies sont stockées dans l'objet contact
    */
    let contact = {}

    /**balise first name - controle sur event change*/
    let firstName = document.getElementById ("firstName")
    firstName.addEventListener("change", function () {
        contact.firstName = firstName.value

        /**regex saisie first name 
         * ^([a-zA-Z '-]+) = doit commencer (^) par 
         *      un groupe (lettre MAJ ou MIN ou espace ou apostrophe ou tiret), 
         *      présent au moins une fois (+) 
         * $ = le groupe ci-dessus doit aussi se terminer par la même séquence
        */
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
        let regex = new RegExp ("^([a-zA-ZÀ-ÿ' -]+)$")
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

        /**regex saisie email 
         * [a-z0-9._-]+ = [groupe de chiffre ou lettre ou . ou - ou _] répété au moins 1 fois
         * @ = il faut un @
         * [a-z0-9._-]+ = [groupe de chiffre ou lettre ou . ou - ou _] répété au moins 1 fois
         * \. = il faut un point (caractère d'évitement \ car sinon le point représente 
         * n'importe quel caractère)
         * [a-z0-9._-]+ = [groupe de chiffre ou lettre ou . ou - ou _] répété au moins 1 fois
        */
        let regex = new RegExp ("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+")
        let emailErrorMsg = document.getElementById ("emailErrorMsg")
        if (regex.test (contact.email)===false) {
            emailErrorMsg.innerHTML = "Adresse non valide"
            console.log ("erreur")
        } else {
            emailErrorMsg.innerHTML = "" /** on efface un éventuel précédent message si OK */
        }
    })

    /** (D) Traitement du bouton commander ============================================= */

    /**récup du formulaire */
    let form = document.querySelector (".cart__order__form")

    /** détection event submit sur formulaire (et non sur le bouton) */
    form.addEventListener ("submit", async(event) => {
        /**controle prix total non nul*/ 
        let totalPrice = document.getElementById ("totalPrice")
        console.log(Number(totalPrice.innerHTML))
        if (Number(totalPrice.innerHTML) > 0) { 

            /**blocage de l'envoi du formulaire en HTML*/
            event.preventDefault ()   
            /** création tableau des ID produits commandés*/
            const tableauProduit = []
        
                /** boucle sur les articles du local storage */
                for (var i = 0; i < localStorage.length; i++){
                    key=localStorage.key(i)
                    /**spit de la key pour récupérer l'ID */
                    const myArray = key.split("-")
                    let id= myArray[0]
                    /** stockage de l'ID dans le tableau des produits */
                    tableauProduit[i]= id
                }    
                console.log(tableauProduit)
        
            /** (D1) on appelle l'API*/
            let orderId = await envoyerPost (contact, tableauProduit) 
            console.log (orderId)
            /** (D2) lancement de la page confirmation de commande */
            window.location.href = './confirmation.html?orderid=' + orderId
        } else {
            alert("Commande vide")
        }
    })    
}    


async function afficherArticle (id,color,quantity) {
/** fonction d'affichage d'un article du cart
 * @param {text} id = ID du produit
 * @param {text} color = couleur du produit
 * @param {text} quantity = quantité du produit
 */

}

async function afficherPrixTotal () {
/** calcul prix total du CART - on lit les articles dans le local storage puis le prix via l'API
*/
 
    let totalPrix = 0
    let totalArticle = 0
    /** (B1) boucle sur les articles du local storage */
    for (var i = 0; i < localStorage.length; i++){
        let key=localStorage.key(i)
        /**spit de la key pour récupérer l'ID */
        const myArray = key.split("-")
        let id= myArray[0]
        let quantity= localStorage.getItem(key)
        /** (B2) lecture des infos produit via l'API */
        const produit= await lireProduitAPI(id)
        /**calcul nombre total d'articles */
        totalArticle= totalArticle+ Number(quantity)
        /**calcul prix total */
        totalPrix= totalPrix + Number(quantity) * produit.price 
    }    
    /** (B3) Affichage dans le DOM */

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
 * @return {text} = orderId issu de la réponse de l'API
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
    /** conversion de la réponse JSON en variables Javascript */
    let reponse = await reponseJSON.json ()
    console.log("reponse.orderId = " + reponse.orderId)    
    /** return de la réponse */
    return reponse.orderId

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
    return produit
}

function logLocalStorage () {
    /** affichage du local storage dans la console */
        /** boucle sur les lignes du local storage */
        for (var i = 0; i < localStorage.length; i++){
            let keyLS = localStorage.key(i)
            console.log (keyLS + "=" + localStorage.getItem(keyLS))
        }
    }

function ctrlQuantite(valeur){
    /** affiche une alerte si quantité saisie invalide 
     * @param {text} valeur = quantité saisie à controler
     * @return {boolean} = TRUE si quantité OK, FALSE sinon
    */
         /**regex saisie entre 1 et 100 
        ^[1-9][0-9]?$|^100$
        1st Alternative ^[1-9][0-9]?$
            ^ asserts position at start of a line
            Match a single character present in the list below [1-9]
            Match a single character present in the list below [0-9]
            ? matches the previous token between zero and one times
            $ asserts position at the end of a line
        2nd Alternative ^100$
            ^ asserts position at start of a line
            matches the characters 100 literally (case sensitive)
            $ asserts position at the end of a line
        */
        let regex = new RegExp("^[1-9][0-9]?$|^100$")
        if (regex.test(valeur)===false){
            alert("La quantité " + valeur + " n'est pas valide")
            return (false)
        } else {
            /** maj total */
            afficherPrixTotal ()
            return (true)
        }   
    }