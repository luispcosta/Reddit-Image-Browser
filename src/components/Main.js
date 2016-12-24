import React from 'react'

class Main extends React.Component {
  render () {
    return (
      <div id="wrapper">
        { this.props.children }
      </div>
    )
  }
}

export default Main
