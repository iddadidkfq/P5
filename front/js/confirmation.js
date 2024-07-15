/** récupération du numéro de commande dans l'URL */
cNum = "1234"

/** affichage du numéro de commande */
let orderId = document.getElementById("orderId")
orderId.innerText = cNum

/** suppression du cart */
localStorage.clear()