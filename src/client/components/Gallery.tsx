import React from 'react';
import {fetchImages} from '../api/images';
import {Image} from './Image';
import {Loading} from './Loading';
import {NoImages} from './NoImages';
import {GalleryImage} from '../types/GalleryImage';

interface GalleryProps {
  subreddit: string,
};

interface GalleryState {
  subreddit: string,
  images: Array<GalleryImage>,
  loading: boolean,
};

export class Gallery extends React.Component<GalleryProps, GalleryState> {
  state = {
    images: [],
    loading: false,
    subreddit: '',
  }

  componentDidMount() {
    const {subreddit} = this.props;

    this.setState({
      loading: true,
    });

    fetchImages(subreddit)
      .then((data) => this.setState({images: data.data, subreddit, loading: false}));
  }

  render() {
    const {loading, images, subreddit} = this.state;

    if (loading) {
      return <Loading />;
    }

    const hasImagesToDisplay = images && typeof images === 'object' && images.length > 0;

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
