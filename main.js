
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const splash = document.getElementById('splashScreen');
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.5s ease';
        setTimeout(() => splash.style.display = 'none', 500);
    }, 400); 
});


//  Dark/Light Mode 
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');
    const modeToggle = document.getElementById('modeToggle');
    const cartItemsContainer = document.querySelector('.cart-items');

    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        if(document.body.classList.contains('dark')){
            modeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            modeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });




    //  Cart Sidebar 
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });

    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    //   Cart Items 
    cartItemsContainer.addEventListener('click', function(e) {
        const target = e.target;

        // Remove product
        if (target.closest('.remove-item')) {
            const cartItem = target.closest('.cart-item');
            if (cartItem) {
                cartItem.remove();
                updateCartTotal();
                updateCartCount();
            }
        }

        // Decrease quantity
        if (target.closest('.quantity-btn.minus')) {
            const q = target.closest('.quantity-controls').querySelector('.quantity');
            let v = parseInt(q.textContent) || 1;
            if (v > 1) {
                q.textContent = v - 1;
            } else {
                target.closest('.cart-item').remove();
            }
            updateCartTotal();
            updateCartCount();
        }

        // Increase quantity
        if (target.closest('.quantity-btn.plus')) {
            const q = target.closest('.quantity-controls').querySelector('.quantity');
            q.textContent = (parseInt(q.textContent) || 0) + 1;
            updateCartTotal();
            updateCartCount();
        }
    });

    //  Cart Functions 
    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;
        cartItems.forEach(item => {
            const priceText = item.querySelector('.item-details p').textContent;
            const price = parseFloat(priceText.replace('$','').trim());
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            total += price * quantity;
        });
        const totalElement = document.querySelector('.cart-total span:last-child');
        if(totalElement) totalElement.textContent = '$' + total.toFixed(2);
    }

    function updateCartCount() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalItems = 0;
        cartItems.forEach(item => {
            totalItems += parseInt(item.querySelector('.quantity').textContent);
        });
        const countElement = document.querySelector('#cartIcon span');
        if(countElement) countElement.textContent = totalItems;
    }

    //  Initialize Cart 
    updateCartTotal();
    updateCartCount();

//   Slick Slider with Hover Pause 
    $(document).ready(function(){
        $('.slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 3000, 
            pauseOnHover: true,
            pauseOnFocus: false,
            rtl: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: true,
                        dots: true
                    }
                }
            ]
        });
    });
});



