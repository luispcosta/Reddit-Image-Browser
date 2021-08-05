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
      <div className="gallery_pagination">
        {!isPrevDisabled && (
          <span className="gallery_pagination--prev" onClick={onPrevClick}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </span>
        )}
        {!isNextDisabled && (
          <span className="gallery_pagination--next" onClick={onNextClick}>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </span>
        )}
      </div>
    )
  }
}
