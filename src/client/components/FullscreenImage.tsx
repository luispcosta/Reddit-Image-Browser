import React from 'react';
import {GalleryImage} from '../types/GalleryImage';
import {ImageDescription} from './ImageDescription';

interface FullscreenImageProps {
  image: GalleryImage,
  closeFullScreen: Function,
};

export const FullscreenImage = ({image, closeFullScreen}: FullscreenImageProps) => (
  <div style={{backgroundImage: `url("${image.fullScreenUrl}")`}} className="fullScreen flex flex-end">
    <i onClick={closeFullScreen} className="fullScreen--close fa fa-times" aria-hidden="true" />
    <div className="fullScreen--imageDesc">
      <ImageDescription image={image} />
    </div>
  </div>
);
