//............. Récupération du paramètre orderId dans l'url..............
let urlConfirmationPage = new URLSearchParams( window.location.search );
let orderId = urlConfirmationPage.get( "orderId" );
console.log( "orderId", orderId ); 

//...............affichage dans le DOM du numero de commande...............
let msgNumberConfirmation = document.getElementById( "orderId" );
msgNumberConfirmation.textContent = `${orderId}`;