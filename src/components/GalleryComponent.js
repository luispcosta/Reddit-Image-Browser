import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import fetchImages, { fetchHotImages, fetchNewImages, fetchRisingImages, fetchTopImages, fetchControversialImages } from './../connectors/Api'

import ImageComponent from './ImageComponent' // eslint-disable-line no-unused-vars

class GalleryComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: [],
      loading: true
    }

    this.fetchImagesOfType = this.fetchImagesOfType.bind(this)
  }

  async fetchImagesOfType (subreddit, imagesType) {
    switch (imagesType) {
      case 'hot':
        return await fetchHotImages(subreddit)
      case 'new':
        return await fetchNewImages(subreddit)
      case 'controversial':
        return await fetchControversialImages(subreddit)
      case 'rising':
        return await fetchRisingImages(subreddit)
      case 'top':
        return await fetchTopImages(subreddit)
      default:
        return []
    }
  }

  async componentWillMount () {
    const images = await fetchImages(this.props.subreddit)
    this.setState({
      images: images,
      loading: false
    })
  }

  async componentWillReceiveProps (newProps) {
    let images = []
    if (newProps.imagesType) {
      images = await this.fetchImagesOfType(newProps.subreddit, newProps.imagesType)
    } else {
      images = await fetchImages(newProps.subreddit)
    }
    this.setState({
      images: images
    })
  }

  render () {
    if (this.state.loading) {
      return (
        // TODO: Create a loadiung component!
        <h1>loading!</h1>
      )
    }

    const imagesToDisplay = this.state.images.map(img => {
      return <ImageComponent key={img.id} data={img}/>
    })

    return (
      <section id="section--gallery" className="flex flex--wrap">
        {imagesToDisplay}
      </section>
    )
  }
}

GalleryComponent.PropTypes = {
  subreddit: React.PropTypes.string
}

export default GalleryComponent
