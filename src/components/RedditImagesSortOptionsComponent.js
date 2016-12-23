import React from 'react'

class RedditImagesSortOptionsComponent extends React.Component {

  constructor (props) {
    super(props)

    this.handleSortingChange = this.handleSortingChange.bind(this)
  }

  handleSortingChange (e) {
    this.props.handleSortingChange(e.target.getAttribute('data-link'))
  }

  render () {
    const options = this.props.sortOptions.map(sort => {
      return <li><span data-link={sort.link} onClick={this.handleSortingChange}>{sort.label}</span></li>
    })
    return (
      <div id="reddit_sort_options">
        <ul>
          {options}
        </ul>
      </div>
    )
  }
}

RedditImagesSortOptionsComponent.PropTypes = {
  handleSubredditChange: React.PropTypes.func
}

export default RedditImagesSortOptionsComponent
