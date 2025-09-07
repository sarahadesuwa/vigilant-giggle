const menuOpenButton = document.querySelector('#menu-open-button');
const menuCloseButton = document.querySelector('#menu-close-button');

menuOpenButton.addEventListener('click', () => {
    // Toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

// Close the mobile menu when the close button is clicked
menuCloseButton.addEventListener('click', () => menuOpenButton.click());

// Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  //Responsive breakpoint
  breakpoint: {
    0: {
        sliderPerView: 1
    },
        768: {
        sliderPerView: 2
    },
        1024: {
        sliderPerView: 3
    }
  }
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitButton = contactForm.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const loadingText = submitButton.querySelector('.loading-text');

    // Initialize EmailJS (you need to replace with your actual EmailJS user ID)
    emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your EmailJS user ID

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Show loading state
        buttonText.style.display = 'none';
        loadingText.style.display = 'inline';
        submitButton.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message'),
            to_name: 'Coffee Shop Team'
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                errorMessage.style.display = 'block';
                
                // Scroll to error message
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .finally(function() {
                // Reset button state
                buttonText.style.display = 'inline';
                loadingText.style.display = 'none';
                submitButton.disabled = false;
            });
    });

    // Form validation
    const inputs = contactForm.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Validate based on field type
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
        } else if (field.required && !value) {
            showFieldError(field, 'This field is required');
        }
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#f44336';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '5px';
        
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }

    function clearFieldError(e) {
        const field = e.target;
        field.classList.remove('error');
        
        const errorMessage = field.parentNode.querySelector('.field-error');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
