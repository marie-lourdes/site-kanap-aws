//............ Requête GET des données des produits de l'api et transformation des données au format json en objet javascript...........

let request = fetch("http://13.38.86.40/api/products");
let requestProducts = request.then(function (res) {
    if (res.ok) {
        return res.json();
    }
})
    .catch(function (error) {
        console.log("error request", error);
    });

//............... Récupération des produits retournés par l'api et sous forme d'objet javascript.............

requestProducts.then(function (catalogue) {
    console.log("verification des produits kanapé", catalogue);
    // récupération de la section pour rattacher les éléments du DOM
    const productsCatalogue = document.querySelector("#items");
    //récuperation de chaque produit dans l objet de requête avec la boucle for of et affichage dan le Dom de chaque produits
    for (let product of catalogue) {
        //création des élémnts du DOM
        const linkProduct = document.createElement("a");
        //création du lien avec id pour chaque produit dans l'url des liens des produits de la page d'accueil
        let idProduct = product._id;
        linkProduct.href = `/Kanap/product?id=${idProduct}`;
        // Création des sous-éléments de chaque lien des produits dans le DOM
        const articleProducts = document.createElement("article");
        const imgProduct = document.createElement("img");
        imgProduct.src = product.imageUrl;
        imgProduct.alt = product.altTxt;
        const titleProduct = document.createElement("h3");
        titleProduct.textContent = product.name;
        titleProduct.setAttribute("class", "product-name");
        const descriptionProduct = document.createElement("p");
        descriptionProduct.setAttribute("class", "product-description");
        descriptionProduct.textContent = product.description;

        // affichage dans le DOM
        articleProducts.appendChild(imgProduct);
        articleProducts.appendChild(titleProduct);
        articleProducts.appendChild(descriptionProduct);
        linkProduct.appendChild(articleProducts);
        productsCatalogue.appendChild(linkProduct);
    }
    console.log("verification  des éléments insérés dans le dom dans la section '#items'", productsCatalogue);
})
    .catch(function (error) {
        console.log("error response", error);
    });








