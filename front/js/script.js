/**    effacement du local storage pour tests
 localStorage.clear()
 */

/** On passe par une fonction main pour la lecture asynchrone via l'API */
main()

async function main() {
/** Fonction principale de index.html - 
 * mis en fonction pour pouvoir être en await sur lireTousProduitsAPI()
 */
    /** chargement du tableau des produits via l'API */
    const products = await lireTousProduitsAPI()
    /** boucle d'affichage des produits */
    for (let i = 0; i < products.length; i++) {
        afficherProduit(products[i])
    }
}

async function lireTousProduitsAPI() {
/** recuperation de tous les produits par l'API
 * @return {array} = tableau js de tous les objets produits
*/
    /** appel API */
    const reponse =  await fetch("http://localhost:3000/api/products/")
    console.log(reponse)
    /** conversion du JSON en variable JS */
    const produits =  await reponse.json()

    return(produits)  
}

function afficherProduit (produit){
/** affichage d'un produit
 * @param {object} produit = objet produit à afficher
*/
    /** création balise <a> avec ID produit dans l'URL*/
    const baliseA = document.createElement("a");
    baliseA.href="./product.html?id=" + produit._id
    const sectionItems = document.getElementById("items")
    sectionItems.appendChild(baliseA);

    /** création balise article*/
    const baliseArticle = document.createElement("article");
    baliseA.appendChild(baliseArticle);

    /** création balise image & alt*/
    const baliseImg = document.createElement("img");
    baliseImg.src = produit.imageUrl
    baliseImg.alt = produit.altTxt
    baliseArticle.appendChild(baliseImg);

    /** création balise nom du produit*/
    const baliseH3 = document.createElement("h3");
    baliseH3.classList.add("productName")
    baliseH3.innerText = produit.name
    baliseArticle.appendChild(baliseH3);

    /** création balise description du produit*/
    const baliseP = document.createElement("p");
    baliseP.classList.add("productDescription")
    baliseP.innerText = produit.description;
    baliseArticle.appendChild(baliseP);

}
