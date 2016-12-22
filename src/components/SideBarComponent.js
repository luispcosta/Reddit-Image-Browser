import React, { Component } from 'react'

class SideBarComponent extends Component {

  render () {
    const subredditsLinks = this.props.subreddits.map(sub => {
      return <li><span onClick={this.changeSubreddit}>{sub}</span></li>
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
