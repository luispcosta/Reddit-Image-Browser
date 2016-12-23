import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class RedditPresenterComponent extends Component {

  constructor (props) {
    super(props)

    this.updateImagesTypes = this.updateImagesTypes.bind(this)
  }

  updateImagesTypes (e) {
    this.props.updateImagesTypes(e.target.innerHTML)
  }

  render () {
    return (
      <div id="reddit_options">
        <h1>{ this.props.subreddit }</h1>
        <ul>
          <li><span onClick={this.updateImagesTypes}>Rising</span></li>
          <li><span onClick={this.updateImagesTypes}>Top</span></li>
          <li><span onClick={this.updateImagesTypes}>Controversial</span></li>
          <li><span onClick={this.updateImagesTypes}>New</span></li>
          <li><span onClick={this.updateImagesTypes}>Hot</span></li>
        </ul>
      </div>
    )
  }
}

RedditPresenterComponent.propTypes = {
  updateImagesTypes: React.PropTypes.func
}

export default RedditPresenterComponent
