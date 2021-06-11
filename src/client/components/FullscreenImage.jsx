import React from 'react';

export const FullscreenImage = ({url, closeFullScreen}) => (
  <div style={{backgroundImage: `url("${url}")`}} className="fullScreen flex flex-end">
    <i onClick={closeFullScreen} className="fa fa-times" aria-hidden="true" />
  </div>
);
