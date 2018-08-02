import React from 'react'
import Logo from './logo'

export default class Footer extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return (
      <div className='header'>
        <Logo />

      </div>
    )
  }
}
