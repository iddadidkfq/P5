/**  */
async function main() {

    /**
     * Fonction principale de index.html - 
     * mis en fonction pour pouvoir être en async sur lireProduits()
     */

    const products = await lireProduits()

    for (let i = 0; i < products.length; i++) {

        afficherProduit(products[i])
    }

}

async function lireProduits() {

    /** 
     * recuperation des produits
     * @returns produits = tableau js de tous les produits
    */

    const reponse =  await fetch("http://localhost:3000/api/products/")
    const produits =  await reponse.json()
    return(produits)
   
}

function afficherProduit (produit){

    /** 
     * affichage d'un produit
     * @param {object} produit = objet produit à afficher
    */

    /**création balise <a> */

    const baliseA = document.createElement("a");
    baliseA.href="./product.html?id=" + produit._id
    const sectionItems = document.getElementById("items")
    sectionItems.appendChild(baliseA);

    /**creation article*/
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

main()