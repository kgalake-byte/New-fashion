// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        image: "images/product1.jpg",
        rating: 4,
        reviews: 42
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 49.99,
        image: "images/product2.jpg",
        rating: 5,
        reviews: 36
    },
    {
        id: 3,
        name: "Casual Blazer",
        price: 89.99,
        image: "images/product3.jpg",
        rating: 4,
        reviews: 18
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 79.99,
        image: "images/product4.jpg",
        rating: 5,
        reviews: 56
    }
];

// Load products on homepage
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.product-grid')) {
        loadProducts();
    }
    
    // Update cart count
    updateCartCount();
    
    // Product page functionality
    if (document.querySelector('.product-page')) {
        setupProductPage();
    }
});

function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function setupProductPage() {
    // Thumbnail image click handler
    document.querySelectorAll('.thumbnail-images img').forEach(thumb => {
        thumb.addEventListener('click', function() {
            document.getElementById('main-product-image').src = this.src;
        });
    });
    
    // Color swatch selection
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', function() {
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add to cart button
    document.getElementById('add-to-cart').addEventListener('click', function() {
        const productId = 1; // In a real app, this would come from the URL or data attribute
        const size = document.getElementById('size').value;
        const color = document.querySelector('.color-swatch.active').getAttribute('data-color');
        const quantity = parseInt(document.getElementById('quantity').value);
        
        addToCart(productId, quantity, size, color);
    });
}

/ Cart functions
function addToCart(productId, quantity = 1, size = 'M', color = 'black') {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => 
        item.id === productId && item.size === size && item.color === color
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            color,
            quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show confirmation message
    alert(`${quantity} ${product.name} added to cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('#cart-count').forEach(element => {
        element.textContent = totalItems;
    });
}