document.getElementById('navbar-toggle').addEventListener('click', function() {
    const links = document.getElementById('navbar-links');
    links.classList.toggle('active'); // Toggle the active class for the mobile menu
});

let currentIndex = 0; // Track the current image index
const slides = document.querySelectorAll('.slide'); // Select all slides
const totalSlides = slides.length; // Get the total number of slides

// Function to show the current slide with fade effect
function showSlide(index) {
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[index];

    // Ensure the current slide fades out and the next slide fades in
    currentSlide.classList.remove('active');
    currentSlide.style.opacity = '0'; // Fade out the current slide

    nextSlide.classList.add('active');
    nextSlide.style.opacity = '1'; // Fade in the next slide

    currentIndex = index; // Update the current index
}

// Function to handle the automatic transition
function nextSlide() {
    const nextIndex = (currentIndex + 1) % totalSlides; // Calculate the next slide index
    showSlide(nextIndex); // Show the next slide
}

// Initial setup: ensure all slides are hidden except the first
slides.forEach((slide, index) => {
    slide.style.transition = 'opacity 1s ease'; // Apply smooth fade transition
    slide.style.opacity = '0'; // Initially hide all slides
});
slides[currentIndex].style.opacity = '1'; // Show the first slide initially

// Automatic transition every 5 seconds
setInterval(nextSlide, 4000);
function goToCheckout(eventName, eventCost) {
    localStorage.setItem('selectedEvent', eventName); // Store the selected event name
    localStorage.setItem('eventCost', eventCost);   // Store the event cost (if needed)
    window.location.href = 'checkout.html';          // Redirect to the checkout page
}

// Apply animation when elements come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate'); // Add animation class when in view
        }
    });
});

const sr = ScrollReveal ({
    distance : '45px',
    duration : 2700,
    reset : true,
  })

// sr.reveal('.photo',{ delay:350, origin:'left' })
//  sr.reveal('.about-text',{ delay:350 })
//  sr.reveal('.about-image',{ delay:350, origin:'right' })
 // Simple fade-in effect with no movement
// Ensure the element just appears without movement
sr.reveal('.about-image', {
    delay: 350,         // Time before the animation starts
    duration: 500,     // Fade-in duration
    opacity: 0,         // Start fully transparent
    distance: '0px',    // No movement
    scale: 1,           // No scaling effect
    reset: false        // Avoid repeating the animation on scroll
});
sr.reveal('.about-image,.about-text,.service-box,.highlight,.pricing-card,#imgg,#ima,#ima1,#ima2', {
    delay: 350,         // Delay before the animation starts (in milliseconds)
    duration: 1000,     // Duration of the animation (in milliseconds)
    opacity: 0,         // Start with fully transparent
    distance: '0px',    // No movement
    easing: 'ease-in-out', // Smooth easing effect for a natural fade
    reset: false      // Prevent the animation from repeating on scroll
});
