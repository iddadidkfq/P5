/** récupération du numéro de commande dans l'URL */
const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderid");

/** affichage du numéro de commande */
let baliseSpan = document.getElementById("orderId")
baliseSpan.innerText=orderId

/** suppression du cart */
localStorage.clear()