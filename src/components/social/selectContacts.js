import React from 'react'
import { withSocial }  from './HOC/withSocial.js'
var _ = require('lodash')
import { pageTypes } from './options/pageTypes'

class SelectContacts extends React.Component {
  constructor(props){
    super(props)
  }
  render () {
    return (
      <div>
          {
            this.props.getAddContactOverlay()
          }
          {
            this.props.getAddTagOverlay()
          }
          {
            this.props.getTabs()
          }
        <div className='socialMap' style={this.props.getMapStyles()}>
          {
            this.props.getQuestion()
          }
          {
            this.props.getMap()
          }
          {
            this.props.getContactsLanes()
          }

          <div className='continue_btn_div' >
            <button className='btn btn-primary continue_btn pull-right'
              style={{display: this.props.props.doneSocial ? 'none' : ''}}
              onClick={() => { this.props.nextPage() }}>
                Continue
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default withSocial({
    type: pageTypes.SELECT_CONTACTS
})(SelectContacts);
