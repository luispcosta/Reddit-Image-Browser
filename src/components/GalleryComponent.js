import React from 'react'
import fetchImages, { fetchHotImages, fetchNewImages, fetchRisingImages, fetchTopImages, fetchControversialImages } from './../connectors/Api'

import ImageComponent from './ImageComponent' // eslint-disable-line no-unused-vars
import LoadingComponent from './LoadingComponent'
import NoImagesComponent from './NoImagesComponent'

class GalleryComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      images: [],
      loading: true,
      subreddit: null
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
      subreddit: this.props.subreddit,
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
      subreddit: newProps.subreddit,
      loading: false
    })
  }

  render () {
    if (this.state.loading) {
      return <LoadingComponent />
    }

    let imagesToDisplay = []
    if (this.state.images &&
      typeof this.state.images === 'object' &&
      this.state.images.length > 0) {
      imagesToDisplay = this.state.images.map(img => {
        return <ImageComponent key={img.id} data={img}/>
      })
    } else {
      imagesToDisplay = <NoImagesComponent forSubreddit={this.state.subreddit}/>
    }

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
