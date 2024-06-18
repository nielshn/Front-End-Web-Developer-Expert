import TheRestaurantDbSource from '../../data/therestodb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <!-- Hero -->
      <div class="hero-carousel">
        <!-- Hero slides will be inserted here dynamically -->
      </div>
      <div id="restaurant-list" class="restaurant-list">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    await this.renderRestaurantList();
    this.initHeroCarousel();

    // Focus on the restaurant list section after rendering
    const restaurantListSection = document.getElementById('restaurant-list');
    restaurantListSection.focus();
  },

  async renderRestaurantList() {
    try {
      // Show loading spinner
      const restaurantList = document.getElementById('restaurant-list');
      const spinner = document.querySelector('.lds-ellipsis');
      spinner.style.display = 'inline-block';

      const restaurants = await TheRestaurantDbSource.listRestaurant();

      // Hide loading spinner
      spinner.style.display = 'none';

      // Render restaurant list
      restaurants.forEach((restaurant) => {
        restaurantList.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching restaurant data:', error);
      }
      // Hide loading spinner in case of error
      const spinner = document.querySelector('.lds-ellipsis');
      spinner.style.display = 'none';
    }
  },

  initHeroCarousel() {
    const heroCarousel = document.querySelector('.hero-carousel');
    const heroImages = [
      { src: './images/heros/hero-image_1', alt: 'Hero Image 1' },
      { src: './images/heros/hero-image_2', alt: 'Hero Image 2' },
      { src: './images/heros/hero-image_3', alt: 'Hero Image 3' },
      { src: './images/heros/hero-image_4', alt: 'Hero Image 4' },
    ];

    let currentSlide = 0;

    const heroSlides = heroImages.map((image) => {
      const picture = document.createElement('picture');
      picture.innerHTML = `
        <source media="(max-width: 600px)" srcset="${image.src}-small.jpg">
        <img class="lazyload" data-src="${image.src}-large.jpg" alt="${image.alt}" class="hero-slide">
      `;
      heroCarousel.appendChild(picture);
      return picture;
    });
    const nextSlide = () => {
      heroSlides[currentSlide].style.display = 'none';
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].style.display = 'block';
    };

    heroSlides[currentSlide].style.display = 'block';
    setInterval(nextSlide, 5000);
  },
};

export default Home;
