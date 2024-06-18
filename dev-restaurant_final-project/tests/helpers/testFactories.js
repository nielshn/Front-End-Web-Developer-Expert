import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.getElementById("likeButtonContainer"),
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
