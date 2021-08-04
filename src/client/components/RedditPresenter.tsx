import React from 'react';

interface RedditPresenterProps {
  subreddit: string,
  onChangeImagesType: Function,
  currentImagesType: string,
  canChangeImagesType: boolean,
};

export class RedditPresenter extends React.Component<RedditPresenterProps, {}> {
  render() {
    const {
      subreddit,
      onChangeImagesType,
      currentImagesType,
      canChangeImagesType,
    } = this.props;

    const isActive = (type: string) => type === currentImagesType;

    return (
      <div id="reddit_options">
        <h1>{subreddit}</h1>
        {canChangeImagesType && (
          <ul>
            <li className={isActive('rising') ? 'link_images_type_active' : ''}>
              <span className="link_images_type" onClick={() => onChangeImagesType('rising')}>Rising</span>
            </li>
            <li className={isActive('top') ? 'link_images_type_active' : ''}>
              <span className="link_images_type" onClick={() => onChangeImagesType('top')}>Top</span>
            </li>
            <li className={isActive('controversial') ? 'link_images_type_active' : ''}>
              <span className="link_images_type" onClick={() => onChangeImagesType('controversial')}>Controversial</span>
            </li>
            <li className={isActive('new') ? 'link_images_type_active' : ''}>
              <span className="link_images_type" onClick={() => onChangeImagesType('new')}>New</span>
            </li>
            <li className={isActive('hot') ? 'link_images_type_active' : ''}>
              <span className="link_images_type" onClick={() => onChangeImagesType('hot')}>Hot</span>
            </li>
          </ul>
        )}
      </div>
    )
  }
}
