import {createStructuredSelector} from 'reselect';
import { RootState } from '../store';

export const images = (state: RootState) => state.images.data;
export const prevImage = (state: RootState) => state.images.prevImage;
export const nextImage = (state: RootState) => state.images.nextImage;
export const imagesIsLoading = (state: RootState) => state.images.isLoading;

interface ImagesSelection {
  images: Array<any>
  prevImage: string,
  nextImage: string,
  imagesIsLoading: boolean,
}

export const imagesSelector = createStructuredSelector<RootState, ImagesSelection>({
  images,
  prevImage,
  nextImage,
  imagesIsLoading,
});
