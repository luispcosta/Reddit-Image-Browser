import React, { Component } from 'react' // eslint-disable-line no-unused-vars

import HeaderComponent from './HeaderComponent' // eslint-disable-line no-unused-vars
import GalleryComponent from './GalleryComponent' // eslint-disable-line no-unused-vars

import { DEFAULT_SUBREDDIT } from './../connectors/Api'

class Home extends Component {

  constructor (props) {
    super(props)

    this.state = {
      availableSubReddits: [
        '/r/cute', '/r/photography', '/r/pics', '/r/earthporn'
      ],
      redditName: DEFAULT_SUBREDDIT,
      imagesType: null
    }

    this.updateImagesTypes = this.updateImagesTypes.bind(this)
    this.handleSubredditChange = this.handleSubredditChange.bind(this)
  }

  updateImagesTypes (newType) {
    this.setState({
      imagesType: newType.toLowerCase()
    })
  }

  handleSubredditChange (subreddit) {
    this.setState({
      redditName: subreddit.replace('/r/', '')
    })
  }

  render () {
    const styles = {
      height: '100%',
      width: '100%'
    }
    return (
      <div style={styles}>
        <HeaderComponent
          availableSubReddits={this.state.availableSubReddits}
          redditName={this.state.redditName}
          updateImagesTypes={this.updateImagesTypes}
          handleSubredditChange={this.handleSubredditChange}
        />

        <GalleryComponent subreddit={this.state.redditName} imagesType={this.state.imagesType} />
      </div>
    )
  }
}

export default Home
