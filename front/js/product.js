
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

    const parentImg = document.querySelector(".item__img");
    parentImg.appendChild(nomImg);


    /**  MAJ du titre, prix & description*/
    const baliseH1 = document.getElementById("title")
    baliseH1.innerText = product.name

    const balisePrix = document.getElementById("price")
    balisePrix.innerText = product.price

    const baliseDesc = document.getElementById("description")
    baliseDesc.innerText = product.description

    /** MAJ couleurs */

    let myColors = product.colors

    for (let i = 0; i < myColors.length; i++) {
        const baliseOption = document.createElement("option");
        baliseOption.value= myColors[i]
        baliseOption.innerText = myColors[i]
        let choixCouleur = document.getElementById ("colors")
        choixCouleur.appendChild(baliseOption)
    }

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


