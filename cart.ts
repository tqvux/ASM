

import { cart, saveCart, CartItem } from './cartStorage';

const cartItemsContainer: HTMLElement | null = document.getElementById('cart-items');
const cartTotal: HTMLElement | null = document.getElementById('cart-total');
const clearCartBtn: HTMLElement | null = document.getElementById('clear-cart-btn');

function updateCartTotal(): void {
    if (cartTotal) {
        const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
        cartTotal.textContent = totalPrice.toString();
    }
}

function displayCartItems(): void {
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';  // Clear current items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
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
        cart.length = 0;
        saveCart();
        displayCartItems();
        updateCartTotal();
    });
}

displayCartItems();
