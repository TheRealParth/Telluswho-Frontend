import React, { Component } from 'react'
import TeeupList from './teeupList'
import ContentArea from './contentArea'

export default class CoordinatingHome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cooProgress: 1
    }
  }

  changeCooProg = () => {
    this.setState({ cooProgress: this.state.cooProgress + 1 })
  }

  render () {
    let cooProgress = this.state.cooProgress
    

    return (
      <div className='coo-cont-main'>
        <div className='select-area'><ContentArea cooProgress={cooProgress} /></div>
        <div className='teeup-area'><TeeupList cooProgress={cooProgress} /></div><br /> <br />

        {/* <div className='continue_btn_div' style={{ 'width':'100%' }}>
          <button className='btn btn-primary continue_btn pull-right' onClick={this.changeCooProg}>Continue</button>
        </div> */}

      </div>
    )
  }
}
