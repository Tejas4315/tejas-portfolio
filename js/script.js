// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links based on current page
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// Fade-in animation for elements when they come into view
const fadeInElements = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

fadeInElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Add year to copyright text
const yearElement = document.querySelector('.year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Form validation for contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            valid = false;
        } else {
            removeError(name);
        }
        
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            valid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            valid = false;
        } else {
            removeError(email);
        }
        
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            valid = false;
        } else {
            removeError(message);
        }
        
        if (valid) {
            // In a real application, you would send the form data to a server
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        }
    });
}

function showError(input, message) {
    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
    
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    if (!formControl.querySelector('.error-message')) {
        formControl.appendChild(errorElement);
    }
    
    formControl.className = 'form-control error';
}

function removeError(input) {
    const formControl = input.parentElement;
    const errorElement = formControl.querySelector('.error-message');
    
    if (errorElement) {
        formControl.removeChild(errorElement);
    }
    
    formControl.className = 'form-control';
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Visit Counter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const visitCountElement = document.getElementById('visit-count');
    const resetCounterButton = document.getElementById('reset-counter');
    
    if (visitCountElement && resetCounterButton) {
        // Initialize or get the visit count from localStorage
        let visitCount = localStorage.getItem('visitCount');
        
        // If no visit count exists, initialize it to 1
        if (!visitCount) {
            visitCount = 1;
            localStorage.setItem('visitCount', visitCount);
        } else {
            // Increment the visit count if it exists
            visitCount = parseInt(visitCount) + 1;
            localStorage.setItem('visitCount', visitCount);
        }
        
        // Update the visit count display
        visitCountElement.textContent = visitCount;
        
        // Add event listener for the reset button
        resetCounterButton.addEventListener('click', function() {
            // Reset the visit count to 1
            localStorage.setItem('visitCount', 1);
            visitCountElement.textContent = 1;
            
            // Add a visual feedback for reset
            resetCounterButton.textContent = 'Counter Reset!';
            setTimeout(() => {
                resetCounterButton.textContent = 'Reset Counter';
            }, 2000);
        });
    }
}); 

