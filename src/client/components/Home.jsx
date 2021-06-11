import React from 'react';
import {Header} from './Header';
import {Gallery} from './Gallery';

export class Home extends React.Component {
  constructor(props) {
    super(props);

    let paramsGot = props.params || {};

    const subreddit = paramsGot.subreddit || 'earthporn';
    this.state = {
      availableSubReddits: [
        '/r/cute', '/r/photography', '/r/pics', '/r/earthporn',
      ],
      redditName: subreddit,
    };
  }

  /*componentWillReceiveProps(newProps) {
    const {params} = newProps;

    const subreddit = params.subreddit || DEFAULT_SUBREDDIT;
    this.setState({
      redditName: subreddit,
    });
  }*/

  /*updateImagesTypes = (newType) => {
    this.setState({
      imagesType: newType.toLowerCase(),
    });
  }*/

  handleSubredditChange = (subreddit) => {
    this.setState({
      redditName: subreddit.replace('/r/', ''),
    });
  }

  /*handleSortingChange = (newSortType) => {
    this.setState({
      sortType: newSortType,
    });
  }*/

  render() {
    const styles = {
      height: '100%',
      width: '100%',
    };
    const {
      availableSubReddits,
      redditName,
    } = this.state;

    return (
      <div style={styles}>
        <Header
          availableSubReddits={availableSubReddits}
          redditName={redditName}
          updateImagesTypes={this.updateImagesTypes}
          handleSubredditChange={this.handleSubredditChange}
          //sortOptions={sortOptions}
          handleSortingChange={this.handleSortingChange}
        />

        <Gallery
          subreddit={redditName}
          //imagesType={imagesType}
          //sortType={sortType}
        />
      </div>
    );
  }
}
