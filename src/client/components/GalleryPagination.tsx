import React from 'react';

interface GalleryPaginationProps {
  onNextClick: Function,
  onPrevClick: Function,
  isNextDisabled: boolean,
  isPrevDisabled: boolean,
}

export class GalleryPagination extends React.Component<GalleryPaginationProps, {}> {
  render() {
    const {onNextClick, onPrevClick, isNextDisabled, isPrevDisabled} = this.props;

    return (
      <div>
        {!isPrevDisabled && <span onClick={onPrevClick}>&lt;</span>}
        {!isNextDisabled && <span onClick={onNextClick}>&gt;</span>}
      </div>
    )
  }
}
