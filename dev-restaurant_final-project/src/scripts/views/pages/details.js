import Swal from 'sweetalert2';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import TheRestaurantDbSource from '../../data/therestodb-source';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="detail-container">
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detailContainer = document.getElementById('detail-container');
    const spinner = document.querySelector('.lds-ellipsis');

    try {
      // Show loading spinner
      spinner.style.display = 'inline-block';

      const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);

      // Hide loading spinner
      spinner.style.display = 'none';

      detailContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      await LikeButtonInitiator.init({
        likeButtonContainer: document.getElementById('likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          rating: restaurant.rating,
          description: restaurant.description,
        },
      });
    } catch (error) {
      console.error('Error:', error);

      // Hide loading spinner in case of error
      spinner.style.display = 'none';

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  },
};

export default Detail;
