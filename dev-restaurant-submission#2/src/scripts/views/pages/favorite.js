import FavoriteRestaurantDB from "../../data/favorite-restaurant";
import { createFavoriteRestaurantItemTemplate } from "../templates/template-creator";
import Swal from 'sweetalert2';

const Favorite = {
    async render() {
        return `
            <section class="favorites" id="favorites">
                <div class="banner">
                    <h2>Favorite Restaurants</h2>
                </div>
                <div class="data-none-image d-none" id="data-none">
                    <img src="./images/data-none.png" alt="No Data" />
                </div>
                <div class="explore-content container" id="favorite-list"></div>
            </section>
        `;
    },

    async afterRender() {
        const renderAllFavorite = (data) => {
            const section = document.getElementById('favorites')
            const dataNone = document.getElementById('data-none')
            const favoriteList = document.getElementById('favorite-list')
            favoriteList.innerHTML = ''

            if (data.length < 1) {
                section.classList.add('vh-73')
                dataNone.classList.remove('d-none')
                favoriteList.classList.add('d-none')
            } else {
                section.classList.remove("vh-73");
                dataNone.classList.add("d-none");
                favoriteList.classList.remove("d-none");
                data.forEach((item) => {
                    const favoriteContainer = document.createElement("div");
                    favoriteContainer.innerHTML += createFavoriteRestaurantItemTemplate(item);
                    favoriteList.appendChild(favoriteContainer);
                });
            }

            const btnFavDelete = document.querySelectorAll(".btn-favorite-delete");
            btnFavDelete.forEach((button) => {
                button.addEventListener("click", async (e) => {
                    await FavoriteRestaurantDB.deleteRestaurant(e.target.id);
                    Swal.fire({
                        title: 'Success!',
                        text: 'This is a SweetAlert2 notification.',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                });
            });
        };

        renderAllFavorite(await FavoriteRestaurantDB.getAllRestaurants());
    },
};

export default Favorite;

