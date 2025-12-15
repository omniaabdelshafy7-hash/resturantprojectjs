// ==================== إضافة منتج للسلة ====================
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === product.id);
    if(existingProduct){
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// ==================== تحديث عرض السلة ====================
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // مسح الموجود

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn minus"><i class="fa-solid fa-minus"></i></button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus"><i class="fa-solid fa-plus"></i></button>
                    <button class="remove-item"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartTotal();
    updateCartCount();
}

// ==================== تحديث المجموع ====================
// ==================== تحديث المجموع ====================
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // البحث عن جميع عناصر الـ total في الصفحة
    const totalElements = document.querySelectorAll('.cart-total span:last-child');
    
    // تحديث جميع عناصر الـ total الموجودة
    totalElements.forEach(element => {
        element.textContent = `$${total.toFixed(2)}`;
    });
}
// ==================== تحديث عدد المنتجات في أيقونة السلة ====================
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('#cartIcon span').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ==================== تفعيل عرض السلة ====================
document.getElementById('cartIcon').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
});

document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
});

// ==================== تحديث السلة عند تحميل الصفحة ====================
window.addEventListener('load', updateCartDisplay);
