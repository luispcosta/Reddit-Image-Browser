import React from 'react';
import {Header} from './Header';
import {Gallery} from './Gallery';
import {SORT_OPTIONS} from '../consts';

interface Params {
  subreddit: string,
};

interface HomePropsType {
  params: Params,
};

interface HomeStateTypes {
  redditName: string,
  imagesType: string,
  sortType: string,
};

export class Home extends React.Component<HomePropsType, HomeStateTypes> {
  constructor(props: HomePropsType) {
    super(props);

    let paramsGot = props.params || {};

    const subreddit = paramsGot.subreddit || 'earthporn';
    this.state = {
      redditName: subreddit,
      imagesType: '',
      sortType: '',
    };
  }

  componentWillReceiveProps(newProps: HomePropsType) {
    const {params} = newProps;

    const subreddit = params.subreddit || 'earthporn';
    this.setState({
      redditName: subreddit,
    });
  }

  updateImagesType = (newType: string) => {
    this.setState({
      imagesType: newType.toLowerCase(),
    });
  }

  handleSubredditChange = (subreddit: string) => {
    this.setState({
      redditName: subreddit.replace('/r/', ''),
    });
  }

  handleSortingChange = (newSortType: string) => {
    this.setState({
      sortType: newSortType,
    });
  }

  render() {
    const styles = {
      height: '100%',
      width: '100%',
    };
    const {
      redditName,
    } = this.state;

    return (
      <div style={styles}>
        <Header
          redditName={redditName}
          sortOptions={SORT_OPTIONS}
          updateImagesType={this.updateImagesType}
          handleSortingChange={this.handleSortingChange}
        />

        <Gallery
          subreddit={redditName}
        />
      </div>
    );
  }
}
