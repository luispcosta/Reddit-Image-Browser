import React, { Component } from 'react' // eslint-disable-line no-unused-vars

import HeaderComponent from './HeaderComponent' // eslint-disable-line no-unused-vars
import GalleryComponent from './GalleryComponent' // eslint-disable-line no-unused-vars
import FooterComponent from './FooterComponent' // eslint-disable-line no-unused-vars
import { DEFAULT_SUBREDDIT } from './../connectors/Api'

class Main extends Component {

  constructor (props) {
    super(props)

    this.state = {
      availableSubReddits: [
        '/r/cute', '/r/photography', '/r/pics', '/r/earthporn'
      ],
      redditName: DEFAULT_SUBREDDIT
    }
  }

  render () {
    return (
      <div className="wrapper">
        <HeaderComponent
          availableSubReddits={this.state.availableSubReddits}
          redditName={this.state.redditName}
        />
        <GalleryComponent subreddit={this.state.redditName}/>
        <FooterComponent />
      </div>
    )
  }
}

export default Main
