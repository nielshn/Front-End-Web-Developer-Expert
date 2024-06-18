Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/');
});

Scenario('liking a restaurant', async ({ I }) => {
    const assert = require('assert');

    I.seeElement('.card');

    const firstRestaurant = locate('.card-content-title').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.card');

    const likedRestaurant = locate('.card-content-title').first();
    const likedRestaurantName = await I.grabTextFrom(likedRestaurant);

    // Assert that the names are the same
    assert.strictEqual(firstRestaurantName, likedRestaurantName);
});
