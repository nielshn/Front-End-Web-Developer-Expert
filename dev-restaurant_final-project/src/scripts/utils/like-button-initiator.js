import FavoriteRestaurantDB from '../data/favorite-restaurant';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this.likeButtonContainer = likeButtonContainer;
    this.restaurant = restaurant;
    await this.renderButton();
  },

  async renderButton() {
    const { id } = this.restaurant;

    if (await this.isRestaurantExist(id)) {
      this.renderLiked();
    } else {
      this.renderLike();
    }
  },

  async isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantDB.getRestaurant(id);
    return !!restaurant;
  },

  renderLike() {
    this.likeButtonContainer.innerHTML = createLikeButtonTemplate();
    const likeButton = document.querySelector('#likeButton');
    if (likeButton) {
      likeButton.addEventListener('click', async () => {
        await FavoriteRestaurantDB.putRestaurant(this.restaurant);
        this.renderButton();
      });
    }
  },

  renderLiked() {
    this.likeButtonContainer.innerHTML = createLikedButtonTemplate();
    const likeButton = document.querySelector('#likeButton');
    if (likeButton) {
      likeButton.addEventListener('click', async () => {
        await FavoriteRestaurantDB.deleteRestaurant(this.restaurant.id);
        this.renderButton();
      });
    }
  },
};

export default LikeButtonInitiator;
