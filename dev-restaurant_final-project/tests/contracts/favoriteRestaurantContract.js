const itActAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it("should return the restaurant that has been added", async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });

    expect(await favoriteRestaurant.getMovie(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurant.getMovie(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurant.getMovie(3)).toEqual(undefined);
  });

  it("should refuse a movie from being added if it does not have the correct property", async () => {
    favoriteRestaurant.putRestaurant({ aProperty: "property" });
  });
};
