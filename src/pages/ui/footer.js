import React from 'react'

export default class Footer extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    return (
      <div className='logo_container'>
        <div className='logos'>
          <div className='footerLogo connections' />
          <div className='footerLogo njit' />
          <div className='footerLogo nsf' />
        </div>
      </div>
    )
  }
}
