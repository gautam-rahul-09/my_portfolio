// EmailJS Configuration
// Replace these with your actual EmailJS credentials

const EMAILJS_CONFIG = {
    PUBLIC_KEY: "3juwsxcMtOC58LZny", // Replace with your EmailJS public key
    SERVICE_ID: "service_o8s8jzw", // Replace with your EmailJS service ID
    TEMPLATE_ID: "template_pm9vr2r" // Replace with your EmailJS template ID
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

// Enhanced contact form handler with better error handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateContactForm()) {
                return;
            }
            
            // Show loading state
            setFormLoading(true);
            
            // Get form data
            const formData = new FormData(contactForm);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                to_email: 'gautamrahul2905@gmail.com',
                reply_to: formData.get('email')
            };
            
            try {
                // Send email using EmailJS
                const response = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams
                );
                
                console.log('Email sent successfully:', response);
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                clearFormValidation();
                
            } catch (error) {
                console.error('Error sending email:', error);
                
                // Show error message with fallback options
                showNotification(
                    'Failed to send message. Please try again or contact me directly at gautamrahul2905@gmail.com', 
                    'error'
                );
            } finally {
                // Remove loading state
                setFormLoading(false);
            }
        });
    }
});

// Form validation function
function validateContactForm() {
    const form = document.getElementById('contactForm');
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');
    
    let isValid = true;
    
    // Clear previous validation
    clearFormValidation();
    
    // Name validation
    if (!name.value.trim()) {
        showFieldError(name, 'Name is required');
        isValid = false;
    }
    
    // Email validation
    if (!email.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Subject validation
    if (!subject.value.trim()) {
        showFieldError(subject, 'Subject is required');
        isValid = false;
    }
    
    // Message validation
    if (!message.value.trim()) {
        showFieldError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        animation: fadeInUp 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorElement);
}

// Clear form validation
function clearFormValidation() {
    const form = document.getElementById('contactForm');
    const fields = form.querySelectorAll('input, textarea');
    const errors = form.querySelectorAll('.field-error');
    
    fields.forEach(field => {
        field.style.borderColor = 'var(--border-color)';
    });
    
    errors.forEach(error => {
        error.remove();
    });
}

// Set form loading state
function setFormLoading(loading) {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (loading) {
        form.classList.add('loading');
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
    } else {
        form.classList.remove('loading');
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set notification content
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Set notification styles
    const bgColor = type === 'success' ? 'rgba(34, 197, 94, 0.95)' : 
                    type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 
                    'rgba(59, 130, 246, 0.95)';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Style notification content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.2s ease;
        margin-left: auto;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}

// Fallback for when EmailJS is not available
window.addEventListener('error', function(e) {
    if (e.message.includes('emailjs')) {
        console.warn('EmailJS not loaded. Contact form will show fallback message.');
        
        // Override form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification(
                    'Email service is currently unavailable. Please contact me directly at gautamrahul2905@gmail.com or call +91 9304288986',
                    'error',
                    10000
                );
            });
        }
    }
});

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        const fields = form.querySelectorAll('input, textarea');
        
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                // Clear previous error for this field
                const existingError = field.parentNode.querySelector('.field-error');
                if (existingError) {
                    existingError.remove();
                }
                field.style.borderColor = 'var(--border-color)';
                
                // Validate individual field
                if (field.hasAttribute('required') && !field.value.trim()) {
                    showFieldError(field, `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`);
                } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
                    showFieldError(field, 'Please enter a valid email address');
                }
            });
            
            field.addEventListener('input', function() {
                // Clear error on input
                const existingError = field.parentNode.querySelector('.field-error');
                if (existingError) {
                    existingError.remove();
                }
                field.style.borderColor = 'var(--border-color)';
            });
        });
    }
});