import React from 'react'

const RedditImagesSortOptionsComponent = ({sortOptions}) => {
  const options = sortOptions.map(sort => {
    return <li><span>{sort.label}</span></li>
  })
  return (
    <div id="reddit_sort_options">
      <ul>
        {options}
      </ul>
    </div>
  )
}

export default RedditImagesSortOptionsComponent
