
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const splash = document.getElementById('splashScreen');
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.5s ease';
        setTimeout(() => splash.style.display = 'none', 500);
    }, 400); 
});




// ================= CART & PRODUCTS FUNCTIONALITY =================
document.addEventListener('DOMContentLoaded', function () {

    // ================= CART FUNCTIONALITY =================
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCountElement = document.querySelector('.cart-icon span');

    cartIcon.addEventListener('click', function () {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });

    closeCart.addEventListener('click', function () {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', function () {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    // ================= LOCAL STORAGE FUNCTIONS =================
    function saveCartToStorage() {
        const items = [];
        document.querySelectorAll('.cart-item').forEach(item => {
            items.push({
                id: item.dataset.id,
                name: item.querySelector('h4').textContent,
                price: parseFloat(item.querySelector('p').dataset.price) || 0,
                img: item.querySelector('img').src,
                quantity: parseInt(item.querySelector('.quantity').textContent) || 1
            });
        });
        localStorage.setItem('cart', JSON.stringify(items));
    }

    function loadCartFromStorage() {
        const saved = localStorage.getItem('cart');
        if (!saved) return;

        const items = JSON.parse(saved);
        cartItemsContainer.innerHTML = "";

        items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = "cart-item";
            cartItem.dataset.id = item.id;

            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p data-price="${item.price}">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                        <button class="remove-item"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        updateCartTotal();
        updateCartCount();
    }

    // ================= CART ITEM FUNCTIONS =================
    function updateCartTotal() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('p').dataset.price) || 0;
            const quantity = parseInt(item.querySelector('.quantity').textContent) || 0;
            total += price * quantity;
        });

        const totalElement = document.querySelector('.cart-total span:last-child');
        if (totalElement) totalElement.textContent = '$' + total.toFixed(2);

        saveCartToStorage();
    }

    function updateCartCount() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            total += parseInt(item.querySelector('.quantity').textContent) || 0;
        });

        cartCountElement.textContent = total < 10 ? '0' + total : total;
        saveCartToStorage();
    }

    // ================= EVENT DELEGATION FOR CART ITEMS =================
    cartItemsContainer.addEventListener('click', function(e) {
        const target = e.target;

        // حذف المنتج
        if (target.closest('.remove-item')) {
            const cartItem = target.closest('.cart-item');
            if (cartItem) {
                cartItem.remove();
                updateCartTotal();
                updateCartCount();
            }
        }

        // نقص الكمية
        if (target.closest('.quantity-btn.minus')) {
            const q = target.nextElementSibling;
            let v = parseInt(q.textContent) || 1;
            if (v > 1) q.textContent = v - 1;
            updateCartTotal();
            updateCartCount();
        }

        // زيادة الكمية
        if (target.closest('.quantity-btn.plus')) {
            const q = target.previousElementSibling;
            q.textContent = (parseInt(q.textContent) || 0) + 1;
            updateCartTotal();
            updateCartCount();
        }
    });

    // ================= PRODUCTS SECTION =================
    const productsData = [
        { name: "Cream Chicken Chiladas", desc: "Delicious creamy chicken enchiladas with special sauce", img: './img/FoodBuzz - 11_30_2025 7-51-50 PM/02.jpg', price: 20 },
        { name: "Grilled Salmon", desc: "Fresh salmon grilled with herbs and lemon", img: "./img/FoodBuzz - 11_30_2025 7-51-50 PM/01.jpg", price: 25 },
        { name: "Beef Burger", desc: "Juicy beef burger with cheese and vegetables", img: "./img/FoodBuzz - 11_30_2025 7-51-50 PM/05.jpg", price: 15 },
        { name: "Caesar Salad", desc: "Fresh salad with Caesar dressing and croutons", img: "./img/FoodBuzz - 11_30_2025 7-51-50 PM/04.jpg", price: 12 },
        { name: "Pasta Carbonara", desc: "Creamy pasta with bacon and parmesan", img: "./img/FoodBuzz - 11_30_2025 7-51-50 PM/05.jpg", price: 18 },
        { name: "Vegetable Pizza", desc: "./img/FoodBuzz - 11_30_2025 7-51-50 PM/06.jpg", img: "./img/FoodBuzz - 11_30_2025 7-51-50 PM/06.jpg", price: 16 },
        { name: "Chocolate Cake", desc: "Rich chocolate cake with ganache", img: "./img/FoodBuzz - 11_30_2025 7-51-50 PM/08.jpg", price: 10 },
        { name: "Fruit Smoothie", desc: "Mixed fruit smoothie with yogurt", img: "./img/FoodBuzz - 11_30_2025 7-51-50 PM/07.jpg", price: 8 },
        { name: "BBQ Ribs", desc: "Tender ribs with BBQ sauce", img: "./img/FoodBuzz - 11_30_2025 7-51-50 PM/13.jpg", price: 22 },
        { name: "BBQ Ribs", desc: "Tender ribs with BBQ sauce", img: "./img/FoodBuzz - 11_30_2025 7-51-50 PM/02 (2).jpg", price: 22 }
    ];

    const productsContainer = document.getElementById('products');
    let itemsShown = 6;

    function displayProducts() {
        productsContainer.innerHTML = "";
        productsData.slice(0, itemsShown).forEach((p, index) => {
            productsContainer.innerHTML += `
                <div class="card" data-id="${index}">
                    <div class="img-box" style="position:relative;">
                        <div class="price-tag">$${p.price.toFixed(2)}</div>
                        <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/150?text=${encodeURIComponent(p.name)}'">
                    </div>
                    <div class="info">
                        <h3>${p.name}</h3>
                        <p data-price="${p.price}">${p.desc}</p>
                        <div class="stars">★★★★★</div>
                    </div>
                </div>
            `;
        });

        const productCards = document.querySelectorAll('.card');
        productCards.forEach(card => {
            card.addEventListener('click', function() {
                const productId = this.dataset.id;
                const product = productsData[productId];
                addToCart(product, productId);
            });
        });
    }

    function addToCart(product, productId) {
        const existingItem = Array.from(cartItemsContainer.children).find(item =>
            item.dataset.id === productId.toString()
        );

        if (existingItem) {
            const quantityElement = existingItem.querySelector('.quantity');
            quantityElement.textContent = (parseInt(quantityElement.textContent) || 0) + 1;
        } else {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.dataset.id = productId;

            cartItem.innerHTML = `
                <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/80?text=Product'">
                <div class="item-details">
                    <h4>${product.name}</h4>
                    <p data-price="${product.price}">$${product.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">1</span>
                        <button class="quantity-btn plus">+</button>
                        <button class="remove-item"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        }

        updateCartTotal();
        updateCartCount();
    }

    // ================= LOAD MORE =================
    window.loadMore = function() {
        itemsShown += 3;
        if(itemsShown >= productsData.length) {
            itemsShown = productsData.length;
            const loadButton = document.querySelector('.load-more button');
            if (loadButton) loadButton.style.display = 'none';
        }
        displayProducts();
    }

    // ==================== Scroll Arrow Logic ====================
const scrollArrow = document.getElementById('scrollArrow');
const triggerPoint = 300; // Point where arrow appears/disappears

// Smart function to control arrow appearance
function handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Very simple: show below 300px, hide above
    if (scrollPosition > triggerPoint) {
        scrollArrow.classList.add('show');
    } else {
        scrollArrow.classList.remove('show');
    }
    
    // Additional effect during fast scroll
    if (scrollPosition > triggerPoint + 100) {
        scrollArrow.style.transition = 'all 0.3s ease';
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Check on page load
window.addEventListener('load', () => {
    handleScroll(); // Immediate check
});

// When clicking the arrow - scroll to top
scrollArrow.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Click effect
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
    
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Arrow will disappear automatically because we're above 300px
});

// Hover effects
scrollArrow.addEventListener('mouseenter', function() {
    if (this.classList.contains('show')) {
        this.style.transform = 'scale(1.15)';
    }
});

scrollArrow.addEventListener('mouseleave', function() {
    if (this.classList.contains('show')) {
        this.style.transform = 'scale(1)';
    }
});
    // ================= INITIALIZE =================
    displayProducts();
    loadCartFromStorage();

});

