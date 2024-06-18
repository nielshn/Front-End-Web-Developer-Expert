import Swal from 'sweetalert2';
import FavoriteRestaurantDB from '../../data/favorite-restaurant';
import { createFavoriteRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  render() {
    return `
      <section class='favorites' id='favorites'>
        <div class='banner'>
          <h2>Favorite Restaurants</h2>
        </div>
        <div class='data-none-image d-none' id='data-none'>
          <picture>
            <source type="image/webp" media="(max-width: 600px)" srcset="./images/heros/data_none-small.webp">
            <source type="image/webp" srcset="./images/heros/data_none.webp">
            <source type="image/png" srcset="./images/heros/data_none.png">
            <img class="lazyload" data-src="./images/heros/data_none.png" alt="No Data">
          </picture>
        </div>
        <div class='explore-content container' id='favorite-list'>
          <div class='lds-ellipsis'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const spinner = document.querySelector('.lds-ellipsis');

    // Show loading spinner
    spinner.style.display = 'inline-block';

    await this.renderAllFavorite();

    // Hide loading spinner
    spinner.style.display = 'none';

    // Add event listeners
    this.setupEventListeners();
  },

  async renderAllFavorite() {
    const data = await FavoriteRestaurantDB.getAllRestaurants();
    const section = document.getElementById('favorites');
    const dataNone = document.getElementById('data-none');
    const favoriteList = document.getElementById('favorite-list');

    favoriteList.innerHTML = '';

    if (data.length < 1) {
      section.classList.add('vh-73');
      dataNone.classList.remove('d-none');
      favoriteList.classList.add('d-none');
    } else {
      section.classList.remove('vh-73');
      dataNone.classList.add('d-none');
      favoriteList.classList.remove('d-none');
      data.forEach((item) => {
        const favoriteContainer = document.createElement('div');
        favoriteContainer.innerHTML = createFavoriteRestaurantItemTemplate(item);
        favoriteList.appendChild(favoriteContainer);
      });
    }
  },

  setupEventListeners() {
    const btnFavDelete = document.querySelectorAll('.btn-favorite-delete');
    btnFavDelete.forEach((button) => {
      button.addEventListener('click', this.handleDeleteButtonClick);
    });
  },

  async handleDeleteButtonClick(e) {
    await FavoriteRestaurantDB.deleteRestaurant(e.target.id);
    await Swal.fire({
      title: 'Success!',
      text: 'This is a SweetAlert2 notification.',
      icon: 'success',
      confirmButtonText: 'Cool',
    });
    await Favorite.renderAllFavorite();
  },
};

export default Favorite;
