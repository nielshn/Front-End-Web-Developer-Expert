import API_ENDPOINT from "../globals/api-endpoint";

class TheRestaurantDbSource {
    static async detailRestaurant(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        const responseJson = await response.json();
        return responseJson.restaurant;
    }
    static async listRestaurant() {
        try {
            const response = await fetch(API_ENDPOINT.HOME);
            const responseJson = await response.json();
            return responseJson.restaurants;
        } catch (error) {
            console.error('Error fetching restaurant data:', error);
            return [];
        }
    }

    static async searchRestaurant(query) {
        const response = await fetch(API_ENDPOINT.SEARCH(query));
        const responseJson = await response.json();
        return responseJson.results;
    }
}


export default TheRestaurantDbSource;