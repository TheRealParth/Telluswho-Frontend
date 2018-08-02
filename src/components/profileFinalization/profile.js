import React from 'react'
import MiniProfile from '../basicInfo/miniprofile'
import BasicInfo from './basicInfoModal'
import SchoolWorkModal from './schoolWorkModal'
import ProfilePicModal from './profilePicModal'
import InterestsModal from './interestsModal'
import { browserHistory } from 'react-router'
import { postProfile, increaseProgress } from '../../actions/surveyAction.js'
import { connect } from 'react-redux'

// PREFJKDL

@connect((store) => {
  return {
  		user: _.isEmpty(store.user.user) ? store.survey.user : store.user.user,
  		profile:store.survey.profile,
  		progress:store.survey.progress,
    profilePic: store.user.profilePic
  }
})
export default class Profile extends React.Component {
  constructor (props) {
    super(props)
    let bgInfo = this.props.profile.backgroundInfo
    bgInfo.nonUSA = bgInfo.grownCity ? false : true

    let interests = this.props.profile.interests

    this.state = {
      showBasicInfoModal:false,
      showSchoolWorkModal:false,
      showProfilePicModal: false,
      backgroundInfo: bgInfo,
      schoolAndWork: this.props.profile.schoolAndWork,
      nonUSA: false,
      grownNonUSA: '',
      interests: interests,
      service: new google.maps.places.AutocompleteService(),
      file:'',
      showInfoModal: true,
      imagePreviewUrl:'',
      userImg: (this.props.profilePic && this.props.profilePic.imageData) ? 'data:image/' + this.props.profilePic.type + ';base64,' + this.props.profilePic.imageData : 'http://api.adorable.io/avatars/100/' + this.props.user.firstName + this.props.user.lastName + '.jpg'
    }
  }
  clickBtn (e) {
    document.getElementById('selectedFile').click()
  }

