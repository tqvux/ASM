let cart = JSON.parse(localStorage.getItem('cart') || '[]');
fetch('products.json')
    .then(response => response.json())
    .then((data) => displayProducts(data));
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    }
}
function addToCart(id) {
    fetch('products.json')
        .then(response => response.json())
        .then((products) => {
        const product = products.find(p => p.id === id);
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} has been added to the cart.`);
        }
    });
}
function displayCart() {
    const cartList = document.getElementById('cart-list');
    if (cartList) {
        cartList.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove from Cart</button>
            `;
            cartList.appendChild(cartItemDiv);
        });
    }
}
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}
if (document.getElementById('cart-list')) {
    displayCart();
}
