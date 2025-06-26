document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    setupCartEvents();
    
    // Update cart count
    updateCartCount();
});

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const orderItemsContainer = document.querySelector('.order-items');
    const subtotalElement = document.querySelector('.cart-summary .summary-row:nth-child(1) span:last-child');
    const shippingElement = document.querySelector('.cart-summary .summary-row:nth-child(2) span:last-child');
    const taxElement = document.querySelector('.cart-summary .summary-row:nth-child(3) span:last-child');
    const totalElement = document.querySelector('.cart-summary .summary-row.total span:last-child');
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    if (orderItemsContainer) orderItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        if (orderItemsContainer) orderItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        
        // Set all amounts to 0
        if (subtotalElement) subtotalElement.textContent = '$0.00';
        if (shippingElement) shippingElement.textContent = '$0.00';
        if (taxElement) taxElement.textContent = '$0.00';
        if (totalElement) totalElement.textContent = '$0.00';
        
        return;
    }
    
    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99