  resizeCrop (url, pixelCrop) {
    const c = document.getElementById('canvizzle') ? document.getElementById('canvizzle') : document.createElement('canvas')

    if (!document.getElementById('canvizzle')) {
      c.setAttribute('id', 'canvizzle')
      c.setAttribute('display', 'none')
    }

    c.setAttribute('height', pixelCrop.height)
    c.setAttribute('width', pixelCrop.width)
    const ctx = c.getContext('2d')
    const img = new Image()
    img.src = url
    img.onload = () => {
      ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.height, pixelCrop.width)
      // document.getElementsByClassName("profile_img")[0].style.backgroundImage = 'url(' + c.toDataURL(this.state.file.type, 1.0) + ')'
      const newProfilePic = c.toDataURL(this.state.file.type, 1.0)
      this.setState({ profilePic: {
        imageData: newProfilePic.slice(newProfilePic.indexOf('base64,') + 7, newProfilePic.length),
        type: this.state.file.type,
        height: pixelCrop.height,
        width: pixelCrop.width
      }
      })
      this.setState({ userImg: newProfilePic })
    }
  }

  showModal (val) {
    if (val == 'basicInfo') {
      this.setState({ showBasicInfoModal:true })
    } else if (val == 'schoolwork') {
      this.setState({ showSchoolWorkModal:true })
    } else if (val == 'profilePic') {
      this.setState({ showProfilePicModal: true })
    }  else if (val == 'interests') {
      this.setState({ showInterestsModal: true })
    }
  }
  hideEditModal (val) {
    if (val == 'basicInfo') {
      this.setState({ showBasicInfoModal:false })
    } else if (val == 'schoolwork') {
      this.setState({ showSchoolWorkModal:false })
    } else if (val == 'profilePic') {
      this.setState({ showProfilePicModal: false })
    } else if (val == 'interests') {
      this.setState({ showInterestsModal: false })
    }
  }
  handleSave (type, answers) {
    if (type == 'backgroundInfo') {
      this.setState({ backgroundInfo: answers })
      this.setState({ showBasicInfoModal:false })
    } else if (type == 'schoolAndWork') {
      this.setState({ schoolAndWork: answers })
      this.setState({ showSchoolWorkModal:false })
    } else if (type == 'interests') {
      this.setState({ interests: answers.interests })
      this.setState({ showInterestsModal: false})
    }
  }

  closeModal (type, answers) {
    if (type == 'profilePic') {
      this.setState({ showProfilePicModal: false})
    } else if (type == 'interests'){
      this.setState({ showInterestsModal: false})
    }
  }
  renderModal () {
    if (this.state.showBasicInfoModal) {
      return (<BasicInfo handleSave={this.handleSave.bind(this)} backgroundInfo={this.state.backgroundInfo} hide={this.hideEditModal.bind(this)} />)
    } else if (this.state.showSchoolWorkModal) {
      return (<SchoolWorkModal handleSave={this.handleSave.bind(this)} schoolAndWork={this.state.schoolAndWork} hide={this.hideEditModal.bind(this)} />)
    } else if (this.state.showProfilePicModal) {
      return (<ProfilePicModal handleCrop={this.resizeCrop.bind(this)} imageUrl={this.state.imagePreviewUrl} closeModal={this.closeModal.bind(this)} />)
    } else if (this.state.showInterestsModal) {
      return (<InterestsModal handleSave={this.handleSave.bind(this)} interests={this.state.interests} closeModal={this.closeModal.bind(this)} />)
    }
  }
  getAge (val) {
    var birthday = new Date(val)
    	var ageDifMs = Date.now() - birthday.getTime()
    	var ageDate = new Date(ageDifMs) // miliseconds from epoch
    	var age = Math.abs(ageDate.getUTCFullYear() - 1970)
    	return (age > 1 && age < 140) ? <span>{age}</span> : <span className='valuePlaceholder' />
  }

  imageAdded (e) {
  	e.preventDefault()
  	let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = function (e) {

      this.setState({
        file: file,
        fileWidth: this.width,
        fileHeight: this.height,
        imagePreviewUrl: reader.result
      })
    }.bind(this)

    	reader.readAsDataURL(file)
    this.showModal('profilePic')
  }
  nextPage () {
    const backgroundInfo = {
      id: this.state.backgroundInfo.id,
      dob: this.state.backgroundInfo.dob,
      gender: this.state.backgroundInfo.gender,
      nationality: this.state.backgroundInfo.nationality,
      nativeLanguage: this.state.backgroundInfo.nativeLanguage,
      otherLanguages: this.state.backgroundInfo.otherLanguages,
      sexualIdentification: this.state.backgroundInfo.sexualIdentification,
      relationshipStatus: this.state.backgroundInfo.relationshipStatus,
      currentCountry: this.state.backgroundInfo.currentCountry,
      currentCity: this.state.backgroundInfo.currentCity,
      currentState: this.state.backgroundInfo.currentState,
      grownCountry: this.state.backgroundInfo.grownCountry,
      grownCity: this.state.backgroundInfo.grownCity,
      grownState: this.state.backgroundInfo.grownState,
      nonUSA: this.state.backgroundInfo.grownCity ? false : true,
      grownNonUSA: this.state.backgroundInfo.grownNonUSA ? this.state.backgroundInfo.grownNonUSA : '',
      lengthOfStayInUSA: this.state.backgroundInfo.lengthOfStayInUSA ? this.state.backgroundInfo.lengthOfStayInUSA : '',
      liveWith: this.state.backgroundInfo.liveWith,
      onCampus: this.state.backgroundInfo.onCampus, // 0 unset 1 is true 2 is false
      campusHousing: this.state.backgroundInfo.campusHousing,
      ethnicity: this.state.backgroundInfo.ethnicity
    }
    const schoolAndWork = {
      id: this.state.schoolAndWork.id,
      organizations: this.state.schoolAndWork.organizations,
      internationalStudentStatus: this.state.schoolAndWork.internationalStudentStatus,
      majors: this.state.schoolAndWork.majors,
      onCampus: this.state.schoolAndWork.onCampus, // 0 unset 1 is true 2 is false
      graduate: this.state.schoolAndWork.graduate, // 0 unset 1 is true 2 is false
      studentType:this.state.schoolAndWork.studentType, // 1 is fullTime 2 is part time
      doesWork:this.state.schoolAndWork.doesWork, // 0 unset 1 is true 2 is false
      doesVolunteer:this.state.schoolAndWork.doesVolunteer, // 0 unset 1 is true 2 is false
      workField: this.state.schoolAndWork.workField,
      workPlace: this.state.schoolAndWork.workPlace,
      volunteerField: this.state.schoolAndWork.volunteerField,
      volunteerPlace: this.state.schoolAndWork.volunteerPlace,
      firstYear: this.state.schoolAndWork.firstYear,
      lengthOfStayAtNJIT: this.state.schoolAndWork.lengthOfStayAtNJIT
    }


    var profile = {
      backgroundInfo: backgroundInfo,
      schoolAndWork: schoolAndWork,
      interests: this.state.interests
    }
    if (this.state.profilePic && this.state.profilePic.imageData) {
      profile.profilePic = this.state.profilePic
    }

    this.props.dispatch(postProfile(profile)).then((res) => {
      if (res.type != 'DATA_ERR') {
        this.props.dispatch(increaseProgress())
        browserHistory.push('/socialtags')
      } else {
        this.setState({ showError:true, error: res.payload.response.data.message })
      }
    })
    window.scrollTo(0, 0)
  }
  hideModal = () => {
    this.setState({ showInfoModal: false })
  }
  render () {
    const user = this.props.user
    const bgInfo = this.state.backgroundInfo
    const schoolwork = this.state.schoolAndWork
    const interests = this.state.interests

    return (
      <div>
        <div className='edit_overlay' style={{ display: this.state.showInfoModal ? '' : 'none' }}>
          <div className='overlay-inner-div' style={{ 'padding-right':'5%', height: '100px' }}>
            <div className='success-message-container'>
              <h3 className='success-message'>On the next page you will see your profile which includes all the information you have entered.
           You will be able to make edits <br /> to your information by clicking on <span> <i className='glyphicon glyphicon-pencil' onClick={this.showModal.bind(this, 'basicInfo')} /> </span>.
         </h3>
            </div>
            <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.hideModal() }}>Continue</button>
          </div>
        </div>
        <button className='btn btn-primary continue_btn pull-right' style={{marginRight: "10%", marginTop: "10px"}} onClick={this.nextPage.bind(this)}>Continue</button>
        <h2 className='section_title' style={{ textAlign: 'left', paddingLeft: '18%' }}>
	    		You are almost there! <br /> To complete your profile please upload a picture of yourself
	    		<br /> If you need to edit anything you can do so by clicking on the pencil (<i className='glyphicon glyphicon-pencil' onClick={this.showModal.bind(this, 'basicInfo')} />)<br />
	    		icon next to each section
	    	</h2>

        <div className='error' style={!this.state.showError ? { 'display':'none' } : {}}>{this.state.error}}</div>
        <div className='survey_container barFix' >
          <div className='row margin0'>
            <div className='col-md-12 col-sm-12 formBox no-right-border'>
              <div className='formWrapper '>
                <div className='profile_img' style={{ backgroundPosition: '50% 50%', backgroundSize: 'cover', backgroundImage: `url(${this.state.userImg})` }}>
                  {/* <img style={this.state.imagePreviewUrl==''?{"visibility":"hidden"}:{}} src={this.state.imagePreviewUrl} width="100" height="100"/> */}
                  <input type='file' id='selectedFile' onChange={this.imageAdded.bind(this)} />
                  <div className='upload_btn' onClick={this.clickBtn.bind(this)}>Upload</div>
                </div>
                <h2 className='profile_name'>{this.props.user.firstName} {this.props.user.lastName}</h2>
              </div>
            </div>
          </div>
          <div className='row margin0'>
            <div className='col-md-12 col-sm-12 formBox no-right-border'>
              <div className='formWrapper no-right-border'>
                <label>Basic Info</label>
                <i className='glyphicon glyphicon-pencil pull-right' onClick={this.showModal.bind(this, 'basicInfo')} />
                <div className='profile_info'>
                  <p><span className='pro_label'>Age</span> {this.getAge(bgInfo.dob)} </p>
                  <p><span className='pro_label'>Gender</span> {bgInfo.gender} </p>
                  <p><span className='pro_label'>Relationship status</span> {bgInfo.relationshipStatus} </p>
                  <p><span className='pro_label'>Sexual Identification</span> {bgInfo.sexualIdentification} </p>
                  <p><span className='pro_label'>Nationality</span> {bgInfo.nationality.join(', ')} </p>
                  <p><span className='pro_label'>Language</span> {bgInfo.nativeLanguage} </p>
                  <p><span className='pro_label'>Hometown</span> {bgInfo.nonUSA ? bgInfo.grownNonUSA : bgInfo.grownCity} </p>
                  <p><span className='pro_label'>Current Living</span> {bgInfo.onCampus ? bgInfo.campusHousing : bgInfo.currentCity} </p>
                </div>
              </div>
            </div>
            <div className='row margin0'>
              <div className='col-md-12 col-sm-12 formBox no-right-border'>
                <div className='formWrapper  bottom' style={{ 'border-bottom': '1px solid #aaa' }}>
                  <label>School and Work</label>
                  <i className='glyphicon glyphicon-pencil pull-right' onClick={this.showModal.bind(this, 'schoolwork')} />
                  <div className='profile_info'>
                    <p><span className='pro_label'>Student Type</span> {schoolwork.studentType == 1 ? 'Full Time' : 'Part Time'} </p>
                    <p><span className='pro_label'>Major</span> {schoolwork.majors.map((obj, i) => {
								     		return (<span key={i}>{obj} </span>)
								     	})}</p>
                    <p><span className='pro_label'>Campus Organizations</span> {schoolwork.organizations.map((obj, i) => {
							     		return (<span key={i}>{obj} </span>)
							     	})} </p>
                    <p><span className='pro_label'>Work</span> {schoolwork.workPlace}</p>
                    <p><span className='pro_label'>Volunteer</span> {schoolwork.volunteerPlace} </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='row margin0'>
              <div className='col-md-12 col-sm-12 formBox no-right-border'>
                <div className='formWrapper  bottom'>
                  <label>Interests</label>
                  <div className='profile_info'>
                    <p> {interests.map((obj, i) => {
                      return (<span key={i}>{obj.title}({obj.category}) <br /></span>)
                    })} </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MiniProfile user={this.props.user} profilePicUrl={this.state.userImg} backgroundInfo={this.state.backgroundInfo} schoolAndWork={this.state.schoolAndWork} interests = {this.state.interests}/>
        <div className='continue_btn_div' >
          <button className='btn btn-primary continue_btn pull-right' onClick={this.nextPage.bind(this)}>Continue</button>
        </div>
        {this.renderModal()}
      </div>
    )
  }
}
