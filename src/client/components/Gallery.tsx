import React from 'react';
import {Image} from './Image';
import {NoImages} from './NoImages';
import {GalleryImage} from '../types/GalleryImage';

interface GalleryProps {
  subreddit: string,
  images: Array<GalleryImage>
};

export class Gallery extends React.Component<GalleryProps, {}> {
  render() {
    const {images, subreddit} = this.props;

    const hasImagesToDisplay = images.length > 0;

    return (
      <section id="section--gallery" className="flex flex--wrap">
        {hasImagesToDisplay ? (
          <React.Fragment>
            {images.map((img: GalleryImage) => <Image key={img.id} data={img} />)}
          </React.Fragment>
        ) : (
          <NoImages forSubreddit={subreddit} />
        )}
      </section>
    );
  }
}
