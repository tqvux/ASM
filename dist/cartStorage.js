"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart = void 0;
exports.saveCart = saveCart;
exports.cart = JSON.parse(localStorage.getItem('cart') || '[]');
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(exports.cart));
}
