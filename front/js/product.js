//..............Recuperation de l id du produit selectionné sur la page  actuelle du produit.............

let params = new URLSearchParams( window.location.search );
let idSelected = params.get( "id" );
console.log( "id selectionné id selectionné", idSelected );

//............ Requête du produit selectionné avec son id..................

let request = fetch( `http://localhost:3000/api/products/${idSelected}` );
console.log("requete", request); // vérification du code http 

//..........Traitement de la réponse retourné par l'api en objet javascript..............

let productSelected = request.then( function ( res ) {
    if ( res.ok ) {
        return res.json();
    }
})
.catch( function ( error ){
    console.log( "error requête", error );
 });

//................. Recupération du produit selectionné en objet javascrit  de la promesse productSelected...............

productSelected.then( function ( productSelect ){
    console.log( "produit selectionné", productSelect ); // verification du contenu de l objet du produit
    //Sélection et création des éléments du DOM et affichage des éléments (détails du produit) dans le DOM de la page produit
    const title = document.querySelector( "title" );
    title.textContent = productSelect.name;
    let itemImg = document.querySelector( ".item__img" );
    let imgProductSelected = document.createElement( "img" );
    imgProductSelected.src = productSelect.imageUrl;
    imgProductSelected.alt = productSelect.altTxt;
    let titleProduct = document.querySelector( ".item__content__titlePrice #title" );
    titleProduct.textContent = productSelect.name;
    let priceProduct = document.querySelector( "#title + p > #price" );
    priceProduct.textContent = productSelect.price;
    let descriptionProduct = document.querySelector( ".item__content__description__title + #description" );
    descriptionProduct.textContent = productSelect.description;
    //relier l'image du produit au DOM avec son element parent et affichage dans le DOM
    itemImg.appendChild( imgProductSelected );
    // création des options par couleur de chaque produit sélectionné
    for ( let colorProduct of productSelect.colors ){
        let selectColor = document.querySelector( ".item__content__settings__color #colors" );
        let optionColor = document.createElement( "option" );
        optionColor.setAttribute( "name", "color" );
        optionColor.setAttribute( "id", colorProduct );
        optionColor.value = colorProduct;
        optionColor.textContent = colorProduct;
        //relier les options au parent <select>
        selectColor.appendChild( optionColor );
    }

    //................ Ajout du panier avec une "boite à outil de fonctions" class et ses methodes statiques...............

    class addCart {
        //création de la methode statique  pour recupérer la couleur
        static addColor( selectColor ){
            selectColor = document.querySelector( ".item__content__settings__color #colors" );
            selectColor.addEventListener( "input", function ( event ){
                selectColor = event.target.value;
                console.log( "couleur", selectColor );
                // afficher dans le DOM l'option de couleur choisie
                let option = document.querySelector( ".item__content__settings__color #colors option" );
                option.value = selectColor;
                console.log( "couleur choisie", option );
            });
            return selectColor;
        }

        //création de la methode statique  pour recupérer la quantité
        static addQuantity( inputQuantity ){
            inputQuantity = document.getElementById( "itemQuantity" );
            inputQuantity.addEventListener( "input", function ( event ) {
                let val = parseInt( event.target.value );
                // on empeche la saisie d 'une entrée de valeur inférieur à 0 ou supérieur 100 
                if( val <= 0 || isNaN( val ) ){
                    inputQuantity.value = 1;
                }else if( val > 100 ) {
                    inputQuantity.value = 100;
                }else{
                    inputQuantity.value = val;
                    //mise à jour dans le DOM de la quantité dans l'attribut value de l imputQuantity 
                    document.getElementById( "itemQuantity" ).removeAttribute( "value" );
                    document.getElementById("itemQuantity").setAttribute("value", val);

                    console.log( "nombre de produit", inputQuantity.value )
                    console.log( "nombre de produit affiché dans le DOM", inputQuantity) ;
                }
            });
            return inputQuantity;
        }

        //création de la methode statique pour enregistrer le panier et  le choix de la couleur et de la quantité du produit
        static addQuantityColorWindowStorage( inputQuantity, selectColor ){

            //recupération de la quantité et de la couleur  en appelant les methodes statique addQuantity et addColor
            selectColor = addCart.addColor();
            inputQuantity = addCart.addQuantity();

            // recupération de la promesse resolue productSelected et création de l'objet dub produit ajouté au panierproductStorage
            let btnAddCart = document.querySelector( "#addToCart" );
            btnAddCart.addEventListener( "click", function (){
                let productStorage = {
                    idProduit: idSelected,
                    imgUrl: productSelect.imageUrl,
                    altImg: productSelect.altTxt,
                    nameProduct: productSelect.name,
                    couleur: selectColor.value,
                    priceProduct: productSelect.price,
                    quantite: parseInt( inputQuantity.value )
                };

                /* Si la quantité ajouté est inferieur ou égale à 0 on enregistre pas le produit  dans du panier du localstorage, 
                on arrete la fonction d'enregistrement du panier dans le localstorage*/
                if( productStorage.quantite <= 0 && productStorage.quantite > 100 ){
                    return;
                }

                console.log( "produit storage", productStorage );

                //création de la fonction pour l'enregistrement du panier dans un tableau dans le localstorage
                const addProductSelectedStorage = () => { //création de la fonction qui enregistre le panier productStorage et l'objet productStorage
                    tabCartStorage.push( productStorage );
                    localStorage.setItem( "produits", JSON.stringify( tabCartStorage ) );
                };

                let tabCartStorage = JSON.parse( localStorage.getItem( "produits" ) );
                console.log( "tableau storage avec valeur null ou valeur contenant l' objet productStorage", tabCartStorage );
                // si le localstorage est vide on crée un nouveau tableau
                if ( tabCartStorage == null ){
                    console.log( " panier vide", tabCartStorage );
                    // Création du tableau panier
                    tabCartStorage = [];
                    // on ajoute l'objet productStorage dans le tableau et on enregistre le tableau panier
                    addProductSelectedStorage();

                }else if( tabCartStorage != null ){
                    console.log( " panier des produit existants ", tabCartStorage );
                    //si le panier "tabCartStorage" contient déjà un produit  avec le même id et la meme couleur , on incremente la quantité en modifiant le tableau 
                    for ( let product of tabCartStorage ){
                        console.log( "produit stocké", product );
                        if( product.idProduit == idSelected && product.couleur == selectColor.value ) {
                            /*- incrémente la quantité de l'objet "productStorage" qui est représenté par la variable "product" dans la boucle,
                              - on enregistre le panier tableau storage sans ajouter au tableau un nouvel objet "productStorage*/
                            product.quantite += parseInt( inputQuantity.value );
                            console.log( "produit quantité ", product.quantite );
                            localStorage.setItem( "produits", JSON.stringify( tabCartStorage ) );
                            tabCartStorage = JSON.parse( localStorage.getItem( "produits" ) );
                            return;
                        }
                    }
                    // Si le panier contient déjà des produits on ajoute l'objet productStorage au tableau panier "tabCartStorage" et on l'enregistre           
                    addProductSelectedStorage();
                }
                return tabCartStorage = JSON.parse( localStorage.getItem( "produits" ) );
            });
        }
    }
    addCart.addQuantityColorWindowStorage();
})
.catch( function ( error ){
    console.log( "error reponse", error );
});