//  Time & Date 
document.addEventListener('DOMContentLoaded', function() {
    
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const periodElement = document.getElementById('period');
    const dayElement = document.getElementById('day');
    const monthElement = document.getElementById('month');
    const yearElement = document.getElementById('year');
    const weekdayElement = document.getElementById('weekday');
    const timezoneElement = document.getElementById('timezone');
    
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday", 
        "Thursday", "Friday", "Saturday"
    ];
    
    let timezoneOffset = 2; 
    
    function formatTimeNumber(num) {
        return num < 10 ? '0' + num : num;
    }
    
    //  update time and date
    function updateDateTime() {
        const now = new Date();
        
        // Adjust time 
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const localTime = new Date(utcTime + (timezoneOffset * 3600000));
        
        // Get time
        let hours = localTime.getHours();
        const minutes = localTime.getMinutes();
        const seconds = localTime.getSeconds();
        
        // Convert to 12-hour format and determine AM/PM
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        
        // Update time elements
        hoursElement.textContent = formatTimeNumber(hours);
        minutesElement.textContent = formatTimeNumber(minutes);
        secondsElement.textContent = formatTimeNumber(seconds);
        periodElement.textContent = period;
        
        // Add effect when seconds change
        secondsElement.style.animation = 'none';
        setTimeout(() => {
            secondsElement.style.animation = 'pulse 2s infinite';
        }, 10);
        
        // Update date
        const day = localTime.getDate();
        const month = localTime.getMonth();
        const year = localTime.getFullYear();
        const weekday = dayNames[localTime.getDay()];
        
        // Update date elements
        dayElement.textContent = formatTimeNumber(day);
        monthElement.textContent = formatTimeNumber(month + 1); 
        yearElement.textContent = year;
        weekdayElement.textContent = weekday;
        
        // Add month name
        updateMonthName(month);
        
        // Update timezone
        timezoneElement.textContent = `Egypt Time (GMT+2)`;
        
        // Update background color based on time of day
        updateBackgroundByTime(localTime.getHours(), period);
    }
    
    // Function to add month name
    function updateMonthName(monthIndex) {
        // Find or create month name element
        let monthNameElement = document.getElementById('month-name');
        if (!monthNameElement) {
            monthNameElement = document.createElement('div');
            monthNameElement.id = 'month-name';
            monthNameElement.className = 'month-name-text';
            document.querySelector('.date-display').appendChild(monthNameElement);
        }
        monthNameElement.textContent = monthNames[monthIndex];
    }
    
    // Function to update background based on time
    function updateBackgroundByTime(hours, period) {
        const timeSection = document.querySelector('.time-section');
        const dateSection = document.querySelector('.date-section');
        
        // Remove all colors
        timeSection.classList.remove('morning-time', 'afternoon-time', 'evening-time', 'night-time');
        dateSection.classList.remove('morning-date', 'afternoon-date', 'evening-date', 'night-date');
        
        // Determine time of day
        if (hours >= 5 && hours < 12) {
            // Morning (5 AM - 12 PM)
            timeSection.classList.add('morning-time');
            dateSection.classList.add('morning-date');
        } else if (hours >= 12 && hours < 17) {
            // Afternoon (12 PM - 5 PM)
            timeSection.classList.add('afternoon-time');
            dateSection.classList.add('afternoon-date');
        } else if (hours >= 17 && hours < 21) {
            // Evening (5 PM - 9 PM)
            timeSection.classList.add('evening-time');
            dateSection.classList.add('evening-date');
        } else {
            // Night (9 PM - 5 AM)
            timeSection.classList.add('night-time');
            dateSection.classList.add('night-date');
        }
    }
    
    // Function to update restaurant info
    function updateRestaurantInfo() {
        const infoItems = document.querySelectorAll('.info-text');
        const now = new Date();
        const hours = now.getHours();
        
        // Update restaurant status (Open/Closed)
        const isOpen = hours >= 9 && hours < 22; // From 9 AM to 10 PM
        infoItems[0].textContent = isOpen ? 'Restaurant Open' : 'Restaurant Closed';
        
        // Update available tables count (random)
        const availableTables = Math.floor(Math.random() * 15) + 5;
        infoItems[1].textContent = `${availableTables} Tables Available`;
        
        // Update next reservation time
        const nextReservationHours = (hours + 1) % 24;
        const period = nextReservationHours >= 12 ? 'PM' : 'AM';
        const displayHours = nextReservationHours % 12 || 12;
        infoItems[2].textContent = `Next Reservation: ${displayHours}:00 ${period}`;
    }
    
    // Add CSS for time-based backgrounds
    const style = document.createElement('style');
    style.textContent = `
        .morning-time { background: linear-gradient(135deg, rgba(255, 223, 186, 0.1) 0%, rgba(255, 240, 220, 0.1) 100%); }
        .morning-date { background: linear-gradient(135deg, rgba(255, 240, 220, 0.1) 0%, rgba(255, 223, 186, 0.1) 100%); }
        
        .afternoon-time { background: linear-gradient(135deg, rgba(255, 248, 220, 0.1) 0%, rgba(255, 241, 186, 0.1) 100%); }
        .afternoon-date { background: linear-gradient(135deg, rgba(255, 241, 186, 0.1) 0%, rgba(255, 248, 220, 0.1) 100%); }
        
        .evening-time { background: linear-gradient(135deg, rgba(255, 224, 224, 0.1) 0%, rgba(255, 200, 200, 0.1) 100%); }
        .evening-date { background: linear-gradient(135deg, rgba(255, 200, 200, 0.1) 0%, rgba(255, 224, 224, 0.1) 100%); }
        
        .night-time { background: linear-gradient(135deg, rgba(186, 200, 255, 0.1) 0%, rgba(220, 224, 255, 0.1) 100%); }
        .night-date { background: linear-gradient(135deg, rgba(220, 224, 255, 0.1) 0%, rgba(186, 200, 255, 0.1) 100%); }
        
        .time-number, .date-number { transition: all 0.3s ease; }
        
        .month-name-text {
            font-size: 1.2rem;
            color: var(--yellowcolor1);
            font-family: var(--font2);
            margin-top: 10px;
            text-align: center;
        }
    `;
    document.head.appendChild(style);
    
    // Update every second
    setInterval(updateDateTime, 1000);
    
    // Update restaurant info every 30 seconds
    setInterval(updateRestaurantInfo, 30000);
    
    // Initial setup
    updateDateTime();
    updateRestaurantInfo();
});




//  JavaScript for Food Gallery Overlay 
document.addEventListener('DOMContentLoaded', function() {
    // Initialize WOW.js
    if (typeof WOW === 'function') {
        new WOW({
            boxClass: 'wow',
            animateClass: 'animate__animated',
            offset: 0,
            mobile: true,
            live: true,
            scrollContainer: null,
            resetAnimation: true
        }).init();
    }

    // Add hover effects for food items only (without click)
    addFoodItemHoverEffects();
});

// Function to add hover effects only
function addFoodItemHoverEffects() {
    const foodItems = document.querySelectorAll('.food-item');
    
    foodItems.forEach(item => {
        // Hover effect only
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.food-image img');
            const overlay = this.querySelector('.food-overlay');
            
            image.style.transform = 'scale(1.1)';
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
            
            // Pause pulse animation temporarily
            this.style.animationPlayState = 'paused';
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.food-image img');
            const overlay = this.querySelector('.food-overlay');
            
            image.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(10px)';
            
            // Resume pulse animation
            this.style.animationPlayState = 'running';
        });
        
        // Remove click event completely or make it inactive
        item.style.cursor = 'default'; // Change cursor shape
        item.removeAttribute('onclick'); // Remove any old event listener
    });
}

// Solve animation repetition issue on scroll
function setupScrollReset() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                resetAnimationsOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function resetAnimationsOnScroll() {
    const gallerySection = document.querySelector('.food-gallery-overlay');
    if (!gallerySection) return;
    
    const sectionTop = gallerySection.offsetTop;
    const sectionBottom = sectionTop + gallerySection.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowBottom = scrollTop + window.innerHeight;
    
    // If we exit the section area
    if (windowBottom < sectionTop || scrollTop > sectionBottom) {
        const foodItems = document.querySelectorAll('.food-item');
        foodItems.forEach(item => {
            item.classList.remove('wow', 'animate__animated', 'animate__zoomIn');
            void item.offsetWidth; // Reflow
            item.classList.add('wow', 'animate__animated', 'animate__zoomIn');
        });
        
        // Reinitialize WOW.js
        if (typeof WOW === 'function') {
            new WOW().init();
        }
    }
}

// Run scroll issue solution
setupScrollReset();

//  Scroll Arrow Logic
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