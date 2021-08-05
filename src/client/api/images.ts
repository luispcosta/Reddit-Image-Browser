import axios from 'axios';

export const fetchImages = (subReddit: string, type: string) => axios.get(`${API_URL}/${subReddit}/images?type=${type}`);
export const fetchPrevImages = (subReddit: string, type: string, id: string) => axios.get(`${API_URL}/${subReddit}/prev_images/${id}?type=${type}`);
export const fetchNextImages = (subReddit: string, type: string, id: string) => axios.get(`${API_URL}/${subReddit}/next_images/${id}?type=${type}`);
