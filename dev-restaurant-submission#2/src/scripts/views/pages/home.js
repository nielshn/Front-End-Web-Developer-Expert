import TheRestaurantDbSource from "../../data/therestodb-source";
import { createRestaurantItemTemplate } from "../templates/template-creator";


const Home = {
  async render() {
    return `
    <!-- Hero -->
    <div class="hero-carousel">
      <!-- Hero slides will be inserted here dynamically -->
    </div>
    <div id="restaurant-list" class="restaurant-list"></div>
    `;
  },

  async afterRender() {
    this.renderRestaurantList();

    this.initHeroCarousel();
  },

  async renderRestaurantList() {
    try {

      const restaurants = await TheRestaurantDbSource.listRestaurant();
      const restaurantList = document.getElementById('restaurant-list');
      restaurants.forEach(restaurant => {
        restaurantList.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  },

  initHeroCarousel() {
    const heroCarousel = document.querySelector('.hero-carousel');
    const heroImages = [
      { src: "./images/heros/hero-image_1.webp", alt: "Hero Image 1" },
      { src: "./images/heros/hero-image_2.jpg", alt: "Hero Image 2" },
      { src: "./images/heros/hero-image_3.jpg", alt: "Hero Image 3" },
      { src: "./images/heros/hero-image_4.jpg", alt: "Hero Image 4" }
    ];

    let currentSlide = 0;

    const nextSlide = () => {
      heroSlides[currentSlide].style.display = 'none';
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].style.display = 'block';
    };

    const heroSlides = heroImages.map(image => {
      const slide = document.createElement('img');
      slide.src = image.src;
      slide.alt = image.alt;
      slide.classList.add('hero-slide');
      slide.loading = 'lazy';
      heroCarousel.appendChild(slide);
      return slide;
    });

    heroSlides[currentSlide].style.display = 'block';
    setInterval(nextSlide, 5000);
  },
};

export default Home;
