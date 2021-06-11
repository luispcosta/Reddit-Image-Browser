import React from 'react';

import {fetchImages} from '../api/images';
import {Image} from './Image';
import {Loading} from './Loading';
import {NoImages} from './NoImages';

export class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      loading: true,
      subreddit: null,
    };
  }

  componentDidMount() {
    const {subreddit} = this.props;

    fetchImages(subreddit)
      .then((data) => this.setState({images: data.data, subreddit, loading: false}));
  }

  render() {
    const {loading, images, subreddit} = this.state;

    if (loading) {
      return <Loading />;
    }

    let imagesToDisplay = [];

    if (images && typeof images === 'object' && images.length > 0) {
      imagesToDisplay = images.map((img) => <Image key={img.id} data={img} />);
    } else {
      imagesToDisplay = <NoImages forSubreddit={subreddit} />;
    }

    return (
      <section id="section--gallery" className="flex flex--wrap">
        {imagesToDisplay}
      </section>
    );
  }
}
