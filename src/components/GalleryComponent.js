import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import fetchImages, { fetchHotImages, fetchNewImages, fetchRisingImages, fetchTopImages, fetchControversialImages } from './../connectors/Api'

import ImageComponent from './ImageComponent' // eslint-disable-line no-unused-vars
import LoadingComponent from './LoadingComponent'

class GalleryComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: [],
      loading: true
    }

    this.fetchImagesFromNewProps = this.fetchImagesFromNewProps.bind(this)
  }

  async fetchImagesFromNewProps (subreddit, imagesType, sortType) {
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
  }

  async componentWillMount () {
    const images = await fetchImages(this.props.subreddit)
    this.setState({
      images: images,
      loading: false
    })
  }

  async componentWillReceiveProps (newProps) {
    this.setState({
      loading: true
    })
    let images = []
    if (newProps.imagesType) {
      images = await this.fetchImagesFromNewProps(
        newProps.subreddit,
        newProps.imagesType,
        newProps.sortType
      )
    } else {
      images = await fetchImages(newProps.subreddit)
    }
    this.setState({
      images: images,
      loading: false
    })
  }

  render () {
    if (this.state.loading) {
      return <LoadingComponent />
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
  subreddit: React.PropTypes.string,
  imagesType: React.PropTypes.string,
  sortType: React.PropTypes.string
}

export default GalleryComponent
