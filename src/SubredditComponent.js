import React, { Component } from 'react'
import axios from 'axios'

// import ImagesContainer from './ImagesContainer'
// import SideBarComponent from './SideBarComponent'

class SubredditComponent extends Component {

  constructor (props) {
    super(props)
    this.state = {
      images: [],
      subreddit: 'earthporn', // default subreddit to present images from
      options: {
        feedType: '',
        time: ''
      }
    }
    this.test()
  }

  componentDidMount () {
  }

  /*setNewSubreddit(params) {
    if (params && params.subreddit) {
      this.setState({
        subreddit: params.subreddit,

        images: []
      })
    } else {
      this.setState({
        images: []
      })
    }
  }*/

  extractImage(redditApiReturnedDataChild) {
    const imageObject = {};
    const childData = redditApiReturnedDataChild.data;

    imageObject.imageAuthor          = childData.author || 'NO AUTHOR INFO';
    imageObject.imageScore           = childData.score || 0;
    imageObject.imageTitle           = childData.title || 'NO TITLE'
    imageObject.id                   = childData.id;
    imageObject.submissionsPermalink = childData.permalink;

    const preview = childData.preview
    if (preview && preview.images) {
      preview.images.map((img) => {
        if (img.source && img.source.url) {
          imageObject.url = img.source.url;
        }
      });
    }
    return imageObject;
  }

  /*changeFeedType(feedOptions = {}) {
    this.asdasdasd(feedOptions);
  }*/

  asdasdasd(options = {}) {
    const subreddit = options.subreddit || this.state.subreddit;
    const feedType = options.feedType || '';
    const sort     = options.time

    let url = `https://www.reddit.com/r/${subreddit}`

    if (options.feedType && options.feedType != '') {
      url += `/${options.feedType}.json`;
    } else {
      url += '.json';
    }

    if (options.time && options.time != '') url += `?t=${options.time}`

    console.log(url);
    axios.get(url)
      .then((response) => {
        /*const childrens = response.data.data.children;
        const images = [];
        for (let children of childrens) {
          const image = this.extractImage(children);
          images.push(image);
        }

        console.log(images);
        this.setState({
          subreddit: subreddit,
          images: images
        });*/
      })
  }

  /*changeSubreddit(subreddit) {
    this.asdasdasd({ subreddit: subreddit });
  }*/

  render() {
    return(
      <div className="container">
        <h1 className="image_title">{ this.state.subreddit }</h1>
        {/* <ImagesContainer images={this.state.images || []} changeFeedType={this.changeFeedType}/>
        <SideBarComponent changeSubreddit={this.changeSubreddit}/> */}
      </div>
    )
  }

}

export default SubredditComponent
