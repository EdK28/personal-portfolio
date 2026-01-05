// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(link => {                            // Select every nav link and loops through each
    link.addEventListener('click', function(e) {                                // Runs when naviagtion button is clicked
        e.preventDefault();                                                     // Prevents browser default jump
        const target = document.querySelector(this.getAttribute('href'));       // Reads link and find matching section
        target.scrollIntoView({ behavior: 'smooth' });                          // Scrolls page smoothly to target section
    });
});


// Animate introduction fade-in when user enters intro section
const bodySection = document.querySelector('#BODY');        // Selects body section with ID

const observer = new IntersectionObserver(
    ([entry]) => {
        if (entry.isIntersecting) {
            bodySection.classList.remove('animate');        // Reset
            void bodySection.offsetWidth;                   // *KEY* - Force reset animation (makes browser forget)
            bodySection.classList.add('animate');           // Replay
        } else {
            bodySection.classList.remove('animate');        // Reset on exit
        }
    },
    {
        threshold: 0.4                                      // Runs when 40% of section is visible
    }
);

observer.observe(bodySection);

// Architecture fade in animation
const servicesSection = document.querySelector('.SERVICES');                // Declare variable for the class section
const serviceCards = document.querySelectorAll('.SERVICES .fade-in');       // Declares variable for specified classes

const servicesObserver = new IntersectionObserver(                          // Checks if user enter/leaves viewport
    ([entry], obs) => {                                                     
        if (entry.isIntersecting) {                                         // If section enters viewport
            servicesSection.classList.add('animate');                       // Adds fsde-in animation
            serviceCards.forEach((card, index) => {                         // Loops through each card
                setTimeout(() => {                                          // Small delay
                    card.classList.add('visible');
                }, 200 * index);                                            // 200ms after first card
            });
            obs.unobserve(servicesSection);                                 // Animation only replays once
        }
    },
    { threshold: 0.2 }                                                      // When 20% section is visible
);

servicesObserver.observe(servicesSection);

// NAVIGATION FOR PROJECT
document.addEventListener("DOMContentLoaded", () => {               // Ensures HTML is fully loaded before function runs (if JS is seperate)
    let currentSlide = 0;                                           // Stores index of current active slide
    const slides = document.querySelectorAll(".slide");             // Selects all elements with class .slide

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));  // Hides all other slides

        if (index >= slides.length) currentSlide = 0;               // If index goes past last slide, reset to first
        if (index < 0) currentSlide = slides.length - 1;            // If index goes before first slide, go to last slide

        slides[currentSlide].classList.add("active");               // Shows current slide by adding active class
    }

    function changeSlide(direction) {                               
        currentSlide += direction;                                  // Changes slide direction
        showSlide(currentSlide);                                    // Updates current slide and displays current slide
    }

    // Connects navigation buttons
    window.changeSlide = changeSlide;                               

    // AUTO SLIDE
    setInterval(() => {                                             
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);                                                       // Sets auto slideshow (1000ms = 1s)

    // Show first slide
    showSlide(currentSlide);
});

document.querySelectorAll(".slide").length



// SCROLL REVEAL FOR CONTACT SECTION
const endSection = document.querySelector('.END');                 // Selects element with class END

const observers = new IntersectionObserver(entries => {            // Enters the viewport
    entries.forEach(entry => {
        if (entry.isIntersecting) {                                // Runs when section enters viewport
            endSection.classList.add('show');                       
        }
    });
}, { threshold: 0.6 });                                            // Runs when 60% of section is visible

observers.observe(endSection);                                     // Runs function



// FAKE SUBMIT ANIMATION
const form = document.querySelector('.DETAILSS');                   // Declares variable for form
const btn = document.querySelector('.btn2');                        // Declares variable for submit button
const msg = document.getElementById('successMsg');                  // Declares variable for success message

form.addEventListener('submit', e => {                              // Runs when user clicks submit
    e.preventDefault();                                             // Prevents browser from reloading

    btn.textContent = 'Sending...';                                 // Changes button text to show progress
    btn.disabled = true;                                            // Disables button to prevent multiple submissions

    setTimeout(() => {                                              // Sets 1.5s wait time (mimics real wait-time)
        btn.textContent = 'Submit';                                 
        btn.disabled = false;                                       // Restores button to initial state
        msg.style.opacity = '1';                                    // Displays success message
        form.reset();                                               // Clears all input fields
    }, 1500);
});


// SCROLL TO TOP BUTTON SMOOTH TRANSITION
const scrollBtn = document.getElementById('scrollTopBtn');                                          // Declares variable - button hidden by default by CSS


// Show button after scrolling down
window.addEventListener('scroll', () => {                                                           // Runs as the user scrolls
    scrollBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';                               // Checks how far user has scrolled - >300px button shows, <300px button hides, flex to align with flexbox
});

// Scroll smoothly to top
scrollBtn.addEventListener('click', () => {                                                         // Runs when user clicks button
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;     // Checks user accessibility settings for reduced motion

    window.scrollTo({
        top: 0,                                                                                     // Scrolls page to the top
        behavior: prefersReducedMotion ? 'auto' : 'smooth'                                          // Smooth scrolling by default, auto if reduced motion enabled
    });
});