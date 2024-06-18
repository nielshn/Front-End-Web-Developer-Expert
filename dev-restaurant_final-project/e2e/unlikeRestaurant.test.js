Feature('Unliking a Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/');
    I.seeElement('.card');
    const firstRestaurant = locate('.card-content-title').first();
    I.click(firstRestaurant);
    I.seeElement('#likeButton');
    // Like the first restaurant to ensure there is one in the favorites
    I.click('#likeButton');
    I.wait(2);
});

Scenario('unliking a restaurant', async ({ I }) => {
    // Navigate to the favorite page and perform necessary actions
    I.amOnPage('/#/favorite');
    I.waitForElement('.card', 5);
    const firstFavoriteRestaurant = locate('.card-content-title').first();
    const favoriteRestaurantName = await I.grabTextFrom(firstFavoriteRestaurant);

    // Click on the favorite restaurant to view details
    I.click(favoriteRestaurantName);
    I.waitForElement('[aria-label="unlike this restaurant"]', 5);
    I.click('[aria-label="unlike this restaurant"]');
    I.wait(2);

    // Check if the favorite restaurant is no longer in the list
    I.amOnPage('/#/favorite');
    I.waitForElement('.data-none-image', 5);
    I.seeElement('.data-none-image');
});

