import DATA from '../public/data/DATA.json'
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle("active");
        setTimeout(() => {
            navMenu.classList.toggle("active");
        }, 100)

    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        setTimeout(() => {
            navMenu.classList.remove("active");

        }, 100)
    }))

    // Fetch and display hero images
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    // Function to display next slide
    const nextSlide = () => {
        // Hide current slide
        heroSlides[currentSlide].style.display = 'none';
        // Move to next slide
        currentSlide = (currentSlide + 1) % heroSlides.length;
        // Show next slide
        heroSlides[currentSlide].style.display = 'block';
    };

    // Initial setup: show first slide and start interval
    heroSlides[currentSlide].style.display = 'block';
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Fetch and display restoran list from data.json
    const restaurantList = document.getElementById('restaurant-list');
    const getRestaurant = (data, restaurantList) => {
        data.restaurants.forEach(restaurant => {
            restaurantList.innerHTML += `
            <article tabindex="0" class="card">
                <div class="card-img-container">
                    <span class="card-place">${restaurant.city}</span>
                    <img class="card-image" alt="${restaurant.name}" src="${restaurant.pictureId}"/>
                    <span class="card-rating">
                        <i title="ratings"></i>
                        &starf; <span>${restaurant.rating}</span>
                    </span>
                </div>
                <div class="card-content">
                    <p class="card-content-title">${restaurant.name}</p>
                    <p class="card-content-description">${restaurant.description}</p>
                </div>
            </article>
            `;
        })
    }
    getRestaurant(DATA, restaurantList);
});
