// index.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}


interface CartItem {
    product: Product;
    quantity: number;
}

const productList: HTMLElement | null = document.getElementById('product-list');


// Load sản phẩm từ file JSON
fetch('products.json')
    .then(response => response.json())
    .then((products: Product[]) => {
        displayProducts(products);
    });

function displayProducts(products: Product[]): void {
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

import { cart, saveCart } from './cartStorage';

function addToCart(productId: number): void {
    fetch('products.json')
        .then(response => response.json())
        .then((products: Product[]) => {
            const product = products.find(p => p.id === productId);
            if (product) {
                const cartItem = cart.find(item => item.product.id === product.id);
                if (cartItem) {
                    cartItem.quantity++;
                } else {
                    cart.push({ product, quantity: 1 });
                }
                saveCart();
                alert(`${product.name} has been added to your cart.`);
            }
        });


}
