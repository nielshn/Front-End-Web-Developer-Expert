import Swal from "sweetalert2";
import UrlParser from "../../routes/url-parser";
import { createRestaurantDetailTemplate } from "../templates/template-creator";
import TheRestaurantDbSource from "../../data/therestodb-source";
import LikeButtonInitiator from "../../utils/like-button-initiator";

const Detail = {
  async render() {
    return `
      <div id="detail-container"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detailContainer = document.getElementById('detail-container');

    try {
      const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);

      detailContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      LikeButtonInitiator.init({
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  },
};

export default Detail;
