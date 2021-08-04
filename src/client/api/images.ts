import axios from 'axios';

export const fetchImages = (subReddit: string, type: string) => axios.get(`http://localhost:3000/api/${subReddit}/images?type=${type}`);
export const fetchPrevImages = (subReddit: string, type: string, id: string) => axios.get(`http://localhost:3000/api/${subReddit}/prev_images/${id}?type=${type}`);
export const fetchNextImages = (subReddit: string, type: string, id: string) => axios.get(`http://localhost:3000/api/${subReddit}/next_images/${id}?type=${type}`);
