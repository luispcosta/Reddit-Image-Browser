import React, { Component } from 'react'
import RedditPresenterComponent from './RedditPresenterComponent'
import SideBarComponent from './SideBarComponent'
import RedditImagesSortOptionsComponent from './RedditImagesSortOptionsComponent'

class HeaderComponent extends Component {

  constructor (props) {
    super(props)

    this.updateImagesTypes = this.updateImagesTypes.bind(this)
    this.handleSubredditChange = this.handleSubredditChange.bind(this)
    this.renderImagesSorter = this.renderImagesSorter.bind(this)

    this.state = {
      shouldPresentSortOptions: false
    }
  }

  shouldPresentSortOptionsFromNewType (newImagesType) {
    return newImagesType === 'top' || newImagesType === 'controversial'
  }

  updateImagesTypes (newImagesType) {
    this.setState({
      shouldPresentSortOptions: this.shouldPresentSortOptionsFromNewType(newImagesType.toLowerCase())
    })
    this.props.updateImagesTypes(newImagesType)
  }

  handleSubredditChange (newSubreddit) {
    this.props.handleSubredditChange(newSubreddit)
  }

  renderImagesSorter () {
    if (this.state.shouldPresentSortOptions) {
      return <RedditImagesSortOptionsComponent sortOptions={this.props.sortOptions}/>
    }
  }

  render () {
    return (
      <header className="flex flex--space-between flex--align-top">
        { this.renderImagesSorter() }

        <RedditPresenterComponent
          updateImagesTypes={this.updateImagesTypes}
          subreddit={this.props.redditName}
        />

        <SideBarComponent
          subreddits={this.props.availableSubReddits}
          handleSubredditChange={this.handleSubredditChange}
        />
      </header>
    )
  }
}

HeaderComponent.propTypes = {
  redditName: React.PropTypes.string,
  updateImagesType: React.PropTypes.func,
  handleSubredditChange: React.PropTypes.func,
  availableSubReddits: React.PropTypes.array,
  sortOptions: React.PropTypes.array
}

export default HeaderComponent
