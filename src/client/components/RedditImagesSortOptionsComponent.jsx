import React from 'react';

export class RedditImagesSortOptionsComponent extends React.Component {
  handleSortingChange = (e) => {
    const {handleSortingChange} = this.props;

    const links = document.querySelectorAll('.link_sorting');
    links.forEach((link) => link.classList.remove('active'));
    e.target.classList.add('active');

    handleSortingChange(e.target.getAttribute('data-link'));
  }

  render() {
    const {sortOptions} = this.props;

    const options = sortOptions.map((sort) => (
      <li key={sort.link}><button type="button" className="link_sorting" data-link={sort.link} onClick={this.handleSortingChange}>{sort.label}</button></li>
    ));

    return (
      <div id="reddit_sort_options">
        <ul>
          {options}
        </ul>
      </div>
    );
  }
}
