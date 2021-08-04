import React from 'react';
import {RedditPresenter} from './RedditPresenter';
import {SideBar} from './SideBar';

interface HeaderPropsType {
  redditName: string,
  onRedditChange: Function,
  onChangeImagesType: Function,
  currentImagesType: string,
  canChangeImagesType: boolean,
};

export class Header extends React.Component<HeaderPropsType, {}> {
  render() {
    const
    {redditName,
      currentImagesType,
      onChangeImagesType,
      onRedditChange,
      canChangeImagesType,
    } = this.props;

    return (
      <header className="flex flex--space-between flex--align-top">
        <RedditPresenter
          subreddit={redditName}
          canChangeImagesType={canChangeImagesType}
          onChangeImagesType={onChangeImagesType}
          currentImagesType={currentImagesType}
        />
        <SideBar onRedditChange={onRedditChange} />
      </header>
    );
  }
}
