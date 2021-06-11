import React from 'react';

import {ImageComponent} from './ImageComponent';
import {LoadingComponent} from './LoadingComponent';
import {NoImagesComponent} from './NoImagesComponent';

export class GalleryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      loading: true,
      subreddit: null,
    };
  }

  /*async componentWillMount() {
    const {subreddit} = this.props;
    const images = await fetchImages(subreddit);

    this.setState({
      images,
      subreddit,
      loading: false,
    });
  }*/

  /*async componentWillReceiveProps(newProps) {
    this.setState({
      loading: true,
    });

    let images = [];

    if (newProps.imagesType) {
      images = await this.fetchImagesFromNewProps(
        newProps.subreddit,
        newProps.imagesType,
        newProps.sortType,
      );
    } else {
      images = await fetchImages(newProps.subreddit);
    }
    this.setState({
      images,
      subreddit: newProps.subreddit,
      loading: false,
    });
  }*/

  /*async fetchImagesFromNewProps(subreddit, imagesType, sortType) {
    switch (imagesType) {
      case 'hot':
        return await fetchHotImages(subreddit)
      case 'new':
        return await fetchNewImages(subreddit)
      case 'controversial':
        return await fetchControversialImages(subreddit, sortType)
      case 'rising':
        return await fetchRisingImages(subreddit)
      case 'top':
        return await fetchTopImages(subreddit, sortType)
      default:
        return []
    }
  }*/

  render() {
    const {loading, images, subreddit} = this.state;

    if (loading) {
      return <LoadingComponent />;
    }

    let imagesToDisplay = [];

    if (images && typeof images === 'object' && images.length > 0) {
      imagesToDisplay = images.map((img) => <ImageComponent key={img.id} data={img} />);
    } else {
      imagesToDisplay = <NoImagesComponent forSubreddit={subreddit} />;
    }

    return (
      <section id="section--gallery" className="flex flex--wrap">
        {imagesToDisplay}
      </section>
    );
  }
}
