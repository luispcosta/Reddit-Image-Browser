import React, { Component } from 'react'

class SideBarComponent extends Component {

  constructor (props) {
    super(props)

    this.changeSubreddit = this.changeSubreddit.bind(this)
  }

  changeSubreddit (e) {
    this.props.handleSubredditChange(e.target.innerHTML)
  }

  render () {
    const subredditsLinks = this.props.subreddits.map(sub => {
      return <li key={sub}><span onClick={this.changeSubreddit}>{sub}</span></li>
    })

    return (
      <div id="sidebar_nav">
        <div id="sidebar_links">
          <ul>
            {subredditsLinks}
          </ul>
        </div>
      </div>
    )
  }
}

SideBarComponent.propTypes = {
  subreddits: React.PropTypes.array
}

export default SideBarComponent
