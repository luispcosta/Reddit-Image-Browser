import React, { Component } from 'react' // eslint-disable-line no-unused-vars

import ImageDescriptionComponent from './ImageDescriptionComponent'

class ImageComponent extends Component {

  constructor (props) {
    super(props)
    this.state = {
      onImageHover: false
    }

    this.onImageMouseLeave = this.onImageMouseLeave.bind(this)
    this.onImageMouseEnter = this.onImageMouseEnter.bind(this)
  }

  onImageMouseLeave () {
    this.setState({
      onImageHover: false
    })
  }

  onImageMouseEnter () {
    this.setState({
      onImageHover: true
    })
  }

  render () {
    const styles = {
      backgroundImage: `url("${this.props.data.url}")`
    }

    if (this.state.onImageHover === true) {
      return (
        <div className="reddit_image" onMouseLeave={this.onImageMouseLeave} onMouseEnter={this.onImageMouseEnter} style={styles}>
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
