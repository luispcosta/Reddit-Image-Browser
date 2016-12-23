import React, { Component } from 'react'
import RedditPresenterComponent from './RedditPresenterComponent'
import SideBarComponent from './SideBarComponent'

class HeaderComponent extends Component {

  constructor (props) {
    super(props)

    this.updateImagesTypes = this.updateImagesTypes.bind(this)
  }

  updateImagesTypes (newImagesType) {
    this.props.updateImagesTypes(newImagesType)
  }

  render () {
    return (
      <header className="flex flex--space-between flex--align-top">
        <div id="reddit_sort_options">
          <ul>
            <li><a href="">All time</a></li>
            <li><a href="">From the last year</a></li>
            <li><a href="">From the last month</a></li>
            <li><a href="">From the last week</a></li>
            <li><a href="">From the last day</a></li>
            <li><a href="">From the last hour</a></li>
          </ul>
        </div>

        <RedditPresenterComponent
          updateImagesTypes={this.updateImagesTypes}
          subreddit={this.props.redditName}
        />

        <SideBarComponent subreddits={this.props.availableSubReddits}/>
      </header>
    )
  }
}

HeaderComponent.propTypes = {
  redditName: React.PropTypes.string,
  updateImagesType: React.PropTypes.func,
  availableSubReddits: React.PropTypes.array
}

export default HeaderComponent
