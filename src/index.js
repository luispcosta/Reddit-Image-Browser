import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import fetchImages, { SORT_OPTIONS, DEFAULT_SUBREDDIT, fetchControversialImages, fetchNewImages, fetchRisingImages, fetchTopImages } from './connectors/Api'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      urls: [],
      loading: true
    }
    this.fetchDefaultImages = this.fetchDefaultImages.bind(this)
  }
  componentDidMount () {
    this.fetchDefaultImages()
  }

  async fetchDefaultImages () {
    const urls = await fetchImages()
    this.setState({
      loading: false,
      urls: urls
    })
  }

  render () {
    if (this.state.loading === true) {
      return <h1>Loading..</h1>
    } else {
      console.log(this.state.urls)
      const imgs = this.state.urls.map(img => {
        const style = {
          backgroundImage: `url("${img}")`
        }
        return <div className="asd" style={style}></div>
      })
      return <div>{imgs}</div>
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
