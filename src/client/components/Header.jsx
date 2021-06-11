import React from 'react';
import {RedditPresenter} from './RedditPresenter';
import {RedditImagesSortOptions} from './RedditImagesSortOptions';
import {SideBar} from './SideBar';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldPresentSortOptions: false,
    };
  }

  shouldPresentSortOptionsFromNewType = (newImagesType) => newImagesType === 'top' || newImagesType === 'controversial';

  updateImagesTypes = (newImagesType) => {
    const {updateImagesType} = this.props;

    this.setState({
      shouldPresentSortOptions: this.shouldPresentSortOptionsFromNewType(newImagesType.toLowerCase()),
    });

    updateImagesType(newImagesType);
  }

  handleSubredditChange = (newSubreddit) => {
    const {handleSubredditChange} = this.props;
    handleSubredditChange(newSubreddit);
  }

  handleSortingChange = (sortType) => {
    const {handleSortingChange} = this.props;

    handleSortingChange(sortType);
  }

  renderImagesSorter = () => {
    const {shouldPresentSortOptions} = this.state;
    const {sortOptions} = this.props;

    if (shouldPresentSortOptions) {
      return (
        <RedditImagesSortOptions
          sortOptions={sortOptions}
          handleSortingChange={this.handleSortingChange}
        />
      );
    }

    return null;
  }

  render() {
    const {redditName, availableSubReddits} = this.props;

    return (
      <header className="flex flex--space-between flex--align-top">
        {this.renderImagesSorter()}

        <RedditPresenter
          updateImagesTypes={this.updateImagesTypes}
          subreddit={redditName}
        />

        <SideBar
          subreddits={availableSubReddits}
          handleSubredditChange={this.handleSubredditChange}
        />
      </header>
    );
  }
}
