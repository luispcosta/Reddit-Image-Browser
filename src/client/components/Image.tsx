import React from 'react';
import {FullscreenImage} from './FullscreenImage';
import {GalleryImage} from '../types/GalleryImage';

interface ImageProps {
  data: GalleryImage,
};

interface ImageState {
  fullScreen: boolean,
};

export class Image extends React.Component<ImageProps, ImageState> {
  state = {
    fullScreen: false,
  }

  openModalBox = () => {
    const {data} = this.props;

    this.setState({
      fullScreen: true,
    });
  }

  closeFullScreen = () => {
    this.setState({
      fullScreen: false,
    });
  }

  handleOnImageClick = () => {
    this.setState({
      fullScreen: true,
    })
  }

  render() {
    const {fullScreen} = this.state;
    const {data} = this.props;

    if (fullScreen) {
      return (
        <FullscreenImage
          image={data}
          closeFullScreen={this.closeFullScreen}
        />
      );
    }

    const styles = {
      backgroundImage: `url("${data.fullScreenUrl}")`,
    };

    return (
      <div
        className="reddit_image"
        onClick={this.handleOnImageClick}
        style={styles}
      />
    );
  }
}
