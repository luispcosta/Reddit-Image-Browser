import axios from 'axios';

export const fetchImages = (subReddit, opts = {}) => axios.get(`http://localhost:3000/api/${subReddit}/images`);
