import React from 'react';

interface FullscreenImageProps {
  url: string,
  closeFullScreen: Function,
};

export const FullscreenImage = ({url, closeFullScreen}: FullscreenImageProps) => (
  <div style={{backgroundImage: `url("${url}")`}} className="fullScreen flex flex-end">
    <i onClick={closeFullScreen} className="fa fa-times" aria-hidden="true" />
  </div>
);
