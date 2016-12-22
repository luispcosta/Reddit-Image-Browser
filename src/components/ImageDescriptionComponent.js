import React, { Component } from 'react' // eslint-disable-line no-unused-vars

const ImageDescriptionComponent = ({imageAttrs}) => {
  return (
    <div className="hover-state">
      <div id="image_description">
        <p>{imageAttrs.title}</p>
        <p>{imageAttrs.score} Upvotes <i className="fa fa-arrow-up" aria-hidden="true"></i></p>
        <p>{imageAttrs.author} <i className="fa fa-user-o" aria-hidden="true"></i></p>
      </div>
    </div>
  )
}

export default ImageDescriptionComponent
