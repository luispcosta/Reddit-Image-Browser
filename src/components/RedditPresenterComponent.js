import React from 'react' // eslint-disable-line no-unused-vars

class RedditPresenterComponent extends React.Component {

  constructor (props) {
    super(props)

    this.updateImagesTypes = this.updateImagesTypes.bind(this)
  }

  updateImagesTypes (e) {
    const links = document.querySelectorAll('.link_images_type')
    links.forEach(link => link.classList.remove('active'))
    e.target.classList.add('active')

    this.props.updateImagesTypes(e.target.innerHTML)
  }

  render () {
    return (
      <div id="reddit_options">
        <h1>{ this.props.subreddit }</h1>
        <ul>
          <li><span className="link_images_type" onClick={this.updateImagesTypes}>Rising</span></li>
          <li><span className="link_images_type" onClick={this.updateImagesTypes}>Top</span></li>
          <li><span className="link_images_type" onClick={this.updateImagesTypes}>Controversial</span></li>
          <li><span className="link_images_type" onClick={this.updateImagesTypes}>New</span></li>
          <li><span className="link_images_type" onClick={this.updateImagesTypes}>Hot</span></li>
        </ul>
      </div>
    )
  }
}

RedditPresenterComponent.propTypes = {
  updateImagesTypes: React.PropTypes.func,
  subreddit: React.PropTypes.string
}

export default RedditPresenterComponent
