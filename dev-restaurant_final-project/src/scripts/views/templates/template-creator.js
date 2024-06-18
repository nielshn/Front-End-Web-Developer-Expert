import API_ENDPOINT from '../../globals/api-endpoint';

const truncateDescription = (description, maxLength = 60) => {
  if (description.length > maxLength) {
    return `${description.slice(0, maxLength)}...`;
  }
  return description;
};

const createRestaurantItemTemplate = (restaurant) => `
<article class="card" tabindex="0">
  <div class="card-img-container">
    <picture>
      <source type="image/webp" media="(max-width: 600px)" data-srcset="${API_ENDPOINT.IMAGE_SMALL_WEBP(restaurant.pictureId)}">
      <source type="image/jpeg" media="(max-width: 600px)" data-srcset="${API_ENDPOINT.IMAGE_SMALL(restaurant.pictureId)}">
      <source type="image/webp" data-srcset="${API_ENDPOINT.IMAGE_LARGE_WEBP(restaurant.pictureId)}">
      <source type="image/jpeg" data-srcset="${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}">
      <img class="lazyload card-image" alt="${restaurant.name}" data-src="${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}">
    </picture>
    <span class="card-place">${restaurant.city}</span>
    <span class="card-rating">
      &starf; <span>${restaurant.rating}</span>
    </span>
  </div>
  <div class="card-content">
    <a class="card-content-title" href="/#/detail/${restaurant.id}">${restaurant.name}</a>
    <p class="card-content-description">${truncateDescription(restaurant.description)}</p>
  </div>
</article>
`;

const createFavoriteRestaurantItemTemplate = (restaurant) => `
<article class="card" tabindex="0">
  <div class="card-img-container">
    <span class="card-place">${restaurant.city}</span>
    <picture>
      <source type="image/webp" media="(max-width: 600px)" data-srcset="${API_ENDPOINT.IMAGE_SMALL_WEBP(restaurant.pictureId)}">
      <source type="image/jpeg" media="(max-width: 600px)" data-srcset="${API_ENDPOINT.IMAGE_SMALL(restaurant.pictureId)}">
      <source type="image/webp" data-srcset="${API_ENDPOINT.IMAGE_LARGE_WEBP(restaurant.pictureId)}">
      <source type="image/jpeg" data-srcset="${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}">
      <img class="lazyload card-image" alt="${restaurant.name}" data-src="${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}">
    </picture>
    <span class="card-rating">
      &starf; <span>${restaurant.rating}</span>
    </span>
  </div>
  <div class="card-content">
    <a class="card-content-title" href="/#/detail/${restaurant.id}">${restaurant.name}</a>
    <p class="card-content-description">${restaurant.description}</p>
    <button class="btn-favorite-delete" id="${restaurant.id}">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
</article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
<section class="detail-section">
  <!-- Header Section -->
  <div class="detail-content">
    <div class="detail-header card">
      <div class="card-img-container">
        <picture>
          <source type="image/webp" media="(max-width: 600px)" srcset="${API_ENDPOINT.IMAGE_SMALL_WEBP(restaurant.pictureId)}">
          <source type="image/jpeg" media="(max-width: 600px)" srcset="${API_ENDPOINT.IMAGE_SMALL(restaurant.pictureId)}">
          <source type="image/webp" srcset="${API_ENDPOINT.IMAGE_LARGE_WEBP(restaurant.pictureId)}">
          <source type="image/jpeg" srcset="${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}">
          <img src="${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}" alt="${restaurant.name}" class="restaurant-image">
        </picture>
        <div class="card-overlay">
          <div class="card-place">${restaurant.city}</div>
          <div class="card-rating">Rating: ${restaurant.rating}</div>
        </div>
      </div>
      <div class="detail-category-list" id="category-list">
        <h3>Categories</h3>
        <ul>
          ${restaurant.categories.map((category) => `<li>${category.name}</li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="add-review card">
      <h3>Add Review</h3>
      <form id="add-review-form">
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="review">Your Review:</label>
        <textarea id="review" name="review" rows="4" required></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  </div>
  <!-- Content Section -->
  <div class="detail-content">
    <!-- Description -->
    <div class="descriptions card">
      <div class="header-info">
        <h2 class="detail-title">${restaurant.name}</h2>
        <p>${restaurant.address}, ${restaurant.city}</p>
      </div>
      <div class="detail-description">
        <h3>Description</h3>
        <p>${restaurant.description}</p>
      </div>
      <div class="detail-rating">
        <h3>Rating</h3>
        ${'★'.repeat(Math.floor(restaurant.rating))}
      </div>
    </div>

    <!-- Menus -->
    <div class="detail-menus card">
      <h3>Menus</h3>
      <div class="menus">
        <div>
          <h4>Foods</h4>
          <ul>
            ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4>Drinks</h4>
          <ul>
            ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- Reviews -->
    <div class="detail-reviews card">
      <h3>Reviews</h3>
      <div id="review-list">
        ${restaurant.customerReviews.map((review) => `
          <div class="review">
            <p class="review-name">${review.name}</p>
            <p class="review-date">${review.date}</p>
            <p class="review-content">${review.review}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createSearchRestaurantTemplate = () => `
  <form id="search-restaurant-form">
    <label for="search">Search Restaurant:</label><br>
    <input type="text" id="search" name="search" required><br>
    <button type="submit">Search</button>
  </form>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createSearchRestaurantTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createFavoriteRestaurantItemTemplate,
};
