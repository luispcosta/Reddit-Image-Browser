import React from 'react';
import {RedditPresenterComponent} from './RedditPresenterComponent';
import {RedditImagesSortOptionsComponent} from './RedditImagesSortOptionsComponent';
import {SideBarComponent} from './SideBarComponent';

export class HeaderComponent extends React.Component {
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
        <RedditImagesSortOptionsComponent
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

        <RedditPresenterComponent
          updateImagesTypes={this.updateImagesTypes}
          subreddit={redditName}
        />

        <SideBarComponent
          subreddits={availableSubReddits}
          handleSubredditChange={this.handleSubredditChange}
        />
      </header>
    );
  }
}
