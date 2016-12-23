import React, { Component } from 'react' // eslint-disable-line no-unused-vars

class Main extends Component {
  render () {
    return (
      <div id="wrapper">
        { this.props.children }
      </div>
    )
  }
}

export default Main
