import React from 'react'

class RedditImagesSortOptionsComponent extends React.Component {

  constructor (props) {
    super(props)

    this.handleSortingChange = this.handleSortingChange.bind(this)
  }

  handleSortingChange (e) {
    const links = document.querySelectorAll('.link_sorting')
    links.forEach(link => link.classList.remove('active'))
    e.target.classList.add('active')

    this.props.handleSortingChange(e.target.getAttribute('data-link'))
  }

  render () {
    const options = this.props.sortOptions.map(sort => {
      return <li key={sort.link}><span className="link_sorting" data-link={sort.link} onClick={this.handleSortingChange}>{sort.label}</span></li>
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
