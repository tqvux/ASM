"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cartStorage_1 = require("./cartStorage");
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart-btn');
function updateCartTotal() {
    if (cartTotal) {
        const totalPrice = cartStorage_1.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
        cartTotal.textContent = totalPrice.toString();
    }
}
function displayCartItems() {
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ''; // Clear current items
        if (cartStorage_1.cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        }
        else {
            cartStorage_1.cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <span>${item.product.name} (x${item.quantity})</span>
                    <span>$${item.product.price * item.quantity}</span>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }
        updateCartTotal();
    }
}
// Xóa giỏ hàng
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        cartStorage_1.cart.length = 0;
        (0, cartStorage_1.saveCart)();
        displayCartItems();
        updateCartTotal();
    });
}
displayCartItems();
