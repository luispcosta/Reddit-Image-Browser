import React from 'react';

interface NoImageProps {
  forSubreddit: string,
};

export const NoImages = ({forSubreddit}: NoImageProps) => (
  <div className="flex centerdiv flex--align-center flex--center">
    <h1>
      There are no images for subreddit
      &nbsp;
      {forSubreddit}.
      Maybe this subreddit is does not exist.
    </h1>
  </div>
);
