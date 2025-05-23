// Teddy's Transparent Windows - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky navbar on scroll
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const heroSection = document.getElementById('home');
    
    function toggleStickyNav() {
        if (window.scrollY > (heroSection ? heroSection.offsetTop + 100 : 100)) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }
    
    if (navbar && heroSection) {
        window.addEventListener('scroll', toggleStickyNav);
    }
    
    // Testimonial carousel - now continuous scrolling, no manual controls needed
    // The CSS animation handles the continuous movement
    
    // Before/After image comparison sliders
    function initComparisons() {
        const sliders = document.querySelectorAll('.img-comp-container');
        
        sliders.forEach(slider => {
            // Create slider handle if it doesn't exist
            if (!slider.querySelector('.img-comp-slider')) {
                const sliderHandle = document.createElement('div');
                sliderHandle.className = 'img-comp-slider';
                slider.appendChild(sliderHandle);
                
                // Set initial position (50%)
                const beforeImage = slider.querySelector('.img-comp-before');
                beforeImage.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
                sliderHandle.style.left = '50%';
                
                // Add mouse and touch events
                sliderHandle.addEventListener('mousedown', startDragging);
                sliderHandle.addEventListener('touchstart', startDragging, { passive: true });
            }
        });
        
        function startDragging(e) {
            e.preventDefault();
            
            // Get the current slider container
            const slider = e.target.closest('.img-comp-container');
            const beforeImage = slider.querySelector('.img-comp-before');
            const sliderHandle = slider.querySelector('.img-comp-slider');
            
            // Event handlers for drag and release
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('mouseup', stopDragging);
            document.addEventListener('touchend', stopDragging);
            
            function drag(e) {
                // Get position
                const rect = slider.getBoundingClientRect();
                const containerWidth = rect.width;
                
                // Calculate x position within the container
                let x = 0;
                if (e.type === 'touchmove') {
                    x = e.touches[0].clientX - rect.left;
                } else {
                    x = e.clientX - rect.left;
                }
                
                // Constrain x within the container
                x = Math.max(0, Math.min(x, containerWidth));
                
                // Calculate percentage
                const percentage = (x / containerWidth) * 100;
                
                // Update clip path and slider position
                beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
                sliderHandle.style.left = `${percentage}%`;
            }
            
            function stopDragging() {
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', drag);
                document.removeEventListener('mouseup', stopDragging);
                document.removeEventListener('touchend', stopDragging);
            }
        }
    }
    
    // Initialize before/after sliders
    initComparisons();
    
    // Form submission handling
    const heroForm = document.getElementById('hero-quote-form');
    const contactForm = document.getElementById('contact-form');
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(e.target);
        const formObject = {};
        
        formData.forEach((value, key) => {
            // Handle multiple checkboxes (services[])
            if (key.endsWith('[]')) {
                const cleanKey = key.substring(0, key.length - 2);
                if (!formObject[cleanKey]) {
                    formObject[cleanKey] = [];
                }
                formObject[cleanKey].push(value);
            } else {
                formObject[key] = value;
            }
        });
        
        // Demo: Log form data to console (replace with actual form submission)
        console.log('Form submission:', formObject);
        
        // Show success message
        const formContainer = e.target.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Thank you for your request!</h3>
            <p>We've received your information and will be in touch within one business hour.</p>
        `;
        
        // Replace form with success message
        formContainer.innerHTML = '';
        formContainer.appendChild(successMessage);
        
        // In a real implementation, you would send the data to a server here
        // fetch('/api/submit-quote', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formObject),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Handle successful submission
        // })
        // .catch(error => {
        //     // Handle error
        // });
    }
    
    // Add submit event listeners to forms
    if (heroForm) {
        heroForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}); 