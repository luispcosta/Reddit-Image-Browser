import React from 'react'

import ImageDescriptionComponent from './ImageDescriptionComponent'
import FullscreenImageComponent from './FullscreenImageComponent'

class ImageComponent extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      onImageHover: false,
      fullScreen: false,
      url: null
    }

    this.onImageMouseLeave = this.onImageMouseLeave.bind(this)
    this.onImageMouseEnter = this.onImageMouseEnter.bind(this)
    this.openModalBox = this.openModalBox.bind(this)
    this.closeFullScreen = this.closeFullScreen.bind(this)
  }

  onImageMouseLeave (e) {
    e.preventDefault()
    this.setState({
      onImageHover: false
    })
  }

  onImageMouseEnter (e) {
    e.preventDefault()
    this.setState({
      onImageHover: true
    })
  }

  openModalBox () {
    const backgroundImageUrl = this.props.data.fullScreenUrl

    this.setState({
      fullScreen: true,
      url: backgroundImageUrl
    })
  }

  closeFullScreen () {
    this.setState({
      fullScreen: false,
      url: null,
      onImageHover: false
    })
  }

  render () {
    if (this.state.fullScreen) {
      return <FullscreenImageComponent
              url={this.state.url}
              closeFullScreen={this.closeFullScreen}
            />
    }

    const styles = {
      backgroundImage: `url("${this.props.data.url}")`
    }

    if (this.state.onImageHover === true) {
      return (
        <div className="reddit_image" onClick={this.openModalBox} onMouseLeave={this.onImageMouseLeave} onMouseEnter={this.onImageMouseEnter} style={styles}>
          <ImageDescriptionComponent imageAttrs={this.props.data} />
        </div>
      )
    }

    return (
      <div className="reddit_image" onMouseLeave={this.onImageMouseLeave} onMouseEnter={this.onImageMouseEnter} style={styles}>
      </div>
    )
  }
}

ImageComponent.PropTypes = {
  data: React.PropTypes.obj
}

export default ImageComponent
