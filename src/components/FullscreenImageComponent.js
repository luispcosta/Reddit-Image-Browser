import React from 'react'

class FullscreenImageComponent extends React.Component {

  render () {
    const styles = {
      backgroundImage: `url("${this.props.url}")`
    }
    return (
      <div style={styles} className="fullScreen flex flex-end">
        <i onClick={this.props.closeFullScreen} className="fa fa-times" aria-hidden="true"></i>
      </div>
    )
  }
}

FullscreenImageComponent.PropTypes = {
  closeFullScreen: React.PropTypes.func
}

export default FullscreenImageComponent
