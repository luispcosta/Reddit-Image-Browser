import {createSelector, createStructuredSelector} from 'reselect';

export const images = (state: any) => state.images.data;
export const prevImage = (state: any) => state.images.prevImage;
export const nextImage = (state: any) => state.images.nextImage;
export const imagesIsLoading = (state: any) => state.images.isLoading;

export const imagesSelector = createStructuredSelector({
  images,
  prevImage,
  nextImage,
  imagesIsLoading,
});
