import React from 'react';
import {SUB_REDDITS} from '../consts/';

interface SideBarProps {
  onRedditChange: Function,
}

export class SideBar extends React.Component<SideBarProps, {}> {
  handleOnEnterCustomSubreddit = (event: any) => {
    const {onRedditChange} = this.props;

    if (event.key === 'Enter') {
      onRedditChange(event.target.value);
    }
  }

  render () {
    const {onRedditChange} = this.props;

    const subredditsLinks = SUB_REDDITS.map(sub => {
      return <li key={sub}><span onClick={() => onRedditChange(sub)}>{sub}</span></li>
    })

    return (
      <div id="sidebar_nav">
        <div id="sidebar_links">
          <ul>
            {subredditsLinks}
            <li key="custom">
              <input
                type="text"
                placeholder="Custom subreddit..."
                onKeyPress={this.handleOnEnterCustomSubreddit}
              />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
