import React from 'react';
import {HeaderComponent} from './HeaderComponent';
import {GalleryComponent} from './GalleryComponent';

export class Home extends React.Component {
 /* constructor(props) {
    super(props);

    let paramsGot = props.params || {};

    const subreddit = paramsGot.subreddit || DEFAULT_SUBREDDIT;
    this.state = {
      availableSubReddits: [
        '/r/cute', '/r/photography', '/r/pics', '/r/earthporn',
      ],
      sortOptions: SORT_OPTIONS,
      redditName: subreddit,
      imagesType: null,
      sortType: null,
    };
  }*/

  /*componentWillReceiveProps(newProps) {
    const {params} = newProps;

    const subreddit = params.subreddit || DEFAULT_SUBREDDIT;
    this.setState({
      redditName: subreddit,
    });
  }*/

 /* updateImagesTypes = (newType) => {
    this.setState({
      imagesType: newType.toLowerCase(),
    });
  }

  handleSubredditChange = (subreddit) => {
    this.setState({
      redditName: subreddit.replace('/r/', ''),
    });
  }

  handleSortingChange = (newSortType) => {
    this.setState({
      sortType: newSortType,
    });
  }*/

  render() {
    /*const styles = {
      height: '100%',
      width: '100%',
    };
    const {
      availableSubReddits,
      redditName,
      sortType,
      imagesType,
      sortOptions,
    } = this.state;*/

    return (
      <div style={styles}>
        <HeaderComponent
          availableSubReddits={availableSubReddits}
          redditName={redditName}
          updateImagesTypes={this.updateImagesTypes}
          handleSubredditChange={this.handleSubredditChange}
          sortOptions={sortOptions}
          handleSortingChange={this.handleSortingChange}
        />

        <GalleryComponent
          subreddit={redditName}
          imagesType={imagesType}
          sortType={sortType}
        />
      </div>
    );
  }
}
