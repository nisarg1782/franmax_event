// File: src/utils/api.js

const BASE_API_URL = 'http://localhost/event-api';
const BASE_IMAGE_URL = 'http://localhost/react-api/';

export const getApiUrl = (endpoint) => `${BASE_API_URL}/${endpoint}`;
export const getImageUrl = (imagePath) => `${BASE_IMAGE_URL}${imagePath}`;
