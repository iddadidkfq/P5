/** on crée une fonction main pour la lecture asynchrone via l'API */
main()

async function main() {
/**
 * Fonction principale de product.html - 
 * mis en fonction pour pouvoir être en async sur lireProduitAPI()
 */

    /** (1) recuperation product ID vie l'URL */
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    /** (2) lecture du produit*/
    const product= await lireProduitAPI(id)
    console.log (product)

    /** (3) interaction utilisateur via le DOM */

        /** création image & alt ==================================*/
        const nomImg = document.createElement("img");
        nomImg.src = product.imageUrl
        nomImg.alt = product.altTxt
        /** intégration dans le DOM */
        const parentImg = document.querySelector(".item__img");
        parentImg.appendChild(nomImg);


        /**  MAJ du titre, prix & description ===================== */
        const baliseH1 = document.getElementById("title")
        baliseH1.innerText = product.name

        const balisePrix = document.getElementById("price")
        balisePrix.innerText = product.price

        const baliseDesc = document.getElementById("description")
        baliseDesc.innerText = product.description

        /** MAJ couleurs ========================================== */
        let myColors = product.colors
        let choixCouleur = document.getElementById ("colors")
        /** boucle sur les couleurs pour initialiser la liste des options couleurs 
         * on crée une balise option par couleur possible
        */
        for (let i = 0; i < myColors.length; i++) {
            const baliseOption = document.createElement("option");
            baliseOption.value= myColors[i]
            baliseOption.innerText = myColors[i]
            choixCouleur.appendChild(baliseOption)
        }
        /** récupération de la couleur sélectionnée - event change */
        let maCouleur="" 
        choixCouleur.addEventListener("change", function () {
            maCouleur = choixCouleur.options[choixCouleur.selectedIndex].text;
            console.log(maCouleur)
        })

        /**MAJ Quantité - initialisé à 1 ==================================== */
        let maQuantite=1
        let choixQuantite=document.getElementById ("quantity")
        choixQuantite.value=1
        /** récupération de la quantité saisie - event change */
        choixQuantite.addEventListener("change", function () {
            maQuantite = Number(choixQuantite.value);
            console.log(maQuantite)
        })
        
    /** (4) Clic bouton panier - event click ================================== */
    let monBouton = document.getElementById("addToCart")
    monBouton.addEventListener("click",function () {
        /** on teste si la quantité et la couleur sont ok */
        if ((ctrlQuantite(choixQuantite.value) === true) && 
                (ctrlCouleur(maCouleur) === true)){   
            /** on stocke l'article dans le panier = on écrit dans le local storage.
             * la clé unique = id-couleur
             * la quantité est la valeur associée à la clé
             */
            key = id + "-" + maCouleur
            /** on écrit dans le local storage */
            window.localStorage.setItem(key, maQuantite)
            /** on affiche dans la console le contenu du local storage */
            logLocalStorage()
     
            /** retour à la page d'accueil */
            window.location.href = './index.html'
        }
    })
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
            return (true)
        }   
    }

function ctrlCouleur(valeur){
/** affiche une alerte si une couleur a été sélectionnée 
 * @param {text} valeur = couleur sélectionnée à controler
 * @return {boolean} = TRUE si couleur OK, FALSE sinon
*/
    if ((valeur === "--SVP, choisissez une couleur --") |
        (valeur === "")) {
        alert("Veuillez saisir une couleur")
        return (false)
    } else {
        return (true)
    }   
}
async function lireProduitAPI(id) {
/** recuperation d'un produit via l'API
 * @param {text} = ID du produit à lire
 * @returns {objet} = objet js du produit lu
*/
    const reponse =  await fetch("http://localhost:3000/api/products/" + id)
    /** conversion du JSON de la réponse en variable JS */
    const produit =  await reponse.json()
    return(produit)  
}

function logLocalStorage () {
/** affichage du local storage dans la console */

    /** boucle sur les lignes du local storage */
    for (var i = 0; i < localStorage.length; i++){
        let keyLS = localStorage.key(i)
        console.log (keyLS + "=" + localStorage.getItem(keyLS))
    }
}

