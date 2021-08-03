import React from 'react';
import {GalleryImage} from '../types/GalleryImage';

interface ImageDescProps {
  image: GalleryImage,
};

export const ImageDescription = ({image}: ImageDescProps) => (
  <div className="hover-state">
    <div id="image_description">
      <p>{image.title}</p>
      <p>{image.score} Upvotes <i className="fa fa-arrow-up" aria-hidden="true"></i></p>
      <p>{image.author} <i className="fa fa-user-o" aria-hidden="true"></i></p>
    </div>
  </div>
);
