import { openDB } from "idb";
import CONFIG from "../globals/config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_NAME } = CONFIG;
const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
        db.createObjectStore(OBJECT_NAME, {
            keyPath: "id"
        });
    }
});


const FavoriteRestaurantDB = {
    async getRestaurant(id) {
        return (await dbPromise).get(OBJECT_NAME, id);
    },

    async getAllRestaurants() {
        return (await dbPromise).getAll(OBJECT_NAME);
    },

    async putRestaurant(restaurant) {
        return (await dbPromise).put(OBJECT_NAME, restaurant);
    },

    async deleteRestaurant(id) {
        return (await dbPromise).delete(OBJECT_NAME, id);
    },

    // async clearRestaurant() {
    //     return (await dbPromise).clear(OBJECT_NAME);
    // }
}

export default FavoriteRestaurantDB;