import React from 'react';

interface NoImageProps {
  forSubreddit: string,
};

export const NoImages = ({forSubreddit}: NoImageProps) => (
  <div className="flex centerdiv flex--align-center flex--center">
    <h1>
      There are no images for
      {forSubreddit}
      !.
      Maybe it is an invalid one?
    </h1>
  </div>
);
