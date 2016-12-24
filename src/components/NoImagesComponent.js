import React from 'react'

const NoImagesComponent = ({forSubreddit}) => {
  return (
    <div className="flex centerdiv flex--align-center flex--center">
      <h1>There are no images for {forSubreddit}!. Maybe it's an invalid one?</h1>
    </div>
  )
}

export default NoImagesComponent
