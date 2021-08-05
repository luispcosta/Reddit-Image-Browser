import axios from 'axios';
import {getApiUrl} from '../consts';

export const fetchImages = (subReddit: string, type: string) => axios.get(`${getApiUrl()}/${subReddit}/images?type=${type}`);
export const fetchPrevImages = (subReddit: string, type: string, id: string) => axios.get(`${getApiUrl()}/${subReddit}/prev_images/${id}?type=${type}`);
export const fetchNextImages = (subReddit: string, type: string, id: string) => axios.get(`${getApiUrl()}/${subReddit}/next_images/${id}?type=${type}`);
