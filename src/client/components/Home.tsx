import React from 'react';
import {Header} from './Header';
import {Gallery} from './Gallery';
import {connect} from 'react-redux';
import {getImages} from '../store/actions';
import {imagesSelector} from '../store/selectors/images';
import {Loading} from './Loading';
import {RouteComponentProps} from 'react-router';
import {GalleryPagination} from './GalleryPagination';

interface MatchParams {
  subreddit?: string
}

interface HomePropsType extends RouteComponentProps<MatchParams> {
  getImages: Function,
  images: Array<any>,
  imagesIsLoading: boolean,
  prevImage?: string,
  nextImage?: string,
};

interface HomeStateTypes {
  redditName: string,
  imagesType: string,
};

class HomeComponent extends React.Component<HomePropsType, HomeStateTypes> {
  constructor(props: HomePropsType) {
    super(props);
    const subreddit = props.match.params.subreddit || 'earthporn';
    this.state = {
      redditName: subreddit,
      imagesType: 'new',
    };
  }

  componentDidMount() {
    const {getImages} = this.props;
    const {redditName, imagesType} = this.state;

    getImages(redditName, {imagesType});
  }

  onRedditChange = (subreddit: string) => {
    const {getImages} = this.props;
    const {imagesType} = this.state;

    getImages(subreddit, {imagesType});
    this.setState({
      redditName: subreddit,
    });
  }

  onChangeImagesType = (imagesType: string) => {
    const {getImages} = this.props;
    const {redditName} = this.state;
    getImages(redditName, {imagesType});
    this.setState({
      imagesType,
    })
  }

  onPrevClick = () => {
    const {getImages, prevImage} = this.props;
    const {redditName, imagesType} = this.state;
    getImages(redditName, {imagesType, before: prevImage});
  }

  onNextClick = () => {
    const {getImages, nextImage} = this.props;
    const {redditName, imagesType} = this.state;
    getImages(redditName, {imagesType, after: nextImage});
  }

  render() {
    const styles = {
      height: '100%',
      width: '100%',
    };
    const {images, imagesIsLoading, nextImage, prevImage} = this.props;

    const {
      redditName,
      imagesType,
    } = this.state;

    return (
      <div style={styles}>
        <Header
          redditName={redditName}
          onRedditChange={this.onRedditChange}
          onChangeImagesType={this.onChangeImagesType}
          currentImagesType={imagesType}
          canChangeImagesType={images.length > 0}
        />
        {imagesIsLoading && <Loading />}
        {(!imagesIsLoading && images.length > 0) && (
          <GalleryPagination
            isPrevDisabled={prevImage === null}
            isNextDisabled={nextImage === null}
            onPrevClick={this.onPrevClick}
            onNextClick={this.onNextClick}
          />
        )}
        {!imagesIsLoading && (
          <Gallery
            images={images}
            subreddit={redditName}
          />
        )}
      </div>
    );
  }
}

export const Home = connect(imagesSelector, {
  getImages,
})(HomeComponent);
