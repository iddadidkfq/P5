
main()

async function main() {

    /**
     * Fonction principale de index.html - 
     * mis en fonction pour pouvoir être en async sur lireProduits()
     */

/**recuperation product ID  */

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

const product= await lireProduit(id)
console.log (product)


/** création image & alt*/
const nomImg = document.createElement("img");
nomImg.src = product.imageUrl
nomImg.alt = product.altTxt

console.log (nomImg)
const parentImg = document.querySelector(".item__img");
parentImg.appendChild(nomImg);

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


