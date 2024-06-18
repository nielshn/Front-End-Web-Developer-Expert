import FavoriteRestaurantDB from "../src/scripts/data/favorite-restaurant";
import * as TestFactories from "./helpers/testFactories";

describe("Unliking A Restaurant", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantDB.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantDB.deleteRestaurant(1);
  });

  it("should display the unlike widget when the restaurant has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    const unlikeButton = document.querySelector('[aria-label="unlike this restaurant"]');
    expect(unlikeButton).toBeTruthy();
  });

  it("should not display like widget when the restaurant has been liked", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    const likeButton = document.querySelector('[aria-label="like this restaurant"]');
    expect(likeButton).toBeFalsy();
  });

  it("should be able to remove liked restaurant from the list", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    const unlikeButton = document.querySelector('[aria-label="unlike this restaurant"]');
    unlikeButton.dispatchEvent(new Event("click"));

    // Wait for the async operations to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allRestaurants = await FavoriteRestaurantDB.getAllRestaurants();
    expect(allRestaurants).toEqual([]);
  });

  it("should not throw error when user clicks unlike widget if the unliked restaurant is not in the list", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteRestaurantDB.deleteRestaurant(1);
    const unlikeButton = document.querySelector('[aria-label="unlike this restaurant"]');
    unlikeButton.dispatchEvent(new Event("click"));

    // Wait for the async operations to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    const allRestaurants = await FavoriteRestaurantDB.getAllRestaurants();
    expect(allRestaurants).toEqual([]);
  });
});
