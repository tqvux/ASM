// cartStorage.ts
import { Product } from './index';  // Import từ file index.ts hoặc file gốc nơi Product được định nghĩa

export interface CartItem {
    product: Product;
    quantity: number;
}

export let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

export function saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(cart));
}
