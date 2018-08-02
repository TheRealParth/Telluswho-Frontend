/**
 * Created by isg6 on 4/6/2017.
 */
import React, { Component } from 'react'

export default class ContentArea extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cooProgress: props.cooProgress,
      pageDetails: [

        { heading:'Congratulations',
          desc:''
        },
        {
          heading: 'Choose a Topic',
          desc: 'Here are all the Social Groups, Organizations and Interests you told us about. Please select one ' +
          'that you would like to start a TeeUp about. For the moment, this will also function as the TeeUp\'s ' +
          'title, but you will be able to change that later'
        },
        {
          heading: 'Choose a Topic',
          desc: 'Here are all the Social Groups, Organizations and Interests you told us about. Please select one ' +
          'that ' + 'you would like to start a TeeUp about. For the moment, this will also function as the TeeUp\'s ' +
          'title, but you will be able to change that later'
        },

        {
          heading: 'Invite Participants',
          desc: 'Here are all the people you told us about who are also [members of | involved with | interested in] ' +
          props.teeupTitle +
          '.' +
          'Please select the ones you would like to invite to this TeeUp. If there are others not listed here who you' +
          'would also like to invite, don\'t worry, you will be able to invite them later'
        },
        {
          heading: 'Invite Participants',
          desc: 'Here are all the people you told us about who are also [members of | involved with | interested in] ' +
          props.teeupTitle + '.' +
          'Please select the ones you would like to invite to this TeeUp. If there are others not listed here who you' +
          'would also like to invite, don\'t worry, you will be able to invite them later'
        },

        {
          heading: 'Pick a Location',
          desc: ''
        },
        {
          heading: 'Pick a Location',
          desc: ''
        },

        {
          heading: 'Congratulations',
          desc: 'You have successfully drafted your first Teeup'
        }
      ]
    }
  }
  render () {
    const cooProgress = this.state.cooProgress
    const pageDetails = this.state.pageDetails
    

    return (
      <div style={{marginLeft: '15%'}}>
        <div className='Heading-holder' >
          {/* <h2 className='remove-top-margin'>{pageDetails[cooProgress].heading}</h2> */}
          <h2 className='remove-top-margin'>Thanks for participating. If you would like to be contacted about other research projects or joining the Connections Lab, please email sa722@njit.edu</h2>
        </div>
        {/* <div className='desc-holder'>
          <h6>{pageDetails[cooProgress].desc}</h6>
        </div>
        <div>
          Content
        </div> */}
      </div>
    )
  }
}

// ContentArea.propTypes = {
//   cooProgress: React.PropTypes.number,
//   teeupTitle: React.PropTypes.string
// }
