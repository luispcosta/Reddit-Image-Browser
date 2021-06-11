import React from 'react';
import {ImageDescriptionComponent} from './ImageDescriptionComponent';
import {FullscreenImageComponent} from './FullscreenImageComponent';

export class ImageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onImageHover: false,
      fullScreen: false,
      url: null,
    };
  }

  onImageMouseLeave = (e) => {
    e.preventDefault();

    this.setState({
      onImageHover: false,
    });
  }

  onImageMouseEnter = (e) => {
    e.preventDefault();

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
      url: null,
      onImageHover: false,
    });
  }

  render() {
    const {fullScreen, url, onImageHover} = this.state;
    const {data} = this.props;

    if (fullScreen) {
      return (
        <FullscreenImageComponent
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
          <ImageDescriptionComponent imageAttrs={data} />
        </button>
      );
    }

    return (
      <div className="reddit_image" onMouseLeave={this.onImageMouseLeave} onMouseEnter={this.onImageMouseEnter} style={styles} />
    );
  }
}
