// Define the RestaurantList custom element
class RestaurantList extends HTMLElement {
    connectedCallback() {
        // Get the restaurant data script element
        const jsonDataScript = document.getElementById('restaurant-data');
        if (jsonDataScript) {
            // Parse the JSON data
            const jsonDataString = jsonDataScript.textContent;
            const data = JSON.parse(jsonDataString);

            // Set the data to the restaurant-list element
            this.data = data.restaurants;
        } else {
            console.error('Restaurant data script element not found.');
        }
    }

    set data(restaurants) {
        // Clear any existing content
        this.innerHTML = '';

        // Iterate through the restaurants data and create elements for each restaurant
        restaurants.forEach(restaurant => {
            const restaurantElement = document.createElement('div');
            restaurantElement.classList.add('restaurant');
            restaurantElement.innerHTML = `
                <img src="${restaurant.pictureId}" alt="${restaurant.name}">
                <div class="info">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.description}</p>
                    <p>City: ${restaurant.city}</p>
                    <p>Rating: ${restaurant.rating}</p>
                </div>`;
            this.appendChild(restaurantElement);
        });
    }
}

// Define the restaurant-list custom element
customElements.define('restaurant-list', RestaurantList);
