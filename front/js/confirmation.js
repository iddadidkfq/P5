/** (1) récupération du numéro de commande dans l'URL */
const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderid");

/** (2) affichage du numéro de commande */
let baliseSpan = document.getElementById("orderId")
baliseSpan.innerText=orderId

/** (3) suppression du cart */
localStorage.clear()