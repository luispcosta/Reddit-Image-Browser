import React from 'react';

export const NoImagesComponent = ({forSubreddit}) => (
  <div className="flex centerdiv flex--align-center flex--center">
    <h1>
      There are no images for
      {forSubreddit}
      !.
      Maybe it is an invalid one?
    </h1>
  </div>
);
