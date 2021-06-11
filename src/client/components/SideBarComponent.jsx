import React from 'react';

export class SideBarComponent extends React.Component {
  changeSubreddit = (e) => {
    const {handleSubredditChange} = this.props;
    handleSubredditChange(e.target.innerHTML);
  }

  render() {
    const {subreddits} = this.props;

    const subredditsLinks = subreddits.map((sub) => <li key={sub}><button type="button" onClick={this.changeSubreddit}>{sub}</button></li>);

    return (
      <div id="sidebar_nav">
        <div id="sidebar_links">
          <ul>
            {subredditsLinks}
          </ul>
        </div>
      </div>
    );
  }
}
