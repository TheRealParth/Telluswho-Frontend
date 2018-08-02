import React from 'react'
import Select from 'react-select'
import { graduateOptions, undergraduateOptions } from '../basicInfo/options/majorOptions'
import { lengthOfStayAtNJITOptions } from '../basicInfo/options/lengthOfStayAtNJITOptions'
import { internationalStudentStatusOptions } from '../basicInfo/options/internationalStudentStatusOptions'
import { organizationsOptions } from '../basicInfo/options/organizationsOptions'
import { countryOptions } from '../basicInfo/options/countryOptions'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

export default class SchoolWorkModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.schoolAndWork.id,
      graduate: this.props.schoolAndWork.graduate,
      firstYear: this.props.schoolAndWork.firstYear,
      majors: this.props.schoolAndWork.majors,
      studentType: this.props.schoolAndWork.studentType,
      workField: this.props.schoolAndWork.workField,
      workPlace: this.props.schoolAndWork.workPlace,
      volunteerField:this.props.schoolAndWork.volunteerField,
      volunteerPlace:this.props.schoolAndWork.volunteerPlace,
      organizations: this.props.schoolAndWork.organizations,
      doesWork: this.props.schoolAndWork.doesWork,
      doesVolunteer: this.props.schoolAndWork.doesVolunteer,
      onCampus: this.props.schoolAndWork.onCampus,
      lengthOfStayAtNJIT: this.props.schoolAndWork.lengthOfStayAtNJIT,
      internationalStudentStatus: this.props.schoolAndWork.internationalStudentStatus,
    }
  }
  handleInput (type, event) {
    switch (type) {
      case 'firstYear': {
        this.setState({ firstYear:parseInt(event.target.value) })
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
    switch (type) {
      case 'majors': {
        var majors = []
		        value.forEach(val => {
		          majors.push(val.value)
		        })
        this.setState({ majors:majors })
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
 			temp = this.state.studentType
 			return 'btn btn-default ' + ((temp == 1) ? 'active' : 'default')
 		} 		else if (value == 'parttime') {
 			temp = this.state.studentType
 			return 'btn btn-default ' + ((temp == 2) ? 'active' : 'default')
 		} 		else if (value == 'doesWork') {
 		 	return 'btn continue_btn pull-right ' + ((this.state.doesWork == 2) ? 'active' : 'default')
 		}    	else if (value == 'doesVolunteer') {
 		 	return 'btn continue_btn pull-right ' + ((this.state.doesVolunteer == 2) ? 'active' : 'default')
 		}
  	}
 	setBtnVal (val) {
 		if (val == 'graduate') {
 			this.setState({ graduate:1 })
 		} 		else if (val == 'undergraduate') {
 			this.setState({ graduate:2 })
 		} 		else if (val == 'fulltime') {
 			this.setState({ studentType:1 })
 		} 		else if (val == 'parttime') {
 			this.setState({ studentType:2 })
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
 			return (<Select className='customDropdown' value={this.state.majors} onChange={this.handleDropdown.bind(this, 'majors')}
   clearable={this.state.clearable} multi options={undergraduateOptions} placeholder='Select a major' />)
 		} 		else if (this.state.graduate == 1) {
 			return (<Select className='customDropdown' value={this.state.majors} onChange={this.handleDropdown.bind(this, 'majors')}
   clearable={this.state.clearable} multi options={graduateOptions} placeholder='Select a major' />)
 		}
 	}
  close () {
    this.props.hide('schoolwork')
  }
  render () {
    return (
      <div className='edit_overlay'>
        <div className='overlay-inner-div' style={{ 'padding':'0' }}>
          <div className='auth_title'>
            <span className='pull-right'>
              <i className='glyphicon glyphicon-remove' onClick={this.close.bind(this)} />
            </span>
			      		Basic Info
			      	</div>
          <div className='row margin0'>
            <div className='col-md-7 col-sm-7 formBox'>
              <div className='formWrapper'>
                <label>Student Type</label><br />
                <div className='btn-group btn-group-sm'>
                  <button type='button' className={this.isActive('undergraduate')} onClick={this.setBtnVal.bind(this, 'undergraduate')}>Undergraduate</button>
                  <button type='button' className={this.isActive('graduate')} onClick={this.setBtnVal.bind(this, 'graduate')}>Graduate</button>
                </div>
                <div className='btn-group btn-group-sm'>
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
            <div className='col-md-12 col-sm-12 formBox'>
              <div className='formWrapper'>
                <label>What is/are your current major/s?</label>
                {this.getMajor()}
              </div>
            </div>
          </div>
          <div className='row margin0'>
            <div className='col-md-12 col-sm-12 formBox'>
              <div className='formWrapper'>
                <label>Please select any campus organizations you are involved in</label>
                <Select className='customDropdown' value={this.state.organizations} onChange={this.handleDropdown.bind(this, 'organizations')}
                  clearable={this.state.clearable} multi options={organizationsOptions} placeholder='Select campus organizations' />
              </div>
            </div>
          </div>
          <div className='row margin0 bigBox'>
            <div className='col-md-12 col-sm-12 formBox'>
              <label>Work</label>
              <button type='button' className={this.isActive('doesWork')} onClick={this.setBtnVal.bind(this, 'doesWork')} style={{ 'fontSize':'0.8em', 'margin':'10px' }}>I do not work</button>
              <div className='flexHalfWrapper' style={this.state.doesWork == 2 ? { 'display':'none' } : {}}>
                <div className='flexHalf flexTopLeft flexBottomLeft sizeUp'>
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
          <div className='row margin0 bigBox'>
            <div className='col-md-12 col-sm-12 formBox'>
              <label>Volunteer</label>
              <button type='button' className={this.isActive('doesVolunteer')} onClick={this.setBtnVal.bind(this, 'doesVolunteer')} style={{ 'fontSize':'0.8em', 'margin':'10px' }}>I do not volunteer</button>
              <div className='flexHalfWrapper' style={this.state.doesVolunteer == 2 ? { 'display':'none' } : {}}>
                <div className='flexHalf flexTopLeft flexBottomLeft sizeUp'>
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
          <div className='continue_btn_div' >
            <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.props.handleSave('schoolAndWork', this.state) }}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}
