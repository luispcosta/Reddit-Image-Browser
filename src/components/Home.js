import React from 'react'

import HeaderComponent from './HeaderComponent' // eslint-disable-line no-unused-vars
import GalleryComponent from './GalleryComponent' // eslint-disable-line no-unused-vars

import { SORT_OPTIONS, DEFAULT_SUBREDDIT } from './../connectors/Api'

class Home extends React.Component {

  constructor (props) {
    super(props)

    const params = this.props.params

    const subreddit = params.subreddit || DEFAULT_SUBREDDIT
    this.state = {
      availableSubReddits: [
        '/r/cute', '/r/photography', '/r/pics', '/r/earthporn'
      ],
      sortOptions: SORT_OPTIONS,
      redditName: subreddit,
      imagesType: null,
      sortType: null
    }

    this.updateImagesTypes = this.updateImagesTypes.bind(this)
    this.handleSubredditChange = this.handleSubredditChange.bind(this)
    this.handleSortingChange = this.handleSortingChange.bind(this)
  }

  componentWillReceiveProps (newProps) {
    const params = newProps.params

    const subreddit = params.subreddit || DEFAULT_SUBREDDIT
    this.setState({
      redditName: subreddit
    })
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

  handleSortingChange (newSortType) {
    this.setState({
      sortType: newSortType
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
          sortOptions={this.state.sortOptions}
          handleSortingChange={this.handleSortingChange}
        />

        <GalleryComponent
          subreddit={this.state.redditName}
          imagesType={this.state.imagesType}
          sortType={this.state.sortType}
        />
      </div>
    )
  }
}

export default Home
