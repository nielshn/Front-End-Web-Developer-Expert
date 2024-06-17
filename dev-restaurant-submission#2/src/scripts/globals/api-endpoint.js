import CONFIG from "./config";

const API_ENDPOINT = {
    HOME: `${CONFIG.BASE_URL}/list`,
    ADD_REVIEW: `${CONFIG.BASE_URL}/review`,
    DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
    SEARCH: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
    IMAGE_SMALL: (pictureId) => `${CONFIG.IMAGE_BASE_URL}small/${pictureId}`,
    IMAGE_MEDIUM: (pictureId) => `${CONFIG.IMAGE_BASE_URL}medium/${pictureId}`,
    IMAGE_LARGE: (pictureId) => `${CONFIG.IMAGE_BASE_URL}large/${pictureId}`,
}

export default API_ENDPOINT;