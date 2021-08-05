import React from 'react';

interface NoImageProps {
  forSubreddit: string,
};

export const NoImages = ({forSubreddit}: NoImageProps) => (
  <div className="no_images flex centerdiv flex--align-center flex--center">
    <h3>
      No images found for subreddit {forSubreddit}
    </h3>
  </div>
);
