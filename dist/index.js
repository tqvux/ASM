"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productList = document.getElementById('product-list');
// Load sản phẩm từ file JSON
fetch('products.json')
    .then(response => response.json())
    .then((products) => {
    displayProducts(products);
});
function displayProducts(products) {
    if (productList) {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    }
}
const cartStorage_1 = require("./cartStorage");
function addToCart(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then((products) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            const cartItem = cartStorage_1.cart.find(item => item.product.id === product.id);
            if (cartItem) {
                cartItem.quantity++;
            }
            else {
                cartStorage_1.cart.push({ product, quantity: 1 });
            }
            (0, cartStorage_1.saveCart)();
            alert(`${product.name} has been added to your cart.`);
        }
    });
}
