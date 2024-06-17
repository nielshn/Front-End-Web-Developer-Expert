import API_ENDPOINT from "../../globals/api-endpoint";

const createRestaurantItemTemplate = (restaurant) => `
<article class="card" tabindex="0">
  <div class="card-img-container">
    <img class="card-image" alt="${restaurant.name}" src="${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}">
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

const truncateDescription = (description, maxLength = 60) => {
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + '...';
  }
  return description;
};


const createFavoriteRestaurantItemTemplate = (restaurant) => {
  const maxDescriptionLength = 60;
  const trimmedDescription = restaurant.description.length > maxDescriptionLength
    ? `${restaurant.description.substring(0, maxDescriptionLength)}...`
    : restaurant.description;

  return `
  <article class="card" tabindex="0">
  <div class="card-img-container">
    <span class="card-place">${restaurant.city}</span>
    <img class="card-image" alt="${restaurant.name}" src="${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}">
    <span class="card-rating">
      <i title="ratings"></i>
      &starf; <span>${restaurant.rating}</span>
    </span>
  </div>
  <div class="card-content">
  <a class="card-content-title" href="/#/detail/${restaurant.id}">${restaurant.name}</a>
  <p class="card-content-description">${trimmedDescription}</p>
  <button class="btn-favorite-delete" id="${restaurant.id}">
  <i class="fa-solid fa-trash"></i>
  </button>
</div>

</article>

  `;
};



const createRestaurantDetailTemplate = (restaurant) => `
<section class="detail-section">
  <!-- Header Section -->
  <div class="detail-content">
  <div class="detail-header card">
  <div class="card-img-container">
    <img src="${API_ENDPOINT.IMAGE_LARGE(restaurant.pictureId)}" alt="${restaurant.name}" class="restaurant-image">
    <div class="card-overlay">
      <div class="card-place">${restaurant.city}</div>
      <div class="card-rating">Rating: ${restaurant.rating}</div>
    </div>
  </div>
  <div class="detail-category-list" id="category-list">
    <h3>Categories</h3>
    <ul>
      ${restaurant.categories.map(category => `<li>${category.name}</li>`).join('')}
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
      <div class="detail-foods">
        <h4>Foods</h4>
        <div class="menu-items">
          ${restaurant.menus.foods.map(food => `<div class="menu-item">${food.name}</div>`).join('')}
        </div>
      </div>
      <div class="detail-drinks">
        <h4>Drinks</h4>
        <div class="menu-items">
          ${restaurant.menus.drinks.map(drink => `<div class="menu-item">${drink.name}</div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Reviews -->
    <div class="detail-reviews card">
    <h3>Customer Reviews</h3>
    <div class="review-slider">
      <div class="reviews">
        ${restaurant.customerReviews.map(review => `
          <div class="review">
            <div class="review-info">
              <p class="review-name">${review.name}</p>
              <p class="review-date">${review.date}</p>
            </div>
            <p class="review-comment">${review.review}</p>
          </div>
        `).join('')}
      </div>
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

export { createRestaurantItemTemplate, createRestaurantDetailTemplate, createSearchRestaurantTemplate, createLikeButtonTemplate, createLikedButtonTemplate, createFavoriteRestaurantItemTemplate };
