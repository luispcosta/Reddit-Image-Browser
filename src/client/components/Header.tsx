import React from 'react';
import {RedditPresenter} from './RedditPresenter';
import {RedditImagesSortOptions} from './RedditImagesSortOptions';
import {SortOption} from '../types/SortOption';


interface HeaderPropsType {
  updateImagesType: Function,
  handleSortingChange: Function,
  sortOptions: Array<SortOption>,
  redditName: string,
};

export class Header extends React.Component<HeaderPropsType, {}> {
  state = {
    shouldPresentSortOptions: false,
  }

  shouldPresentSortOptionsFromNewType = (newImagesType: string) => newImagesType === 'top' || newImagesType === 'controversial';

  updateImagesTypes = (newImagesType: string) => {
    const {updateImagesType} = this.props;

    this.setState({
      shouldPresentSortOptions: this.shouldPresentSortOptionsFromNewType(newImagesType.toLowerCase()),
    });

    updateImagesType(newImagesType);
  }

  renderImagesSorter = () => {
    const {shouldPresentSortOptions} = this.state;
    const {sortOptions, handleSortingChange} = this.props;

    if (shouldPresentSortOptions) {
      return (
        <RedditImagesSortOptions
          sortOptions={sortOptions}
          handleSortingChange={handleSortingChange}
        />
      );
    }

    return null;
  }

  render() {
    const {redditName} = this.props;

    return (
      <header className="flex flex--space-between flex--align-top">
        {this.renderImagesSorter()}

        <RedditPresenter
          updateImagesTypes={this.updateImagesTypes}
          subreddit={redditName}
        />
      </header>
    );
  }
}
