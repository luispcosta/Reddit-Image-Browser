import React from 'react';

export class RedditPresenter extends React.Component {
  updateImagesTypes = (e) => {
    const {updateImagesTypes} = this.props;

    const links = document.querySelectorAll('.link_images_type');
    links.forEach((link) => link.classList.remove('active'));
    e.target.classList.add('active');

    updateImagesTypes(e.target.innerHTML);
  }

  render() {
    const {subreddit} = this.props;

    return (
      <div id="reddit_options">
        <h1>{subreddit}</h1>
        <ul>
          <li><button type="button" className="link_images_type" onClick={this.updateImagesTypes}>Rising</button></li>
          <li><button type="button" className="link_images_type" onClick={this.updateImagesTypes}>Top</button></li>
          <li><button type="button" className="link_images_type" onClick={this.updateImagesTypes}>Controversial</button></li>
          <li><button type="button" className="link_images_type" onClick={this.updateImagesTypes}>New</button></li>
          <li><button type="button" className="link_images_type" onClick={this.updateImagesTypes}>Hot</button></li>
        </ul>
      </div>
    )
  }
}
