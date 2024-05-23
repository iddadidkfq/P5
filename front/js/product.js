
main()

async function main() {

    /**
     * Fonction principale de index.html - 
     * mis en fonction pour pouvoir être en async sur lireProduits()
     */
 /**    clearLocalStorage () */
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
    let choixCouleur = document.getElementById ("colors")

    for (let i = 0; i < myColors.length; i++) {
        const baliseOption = document.createElement("option");
        baliseOption.value= myColors[i]
        baliseOption.innerText = myColors[i]
        choixCouleur.appendChild(baliseOption)
    }

    let maCouleur="" 
    choixCouleur.addEventListener("change", function () {
        maCouleur = choixCouleur.options[choixCouleur.selectedIndex].text;
        console.log(maCouleur)
    })

    /**MAJ Quantité */
    let maQuantite=1
    let choixQuantite=document.getElementById ("quantity")
    choixQuantite.value=1
    choixQuantite.addEventListener("change", function () {
        maQuantite = Number(choixQuantite.value);
        console.log(maQuantite)
    })
    /**Clic bouton panier */

    let monBouton = document.getElementById("addToCart")
    monBouton.addEventListener("click",function () {
        if ((ctrlQuantite(choixQuantite.value) === true) && 
                (ctrlCouleur(maCouleur) === true)){   
            logLocalStorage()
            key = id + "-" + maCouleur
            let currentQuantity = Number(window.localStorage.getItem(key))
            console.log (currentQuantity)
            if (currentQuantity === null){
                currentQuantity = maQuantité
            } else {
                currentQuantity = currentQuantity + maQuantite
            }
            window.localStorage.setItem(key, currentQuantity)
            logLocalStorage()
        }
    })
}   

function ctrlQuantite(valeur){
        let regex = new RegExp("^[1-9][0-9]?$")
    if (regex.test(valeur)===false){
        alert("La quantité " + valeur + " n'est pas valide")
        return (false)
    } else {
        return (true)
    }   
}

function ctrlCouleur(valeur){
    if ((valeur === "--SVP, choisissez une couleur --") |
        (valeur === "")) {
        alert("Veuillez saisir une couleur")
        return (false)
    } else {
        return (true)
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

function logLocalStorage () {
    for (var i = 0; i < localStorage.length; i++){
        console.log (localStorage.key(i) + "=" + localStorage.getItem(localStorage.key(i)))
    }
}

function clearLocalStorage () {
    localStorage.clear()
}