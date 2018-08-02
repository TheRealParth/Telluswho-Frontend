import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/userAuth'
import { clearSurveyData } from '../../actions/surveyAction'
import { browserHistory } from 'react-router'
@connect((store) => {
  return {
    progress:store.survey.progress
  }
})

export default class TopNav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  logout () {
    this.props.dispatch(logout()).then((ugh)=>{
        setTimeout(()=>{
          browserHistory.replace('/login')
        }, 200)
    })
    this.props.dispatch(clearSurveyData())

  }
  render () {
	    return (
  <div className='topbar'>
    <span className='pull-right' onClick={this.logout.bind(this)}>Log out</span>
    <ul className='topNav'>
      <li className='topNavItem'>
	    			Scientific Survey
			        <div className={'circle ' + (this.props.progress >= 3 ? 'complete' : '') + (this.props.progress < 3 ? 'active' : '')}>
  <h1 style={this.props.progress >= 3 ? { 'display':'none' } : {}}>1</h1>
  <div className='check' style={this.props.progress < 3 ? { 'display':'none' } : {}}><span className='glyphicon glyphicon-ok' /></div>
			        </div>
      </li>
      <div className='seperator'>
        <li className='topNavItem small-item' style={this.props.progress >= 3 ? { 'display':'none' } : {}}>
          <span className='bubble'>Community</span>
          <div className={'small-circle ' + (this.props.progress >= 1 ? 'complete' : '') + (this.props.progress == 0 ? 'active' : '')} />
        </li>
        <li className='topNavItem small-item' style={this.props.progress >= 3 ? { 'display':'none' } : {}}>
          <span className='bubble'>Sociability</span>
          <div className={'small-circle ' + (this.props.progress >= 2 ? 'complete' : '') + (this.props.progress == 1 ? 'active' : '')} />
        </li>
        <li className='topNavItem small-item' style={this.props.progress >= 3 ? { 'display':'none' } : {}}>
          <span className='bubble'>Wellbeing</span>
          <div className={'small-circle ' + (this.props.progress >= 3 ? 'complete' : '') + (this.props.progress == 2 ? 'active' : '')} />
        </li>
      </div>
      <li className='selected topNavItem'>
	            	Basic Info
		            <div className={'circle ' + (this.props.progress >= 5 ? 'complete' : '') + (this.props.progress > 2 && this.props.progress < 5 ? 'active' : '')}>
  <h1 style={this.props.progress >= 5 ? { 'display':'none' } : {}}>2</h1>
  <div className='check' style={this.props.progress < 5 ? { 'display':'none' } : {}}><span className='glyphicon glyphicon-ok' /></div>
		            </div>
      </li>
      <div className='seperator'>
        <li className='topNavItem small-item' style={(this.props.progress < 3 || this.props.progress > 4) ? { 'display':'none' } : {}}>
          <span className='bubble'>Background Info</span>
          <div className={'small-circle ' + (this.props.progress >= 4 ? 'complete' : '') + (this.props.progress == 3 ? 'active' : '')} />
        </li>
        <li className='topNavItem small-item' style={(this.props.progress < 3 || this.props.progress > 4) ? { 'display':'none' } : {}}>
          <span className='bubble'>School and Work</span>
          <div className={'small-circle ' + (this.props.progress >= 5 ? 'complete' : '') + (this.props.progress == 4 ? 'active' : '')} />
        </li>
      </div>
      <li className='topNavItem'>
	            	Interests
		            <div className={'circle ' + (this.props.progress >= 13 ? 'complete' : '') + (this.props.progress > 4 && this.props.progress < 13 ? 'active' : '')}>
  <h1 style={this.props.progress >= 13 ? { 'display':'none' } : {}}>3</h1>
  <div className='check' style={this.props.progress < 13 ? { 'display':'none' } : {}}>
    <span className='glyphicon glyphicon-ok' />
  </div>
		            </div>
      </li>
      <div className='seperator'>
        <li className='topNavItem small-item' style={(this.props.progress < 5 || this.props.progress > 12) ? { 'display':'none' } : {}}>
          <span className='bubble'>Your Interests</span>
          <div className={'small-circle ' + (this.props.progress >= 6 ? 'complete' : '') + (this.props.progress == 5 ? 'active' : '')} />
        </li>
        <li className='topNavItem small-item' style={(this.props.progress < 5 || this.props.progress > 12) ? { 'display':'none' } : {}}>
          <span className='bubble'>Passion Level</span>
          <div className={'small-circle ' + (this.props.progress >= 7 ? 'complete' : '') + (this.props.progress == 6 ? 'active' : '')} />
        </li>
        <li className='topNavItem small-item' style={(this.props.progress < 5 || this.props.progress > 12) ? { 'display':'none' } : {}}>
          <span className='bubble'>Expertise Level</span>
          <div className={'small-circle ' + (this.props.progress >= 8 ? 'complete' : '') + (this.props.progress == 7 ? 'active' : '')} />
        </li>
        <li className='topNavItem small-item' style={(this.props.progress < 5 || this.props.progress > 12) ? { 'display':'none' } : {}}>
          <span className='bubble'>Willing to Teach</span>
          <div className={'small-circle ' + (this.props.progress >= 9 ? 'complete' : '') + (this.props.progress == 8 ? 'active' : '')} />
        </li>
        <li className='topNavItem small-item' style={(this.props.progress < 5 || this.props.progress > 12) ? { 'display':'none' } : {}}>
          <span className='bubble'>Activities in groups</span>
          <div className={'small-circle ' + (this.props.progress >= 10 ? 'complete' : '') + (this.props.progress == 9 ? 'active' : '')} />
        </li>
        <li className='topNavItem small-item' style={(this.props.progress < 5 || this.props.progress > 12) ? { 'display':'none' } : {}}>
          <span className='bubble'>Group Method</span>
          <div className={'small-circle ' + (this.props.progress >= 11 ? 'complete' : '') + (this.props.progress == 10 ? 'active' : '')} />
        </li>
        <li className='topNavItem small-item' style={(this.props.progress < 5 || this.props.progress > 12) ? { 'display':'none' } : {}}>
          <span className='bubble'>Looking for others</span>
          <div className={'small-circle ' + (this.props.progress >= 12 ? 'complete' : '') + (this.props.progress == 11 ? 'active' : '')} />
        </li>
        <li className='topNavItem small-item' style={(this.props.progress < 5 || this.props.progress > 12) ? { 'display':'none' } : {}}>
          <span className='bubble'>Places</span>
          <div className={'small-circle ' + (this.props.progress >= 13 ? 'complete' : '') + (this.props.progress == 12 ? 'active' : '')} />
        </li>
      </div>
      <li className='topNavItem'>
					Profile
		            <div className={'circle ' + (this.props.progress >= 14 ? 'complete' : '') + (this.props.progress == 13 ? 'active' : '')}>
  <h1 style={this.props.progress >= 14 ? { 'display':'none' } : {}}>4</h1>
  <div className='check' style={this.props.progress < 14 ? { 'display':'none' } : {}}>
    <span className='glyphicon glyphicon-ok' />
  </div>
	            	</div>
      </li>
      <div className='seperator'>
        <li className='topNavItem small-item' style={(this.props.progress != 13) ? { 'display':'none' } : {}}>
          <span className='bubble'>Profile Review</span>
          <div className={'small-circle ' + (this.props.progress >= 14 ? 'complete' : '') + (this.props.progress == 13 ? 'active' : '')} />
        </li>
      </div>
      <li className='topNavItem'>
		            Social
		            <div className={'circle ' + (this.props.progress == 15 ? 'complete' : '') + (this.props.progress == 14 ? 'active' : '')} >
  <h1 style={this.props.progress >= 15 ? { 'display':'none' } : {}}>5</h1>
  <div className='check' style={this.props.progress < 15 ? { 'display':'none' } : {}}>
    <span className='glyphicon glyphicon-ok' />
  </div>
		            </div>
      </li>
      <div className='seperator'>
        <li className='topNavItem small-item' style={this.props.progress != 14 ? { 'display':'none' } : {}}>
          <span className='bubble'>Contacts</span>
          <div className={'small-circle ' + (this.props.progress >= 15 ? 'complete' : '') + (this.props.progress == 14 ? 'active' : '')} />
        </li>
        {/* <li className="topNavItem small-item" style={this.props.progress<14?{"display":"none"}:{}}>
	                	<span className="bubble"></span>
	                    <div className={"small-circle "+(this.props.progress>=16?"complete":"")+(this.props.progress==15?"active":"")}>
	                    </div>
	                </li> */}
      </div>
      <li className='topNavItem'>
		            Coordinating
		            <div className={'circle ' + (this.props.progress == 16 ? 'complete' : '') + (this.props.progress == 15 ? 'active' : '')} >
  <h1 style={this.props.progress >= 16 ? { 'display':'none' } : {}}>6</h1>
  <div className='check' style={this.props.progress < 16 ? { 'display':'none' } : {}}>
    <span className='glyphicon glyphicon-ok' />
  </div>
		            </div>
      </li>
      <div className='seperator' style={this.props.progress != 15 ? { 'display':'none' } : {}}>
        <li className='topNavItem small-item' >
          <span className='bubble'>create teeup</span>
          <div className={'small-circle ' + (this.props.progress >= 16 ? 'complete' : '') + (this.props.progress == 15 ? 'active' : '')} />
        </li>
      </div>
    </ul>
  </div>
	 	)
 	}
}
