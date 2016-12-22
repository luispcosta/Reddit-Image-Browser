import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import fetchImages from './../connectors/Api'

import ImageComponent from './ImageComponent' // eslint-disable-line no-unused-vars

class GalleryComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: [],
      loading: true
    }
  }

  async componentWillMount () {
    const images = await fetchImages(this.props.subreddit)
    this.setState({
      images: images,
      loading: false
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
