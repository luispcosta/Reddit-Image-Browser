import React from 'react';
import {ImageDescription} from './ImageDescription';
import {FullscreenImage} from './FullscreenImage';
import {GalleryImage} from '../types/GalleryImage';

interface ImageProps {
  data: GalleryImage,
};

interface ImageState {
  onImageHover: boolean,
  fullScreen: boolean,
  url: string,
};

export class Image extends React.Component<ImageProps, ImageState> {
  state = {
    onImageHover: false,
    fullScreen: false,
    url: "",
  }

  onImageMouseLeave = (event: Event) => {
    event.preventDefault();

    this.setState({
      onImageHover: false,
    });
  }

  onImageMouseEnter = (event: Event) => {
    event.preventDefault();

    this.setState({
      onImageHover: true,
    });
  }

  openModalBox = () => {
    const {data} = this.props;

    this.setState({
      fullScreen: true,
      url: data.fullScreenUrl,
    });
  }

  closeFullScreen = () => {
    this.setState({
      fullScreen: false,
      url: "",
      onImageHover: false,
    });
  }

  render() {
    const {fullScreen, url, onImageHover} = this.state;
    const {data} = this.props;

    if (fullScreen) {
      return (
        <FullscreenImage
          url={url}
          closeFullScreen={this.closeFullScreen}
        />
      );
    }

    const styles = {
      backgroundImage: `url("${data.url}")`,
    };

    if (onImageHover === true) {
      return (
        <button
          type="button"
          className="reddit_image"
          onClick={this.openModalBox}
          onMouseLeave={this.onImageMouseLeave}
          onMouseEnter={this.onImageMouseEnter}
          style={styles}
        >
          <ImageDescription image={data} />
        </button>
      );
    }

    return (
      <div
        className="reddit_image"
        onMouseLeave={this.onImageMouseLeave}
        onMouseEnter={this.onImageMouseEnter}
        style={styles}
      />
    );
  }
}
