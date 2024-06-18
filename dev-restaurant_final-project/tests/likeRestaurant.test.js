import FavoriteRestaurantDB from '../src/scripts/data/favorite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await FavoriteRestaurantDB.deleteRestaurant(1);
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await FavoriteRestaurantDB.deleteRestaurant(1);
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    document.querySelector('[aria-label="like this restaurant"]').dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantDB.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantDB.deleteRestaurant(1);
  });

  it('should not add a restaurant again when it\'s already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });
    await FavoriteRestaurantDB.putRestaurant({ id: 1 });
    document.querySelector('[aria-label="like this restaurant"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantDB.getAllRestaurants()).toEqual([{ id: 1 }]);

    await FavoriteRestaurantDB.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});
    document.querySelector('[aria-label="like this restaurant"]').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantDB.getAllRestaurants()).toEqual([]);
  });
});