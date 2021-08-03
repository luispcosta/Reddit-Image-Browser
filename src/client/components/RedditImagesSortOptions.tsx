import React from 'react';

interface SortOption {
  link: string,
  label: string,
};

interface ImageSortOptionsProps {
  handleSortingChange: Function,
  sortOptions: Array<SortOption>,
}

export class RedditImagesSortOptions extends React.Component<ImageSortOptionsProps, {}> {
  handleSortingChange = (event: any) => {
    const {handleSortingChange} = this.props;

    const links = document.querySelectorAll('.link_sorting');
    links.forEach((link) => link.classList.remove('active'));
    event.target.classList.add('active');

    handleSortingChange(event.target.getAttribute('data-link'));
  }

  render() {
    const {sortOptions} = this.props;

    const options = sortOptions.map((sort) => (
      <li key={sort.link}>
        <button
          type="button"
          className="link_sorting"
          data-link={sort.link}
          onClick={this.handleSortingChange}
        >
          {sort.label}
        </button>
      </li>
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
