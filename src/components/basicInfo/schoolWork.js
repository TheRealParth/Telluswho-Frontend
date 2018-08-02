import React from 'react'
import MiniProfile from './miniprofile'
import Select from 'react-select'
import { graduateOptions, undergraduateOptions } from './options/majorOptions'
import { organizationsOptions } from './options/organizationsOptions'
import { countryOptions } from './options/countryOptions'
import { internationalStudentStatusOptions } from './options/internationalStudentStatusOptions'
import { lengthOfStayAtNJITOptions } from './options/lengthOfStayAtNJITOptions'
import { browserHistory } from 'react-router'
import { increaseProgress, postSchoolWork } from '../../actions/surveyAction.js'
import { connect } from 'react-redux'

@connect((store) => {
  return {
  		user: _.isEmpty(store.user.user) ? store.survey.user : store.user.user,
  		profile:store.survey.profile,
  		progress:store.survey.progress,
    error: store.user.error
  }
})

export default class SchoolWork extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      graduate:'',
      fulltime:'',
      firstYear:'',
      internationalStudentStatus:'',
      majors:'',
      workField:'',
      workPlace:'',
      volunteerField:'',
      volunteerPlace:'',
      organizations:'',
      lengthOfStayAtNJIT: '',
      doesWork:0,
      doesVolunteer:0,
      onCampus:0,
      error:'',
      showError:false
    }
  }
  handleInput (type, event) {
    this.setState({ showError:false, error:'' })
    switch (type) {
      case 'firstYear': {
        // if(parseInt(event.target.value) > 1900 && parseInt(event.target.value) < 2020)
        this.setState({ firstYear: event.target.value })
        break
      }
      case 'workField': {
        this.setState({ workField:event.target.value })
        break
      }
      case 'workPlace': {
        this.setState({ workPlace:event.target.value })
        break
      } case 'volunteerPlace': {
        this.setState({ volunteerPlace:event.target.value })
        break
      }
      case 'volunteerField': {
        this.setState({ volunteerField:event.target.value })
        break
      }
    }
  }
  handleDropdown (type, value) {
    this.setState({ showError:false, error:'' })
    switch (type) {
      case 'major': {
        var major = []
		        value.forEach(val => {
		          major.push(val.value)
		        })
        this.setState({ majors:major })
        break
      }
      case 'internationalStudentStatus': {
        this.setState({ internationalStudentStatus: value.value });
        break;
      }
      case 'organizations': {
        var orgs = []
		        value.forEach(val => {
		          orgs.push(val.value)
		        })
        this.setState({ organizations:orgs })
        break
      }
      case 'lengthOfStayAtNJIT' : {
        this.setState({ lengthOfStayAtNJIT : value.value })
        break
      }
    }
  }
  isActive (value) {
    var temp
 		if (value == 'graduate') {
 			temp = this.state.graduate
 			return 'btn btn-default ' + ((temp == 1) ? 'active' : 'default')
 		} 		else if (value == 'undergraduate') {
 			temp = this.state.graduate
 			return 'btn btn-default ' + ((temp == 2) ? 'active' : 'default')
 		} 		else if (value == 'fulltime') {
 			temp = this.state.fulltime
 			return 'btn btn-default ' + ((temp == 1) ? 'active' : 'default')
 		} 		else if (value == 'parttime') {
 			temp = this.state.fulltime
 			return 'btn btn-default ' + ((temp == 2) ? 'active' : 'default')
 		} 		else if (value == 'doesWork') {
 		 	return 'btn continue_btn pull-right work ' + ((this.state.doesWork == 2) ? 'active' : 'default')
 		}    	else if (value == 'doesVolunteer') {
 		 	return 'btn continue_btn pull-right work ' + ((this.state.doesVolunteer == 2) ? 'active' : 'default')
 		}
  	}
 	setBtnVal (val) {
 		this.setState({ showError:false, error:'' })
 		if (val == 'graduate') {
 			this.setState({ graduate:1 })
 		} 		else if (val == 'undergraduate') {
 			this.setState({ graduate:2 })
 		} 		else if (val == 'fulltime') {
 			this.setState({ fulltime:1 })
 		} 		else if (val == 'parttime') {
 			this.setState({ fulltime:2 })
 		} 		else if (val == 'doesWork') {
 			if (this.state.doesWork == 0) {
 				this.setState({ doesWork:2 })
 			} 			else if (this.state.doesWork == 1) {
 				this.setState({ doesWork:2 })
 			} 			else if (this.state.doesWork == 2) {
 				this.setState({ doesWork:1 })
 			}
 		} 		else if (val == 'doesVolunteer') {
 			if (this.state.doesVolunteer == 0) {
 				this.setState({ doesVolunteer:2 })
 			} 			else if (this.state.doesVolunteer == 1) {
 				this.setState({ doesVolunteer:2 })
 			} 			else if (this.state.doesVolunteer == 2) {
 				this.setState({ doesVolunteer:1 })
 			}
 		}
 	}
 	getMajor () {
 		if (this.state.graduate == 2) {
 			return (<Select className='customDropdown' tabSelectsValue={false}  value={this.state.majors} onChange={this.handleDropdown.bind(this, 'major')}
   clearable={this.state.clearable} multi options={undergraduateOptions} placeholder='Select a major' />)
 		} 		else if (this.state.graduate == 1) {
 			return (<Select className='customDropdown' tabSelectsValue={false}  value={this.state.majors} onChange={this.handleDropdown.bind(this, 'major')}
   clearable={this.state.clearable} multi options={graduateOptions} placeholder='Select a major' />)
 		} else {
   return (<p>Please select your student type </p>)
 }
 	}
  nextPage () {
    var obj = {
			  organizations: this.state.organizations == 'None' ? '' : this.state.organizations,
        internationalStudentStatus: this.state.internationalStudentStatus,
		    majors: this.state.majors,
		    onCampus: this.state.onCampus, // 0 unset 1 is true 2 is false
		    graduate: this.state.graduate, // 0 unset 1 is true 2 is false
		    studentType:this.state.fulltime, // 1 is fullTime 2 is part time
		    doesWork:this.state.doesWork, // 0 unset 1 is true 2 is false
		    doesVolunteer:this.state.doesVolunteer, // 0 unset 1 is true 2 is false
		    workField: this.state.workField,
		    workPlace: this.state.workPlace,
		    volunteerField: this.state.volunteerField,
		    volunteerPlace: this.state.volunteerPlace,
		    firstYear: this.state.firstYear,
        lengthOfStayAtNJIT: this.state.lengthOfStayAtNJIT
    }

    this.props.dispatch(postSchoolWork(obj)).then((res) => {
      if (res.type != 'DATA_ERR') {
        this.props.dispatch(increaseProgress())
        browserHistory.push('/interests')
      } else {
        this.setState({ showError:true, error: this.props.error })
      }
      window.scrollTo(0, 0)
    })
  }
  render () {
    return (
      <div>
        <h2 className='section_title left'>
		    		Please answer the questions below
		    	</h2>
        <div className='error'>{this.state.error}</div>
        <div className='survey_container barFix' >
          <div className='row margin0'>
            <div className='col-md-4 col-sm-4 formBox'>
              <div className='formWrapper'>
                <label>Student Status</label>
                <br />
                <div className='btn-group btn-group-sm school no-highlight'>
                  <button type='button' className={this.isActive('undergraduate')} onClick={this.setBtnVal.bind(this, 'undergraduate')}>Undergraduate</button>
                  <button type='button' className={this.isActive('graduate')} onClick={this.setBtnVal.bind(this, 'graduate')}>Graduate</button>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-sm-4 formBox'>
              <div className='formWrapper'>
                <label>Student Type</label>
                <br />
                <div className='btn-group btn-group-sm school no-highlight'>
                  <button type='button' className={this.isActive('parttime')} onClick={this.setBtnVal.bind(this, 'parttime')}>Part-Time</button>
                  <button type='button' className={this.isActive('fulltime')} onClick={this.setBtnVal.bind(this, 'fulltime')}>Full Time</button>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-sm-4 formBox' style={{ display: (this.state.graduate == 1) ? 'flex' : 'none' }}>
                <div className='formWrapper firstYear'>
                  <label>Length Of Time At NJIT</label>
                   <Select className='customDropdown' value={this.state.lengthOfStayAtNJIT} onChange={this.handleDropdown.bind(this, 'lengthOfStayAtNJIT')}
                      clearable={this.state.clearable} tabSelectsValue={false}  options={lengthOfStayAtNJITOptions} placeholder='' />
                </div>  
            </div>
            <div className='col-md-4 col-sm-4 formBox' style={{ display: (this.state.graduate == 2 || this.state.graduate == '') ? 'flex' : 'none' }}>
              <div className='formWrapper firstYear'>
                <label>Year first attended NJIT</label>
                <input type='text' maxLength='4' value={this.state.firstYear} onChange={this.handleInput.bind(this, 'firstYear')} />
              </div>
            </div>
          </div>
          <div className='row margin0'>
            <div className='col-md-12 col-sm-12 formBox no-right-border'>
              <div className='formWrapper'>
                <label>Are you an international student?</label>
                <Select className='customDropdown' tabSelectsValue={false}  value={this.state.internationalStudentStatus} onChange={this.handleDropdown.bind(this, 'internationalStudentStatus')}
                  clearable={this.state.clearable} options={internationalStudentStatusOptions} placeholder='' />
              </div>
            </div>
          </div>
          <div className='row margin0'>
            <div className='col-md-12 col-sm-12 formBox no-right-border'>
              <div className='formWrapper'>
                <label>What is/are your current major/s?</label>
                {this.getMajor()}
              </div>
            </div>
          </div>
          <div className='row margin0'>
            <div className='col-md-12 col-sm-12 formBox no-right-border'>
              <div className='formWrapper'>
                <label>Please select any campus organizations you are involved in</label>
                <Select className='customDropdown' value={this.state.organizations} onChange={this.handleDropdown.bind(this, 'organizations')}
                  clearable={this.state.clearable} tabSelectsValue={false}  multi options={organizationsOptions} placeholder='Select campus organizations' />
              </div>
            </div>
          </div>
          <div className='row margin0 bigBox'>
            <div className='col-md-12 col-sm-12 formBox single'>
              <label>Work</label>
              <button type='button' className={this.isActive('doesWork')} onClick={this.setBtnVal.bind(this, 'doesWork')} style={{ 'fontSize':'0.8em', 'margin':'10px' }}>I do not work</button>
              <div className='flexHalfWrapper no-right-border' style={this.state.doesWork == 2 ? { 'display':'none' } : {}}>
                <div className='flexHalf flexTopLeft flexBottomLeft sizeUp no-right-border'>
                  <p className='flexHalfSubtitle'>What field of work are you in?</p>
                  <input className='oneLiner' type='textarea' placeholder='Field of work' value={this.state.workField} onChange={this.handleInput.bind(this, 'workField')} />
                </div>
                <div className='flexHalf flexTopRight flexBottomRight sizeUp'>
                  <p className='flexHalfSubtitle'>What company/organization are you working for?</p>
                  <input type='textarea' placeholder='Company/Organization' value={this.state.workPlace} onChange={this.handleInput.bind(this, 'workPlace')} />
                </div>
              </div>
            </div>
          </div>
          <div className='row margin0 bigBox bottom'>
            <div className='col-md-12 col-sm-12 formBox single'>
              <label>Volunteer</label>
              <button type='button' className={this.isActive('doesVolunteer')} onClick={this.setBtnVal.bind(this, 'doesVolunteer')} style={{ 'fontSize':'0.8em', 'margin':'10px' }}>I do not volunteer</button>
              <div className='flexHalfWrapper bottom' style={this.state.doesVolunteer == 2 ? { 'display':'none' } : {}}>
                <div className='flexHalf flexTopLeft flexBottomLeft sizeUp no-right-border'>
                  <p className='flexHalfSubtitle'>What field of volunteer work are you in?</p>
                  <input className='oneLiner' type='textarea' placeholder='Field of work' value={this.state.volunteerField} onChange={this.handleInput.bind(this, 'volunteerField')} />
                </div>
                <div className='flexHalf flexTopRight flexBottomRight sizeUp'>
                  <p className='flexHalfSubtitle'>What organization are you volunteering for?</p>
                  <input type='textarea' placeholder='Company/Organization' value={this.state.volunteerPlace} onChange={this.handleInput.bind(this, 'volunteerPlace')} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <MiniProfile user={this.props.user} backgroundInfo={this.props.profile.backgroundInfo} schoolAndWork={this.state} />
        <div className='continue_btn_div no-highlight' >
          <button className='btn btn-primary continue_btn pull-right no-highlight' onClick={this.nextPage.bind(this)}>Continue</button>
        </div>
      </div>
    )
  }
}
