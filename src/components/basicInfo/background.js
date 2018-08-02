import React from 'react'
import MiniProfile from './miniprofile'
import Select from 'react-select'
import { genderOptions } from './options/genderOptions'
import { nationalityOptions } from './options/nationalityOptions'
import { languageOptions } from './options/languageOptions'
import { stateOptions } from './options/stateOptions'
import { countryOptions } from './options/countryOptions'
import { outsideUSOptions } from './options/outsideUSOptions'
import { liveWithOptions } from './options/liveWithOptions'
import { relationshipOptions } from './options/relationshipOptions'
import { orientationOptions } from './options/orientationOptions'
import { campusOptions } from './options/campusOptions'
import { ethnicityOptions } from './options/ethnicityOptions'
import { browserHistory } from 'react-router'
import { increaseProgress, postBackground } from '../../actions/surveyAction.js'
import { connect } from 'react-redux'
import AddressInput from './ui/addressInput'
@connect((store) => {
  return {
  		user: _.isEmpty(store.user.user) ? store.survey.user : store.user.user,
  		profile:store.survey.profile,
  		progress:store.survey.progress
  }
})

export default class Background extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dob:'',
      gender:'',
      nationality:[],
      nativeLanguage:'',
      otherLanguage: [],
      grownCity:'',
      grownState:'',
      grownCountry:'',
      liveWith:'',
      onCampus:0,
      campusHousing:'',
      currentCity:'',
      currentState:'',
      currentCountry:'',
      relationshipStatus:'',
      sexualIdentification:'',
      ethnicity:'',
      error:'',
      nonUSA: false,
      grownNonUSA: '',
      lengthOfStayInUSA: '',
      service: new google.maps.places.AutocompleteService()
    }
  }
  handleButton () {
    this.setState({ nonUSA: !this.state.nonUSA })
    
  }
  getOptions = (input, callback) => {
    this.state.service.getPlacePredictions({ input: input, longitude: this.state.lon, latitude: this.state.lat }, (predictions, status) => {
      const ops = []
      if (!predictions || !predictions.length) {
        callback(true, {})
      } else if (predictions.length) {
        predictions.forEach((pred) => {
          ops.push({ label: pred.structured_formatting.main_text, value: pred, data: pred })
        })
        callback(null, {
          options: ops
        })
      }
    })
  }
  handleInput (type, event) {
    this.setState({ showError:false, error:'' })
    switch (type) {
      case 'DOB': {
        this.setState({ dob:event.target.value })
        break
      }
      case 'grownCity': {
        this.setState({ grownCity:event.target.value })
        break
      }
      case 'lengthOfStayInUSA': {
        this.setState({ lengthOfStayInUSA: event.target.value })
        break
      }
      case 'currentCity': {
        this.setState({ currentCity:event.target.value })
        break
      }
    }
  }
  getAge (val) {
    var birthday = new Date(val)
    var ageDifMs = Date.now() - birthday.getTime()
    var ageDate = new Date(ageDifMs) // miliseconds from epoch
    var age = Math.abs(ageDate.getUTCFullYear() - 1970)
    return age
  }
  isActive (value) {
    	return 'btn btn-default ' + ((value === this.state.onCampus) ? 'active' : 'default')
  }
  isNonUSA () {
    return 'btn btn-default ' + ((this.state.nonUSA) ? 'active' : 'default')
  }
  setBtnVal (val) {
 		this.setState({ onCampus:val, showError:false, error:'' })
 	}
  handleDropdown (type, value) {
    this.setState({ showError:false, error:'' })
    switch (type) {
      case 'gender': {
        this.setState({ gender:value.value })
        break
      }
      case 'language': {
        this.setState({ nativeLanguage:value.value })
        break
      }
      case 'otherLanguage': {
	        var otherLanguages = []
	        value.forEach(val => {
	          otherLanguages.push(val.value)
	        })
        this.setState({ otherLanguage: otherLanguages })
        break
      }
      case 'nationality': {
        var nationality = []
        value.forEach(val => {
          nationality.push(val.value)
        })
        this.setState({ nationality: nationality })
        break
      }
      case 'grownState': {
        this.setState({ grownState:value.value })
        break
      }
      case 'grownCountry': {
        this.setState({ grownCountry:value.value })
        break
      }
      case 'lengthOfStayInUSA': {
        this.setState({ lengthOfStayInUSA: value.value })
        break
      }
      case 'liveWith': {
        this.setState({ liveWith:value.value })
        break
      }
      case 'relationshipStatus': {
        this.setState({ relationshipStatus:value.value })
        break
      }
      case 'sexualIdentification': {
        this.setState({ sexualIdentification:value.value })
        break
      }
      case 'campusHousing': {
        this.setState({ campusHousing:value.value })
        break
      }
      case 'currentState': {
        this.setState({ currentState:value.value })
        break
      }
      case 'currentCountry': {
        this.setState({ currentCountry:value.value })
        break
      }
    }
  }
  nextPage (page) {
    var obj = {
			  dob: this.state.dob,
		    gender: this.state.gender,
		    nationality: this.state.nationality,
		    nativeLanguage: this.state.nativeLanguage,
		    otherLanguages: this.state.otherLanguage,
		    sexualIdentification: this.state.sexualIdentification,
		    relationshipStatus: this.state.relationshipStatus,
		    currentCountry: this.state.currentCountry,
		    currentCity: this.state.currentCity,
		    currentState: this.state.currentState,
		    grownCountry: this.state.grownCountry,
		    grownCity: this.state.grownCity,
		    grownState: this.state.grownState,
      grownNonUSA: this.state.grownNonUSA,
        lengthOfStayInUSA: this.state.lengthOfStayInUSA,
		    liveWith: this.state.liveWith,
		    onCampus: this.state.onCampus, // 0 unset 1 is true 2 is false
		    campusHousing: this.state.campusHousing
    }
    
    if (this.getAge(this.state.dob) < 18) {
      this.setState({ showError:true, error: 'You must be at least 18 years old to participate in this study.' })
      window.scrollTo(0, 0)
    } else {
      this.props.dispatch(postBackground(obj)).then((res) => {
        if (res.type != 'DATA_ERR') {
          this.props.dispatch(increaseProgress())
          browserHistory.push('/schoolandwork')
        } else {
          this.setState({ showError:true, error:res.payload.response.data.message })
        }
        window.scrollTo(0, 0)
      })
    }
 	}
  handleAddressSelect = (place) => {
    this.setState({ grownNonUSA: place })
    
  }
  render () {
	    return (
  <div>
    <h2 className='section_title left'>
	    		In this section you will build your matching profile <br /> located on right hand side of screen
	    		<br /> Please answer the questions below
	    	</h2>
    <div className='error' style={!this.state.showError ? { 'display':'none' } : {}}>{this.state.error}</div>
    <div className='survey_container barFix' >
      <div className='row margin0'>
        <div className='col-md-6 col-sm-6 formBox'>
          <div className='formWrapper'>
            <label>What is your date of birth?</label>
            <input type='date' className='customDate' value={this.state.dob} onChange={this.handleInput.bind(this, 'DOB')} name='input' placeholder='yyyy-MM-dd' max='2013-12-31' />
          </div>
        </div>
        <div className='col-md-6 col-sm-6 formBox'>
          <div className='formWrapper'>
            <label>What gender do you identify with?</label>
            <Select className='customDropdown' value={this.state.gender} onChange={this.handleDropdown.bind(this, 'gender')}
              clearable={this.state.clearable} options={genderOptions} placeholder='Select a gender' />
          </div>
        </div>
      </div>
      <div className='row margin0'>
        <div className='col-md-6 col-sm-6 formBox'>
          <div className='formWrapper'>
            <label>What is your nationality?</label>
            <Select className='customDropdown' value={this.state.nationality} onChange={this.handleDropdown.bind(this, 'nationality')}
              clearable={this.state.clearable} tabSelectsValue={false} multi options={nationalityOptions} placeholder='Select a nationality' />
          </div>
        </div>
        <div className='col-md-6 col-sm-6 formBox'>
          <div className='formWrapper'>
            <label>What is your native language?</label>
            <Select className='customDropdown' value={this.state.nativeLanguage} onChange={this.handleDropdown.bind(this, 'language')}
              clearable={this.state.clearable} options={languageOptions} placeholder='Select a language' />
          </div>
        </div>
      </div>
      <div className='row margin0'>
        <div className='col-md-12 col-sm-12 formBox single'>
          <div className='formWrapper'>
            <label>What other languages can you speak?</label>
            <Select className='customDropdown' value={this.state.otherLanguage} onChange={this.handleDropdown.bind(this, 'otherLanguage')}
              clearable={this.state.clearable} tabSelectsValue={false}  multi options={languageOptions} placeholder='Please select language(s)' />
          </div>
        </div>
      </div>
      <div className='row margin0'>
        <div className='col-md-12 col-sm-12 formBox single'>

          <div className='formWrapper'>
            <label>Where did you grow up?</label>
            <button type='button' className={this.isNonUSA()} onClick={this.handleButton.bind(this)} style={{ 'fontSize':'0.8em', 'margin':'10px', position: 'absolute', top: '7px', right: '5px' }}>I grew up outside of the USA</button><br />
            <div style={{ display: !this.state.nonUSA ? 'none' : 'inline-block' }}>
              <AddressInput getOptions={this.getOptions} handleNewAddress={this.handleAddressSelect} handleSelect={this.handleAddressSelect} />
              <div style={{ 'padding-top': '50px'}}>
                <label>How long have you been in the USA</label>
                <Select className='customDropdown' value={this.state.lengthOfStayInUSA} onChange={this.handleDropdown.bind(this, 'lengthOfStayInUSA')}
                  clearable={this.state.clearable} options={outsideUSOptions} placeholder='Length of Stay In USA' />
              </div>
            </div>
            <div className='flexThirdWrapper' style={{ display: !this.state.nonUSA ? 'flex' : 'none' }}>

              <div className='flexThird no-right-border'>
                <input type='text' value={this.state.grownCity} placeholder='City' onChange={this.handleInput.bind(this, 'grownCity')} />
              </div>
              <div className='flexThird no-right-border'>
                <Select className='customDropdown' value={this.state.grownState} onChange={this.handleDropdown.bind(this, 'grownState')}
                  clearable={this.state.clearable} options={stateOptions} placeholder='State' />
              </div>
              <div className='flexThird'>
                <Select className='customDropdown' value={this.state.grownCountry} onChange={this.handleDropdown.bind(this, 'grownCountry')}
                  clearable={this.state.clearable} options={countryOptions} placeholder='Country' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row margin0'>
        <div className='col-md-12 col-sm-12 formBox single'>
          <div className='formWrapper'>
            <label>Where do you currently live?</label><br />
            <div className='btn-group'>
              <button type='button' className={this.isActive('1')} onClick={this.setBtnVal.bind(this, '1')}>On Campus</button>
              <button type='button' className={this.isActive('2')} onClick={this.setBtnVal.bind(this, '2')}>Off Campus</button>
            </div><br /><br />
            <label style={this.state.onCampus == 1 ? {} : { 'display':'none' }}>Please select a housing type:</label>
            <label style={this.state.onCampus == 2 ? {} : { 'display':'none' }}>Please enter your address:</label>
            <Select style={this.state.onCampus == 1 ? {} : { 'display':'none' }} className='customDropdown' value={this.state.campusHousing} onChange={this.handleDropdown.bind(this, 'campusHousing')}
              clearable={this.state.clearable} options={campusOptions} placeholder='Please select' />
            <div className='flexThirdWrapper' style={this.state.onCampus == 2 ? {} : { 'display':'none' }}>
              <div className='flexThird no-right-border no-highlight'>

                <input type='text' value={this.state.currentCity} placeholder='City' onChange={this.handleInput.bind(this, 'currentCity')} />
              </div>
              <div className='flexThird no-right-border'>
                <Select className='customDropdown' value={this.state.currentState} onChange={this.handleDropdown.bind(this, 'currentState')}
                  clearable={this.state.clearable} options={stateOptions} placeholder='State' />
              </div>
              <div className='flexThird'>
                <Select className='customDropdown' value={this.state.currentCountry} onChange={this.handleDropdown.bind(this, 'currentCountry')}
                  clearable={this.state.clearable} options={countryOptions} placeholder='Country' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row margin0'>
        <div className='col-md-12 col-sm-12 formBox single'>
          <div className='formWrapper'>
            <label>Who do you currently live with?</label>
            <Select className='customDropdown' value={this.state.liveWith} onChange={this.handleDropdown.bind(this, 'liveWith')}
              clearable={this.state.clearable} options={liveWithOptions} placeholder='Please select' />
          </div>
        </div>
      </div>
      <div className='row margin0'>
        <div className='col-md-6 col-sm-6 formBox'>
          <div className='formWrapper bottom'>
            <label>What is your current relationship status?</label>
            <Select className='customDropdown' value={this.state.relationshipStatus} onChange={this.handleDropdown.bind(this, 'relationshipStatus')}
              clearable={this.state.clearable} options={relationshipOptions} placeholder='Please Select' />
          </div>
        </div>
        <div className='col-md-6 col-sm-6 formBox single'>
          <div className='formWrapper bottom'>
            <label>What is your sexual orientation?</label>
            <Select className='customDropdown' value={this.state.sexualIdentification} onChange={this.handleDropdown.bind(this, 'sexualIdentification')}
              clearable={this.state.clearable} options={orientationOptions} placeholder='Please Select' />
          </div>
        </div>
      </div>

    </div>
    <MiniProfile user={this.props.user} backgroundInfo={this.state} />
    <div className='continue_btn_div'>
      <button className='btn btn-primary continue_btn pull-right' onClick={this.nextPage.bind(this)}>Continue</button>
    </div>
  </div>
	 	)
 	}
}
