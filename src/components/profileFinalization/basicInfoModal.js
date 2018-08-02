import React from 'react'
import Select from 'react-select'
import { genderOptions } from '../basicInfo/options/genderOptions'
import { relationshipOptions } from '../basicInfo/options/relationshipOptions'
import { orientationOptions } from '../basicInfo/options/orientationOptions'
import { nationalityOptions } from '../basicInfo/options/nationalityOptions'
import { languageOptions } from '../basicInfo/options/languageOptions'
import { stateOptions } from '../basicInfo/options/stateOptions'
import { countryOptions } from '../basicInfo/options/countryOptions'
import { outsideUSOptions } from '../basicInfo/options/outsideUSOptions'
import { campusOptions } from '../basicInfo/options/campusOptions'
import { postProfile } from '../../actions/surveyAction'
import AddressInput from '../basicInfo/ui/addressInput'

export default class BasicInfoModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.backgroundInfo.id,
      dob: this.props.backgroundInfo.dob.slice(0, 10),
      gender: this.props.backgroundInfo.gender,
      relationshipStatus: this.props.backgroundInfo.relationshipStatus,
      sexualIdentification: this.props.backgroundInfo.sexualIdentification,
      nationality: this.props.backgroundInfo.nationality,
      nativeLanguage: this.props.backgroundInfo.nativeLanguage,
      otherLanguages: this.props.backgroundInfo.otherLanguages,
      grownCity: this.props.backgroundInfo.grownCity,
      ethnicity: this.props.backgroundInfo.ethnicity,
      liveWith: this.props.backgroundInfo.liveWith,
      grownState: this.props.backgroundInfo.grownState,
      grownCountry: this.props.backgroundInfo.grownCountry,
      onCampus: this.props.backgroundInfo.onCampus,
      campusHousing: this.props.backgroundInfo.campusHousing,
      currentCity: !this.props.backgroundInfo.nonUSA ? this.props.backgroundInfo.currentCity : '',
      currentState: !this.props.backgroundInfo.nonUSA ? this.props.backgroundInfo.currentState : '',
      currentCountry:  !this.props.backgroundInfo.nonUSA ? this.props.backgroundInfo.currentCountry : '',
      nonUSA: this.props.backgroundInfo.nonUSA,
      grownNonUSA: this.props.backgroundInfo.nonUSA ? this.props.backgroundInfo.grownNonUSA : '',
      lengthOfStayInUSA: this.props.backgroundInfo.lengthOfStayInUSA ? this.props.backgroundInfo.lengthOfStayInUSA : '',
      service: new google.maps.places.AutocompleteService()
    }
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
  handleButton () {
    this.setState({ nonUSA: !this.state.nonUSA })
    
  }
  isNonUSA () {
    return 'btn btn-default ' + ((this.state.nonUSA) ? 'active' : 'default')
  }
  getAge (val) {
    var birthday = new Date(val)
    var ageDifMs = Date.now() - birthday.getTime()
    var ageDate = new Date(ageDifMs) // miliseconds from epoch
    var age = Math.abs(ageDate.getUTCFullYear() - 1970)
    return age
  }
  handleInput (type, event) {
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
  handleDropdown (type, value) {
    switch (type) {
      case 'gender': {
        this.setState({ gender:value.value })
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
      case 'nationality': {
        this.setState({ nationality:value.value })
        break
      }
      case 'language': {
        this.setState({ nativeLanguage:value.value })
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
  isActive (value) {
    	return 'btn btn-default ' + ((value == this.state.onCampus) ? 'active' : 'default')
  	}
 	setBtnVal (val) {
 		this.setState({ onCampus:val })
 	}
  close () {
    this.props.hide('basicInfo')
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
            <div className='col-md-6 col-sm-6 formBox'>
              <div className='formWrapper'>
                <label>What is your date of birth?</label>
                <input type='date' className='customDate' value={this.state.dob} onChange={this.handleInput.bind(this, 'DOB')} name='input' placeholder='yyyy-MM-dd' max='2013-12-31' />
              </div>
            </div>
            <div className='col-md-6 col-sm-6 formBox'>
              <div className='formWrapper'>
                <label>what gender do you identify with?</label>
                <Select className='customDropdown' value={this.state.gender} onChange={this.handleDropdown.bind(this, 'gender')}
                  clearable={this.state.clearable} options={genderOptions} placeholder='Select a gender' />
              </div>
            </div>
          </div>
          <div className='row margin0'>
            <div className='col-md-6 col-sm-6 formBox'>
              <div className='formWrapper'>
                <label>What is your current relationship status?</label>
                <Select className='customDropdown' value={this.state.relationshipStatus} onChange={this.handleDropdown.bind(this, 'relationshipStatus')}
                  clearable={this.state.clearable} options={relationshipOptions} placeholder='Please Select' />
              </div>
            </div>
            <div className='col-md-6 col-sm-6 formBox'>
              <div className='formWrapper'>
                <label>What is your sexual orientation?</label>
                <Select className='customDropdown' value={this.state.sexualIdentification} onChange={this.handleDropdown.bind(this, 'sexualIdentification')}
                  clearable={this.state.clearable} options={orientationOptions} placeholder='Please Select' />
              </div>
            </div>
          </div>
          <div className='row margin0'>
            <div className='col-md-6 col-sm-6 formBox'>
              <div className='formWrapper'>
                <label>What is your nationality?</label>
                <Select className='customDropdown' value={this.state.nationality} onChange={this.handleDropdown.bind(this, 'nationality')}
                  clearable={this.state.clearable} multi options={nationalityOptions} placeholder='Select a nationality' />
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
            <div className='col-md-12 col-sm-12 formBox'>
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
            <div className='col-md-12 col-sm-12 formBox'>
              <div className='formWrapper'>
                <label>Where do you currently live?</label><br />
                <div className='btn-group'>
                  <button type='button' className={this.isActive('1')} onClick={this.setBtnVal.bind(this, '1')}>On Campus</button>
                  <button type='button' className={this.isActive('2')} onClick={this.setBtnVal.bind(this, '2')}>Off Campus</button>
                </div>
                <Select style={this.state.onCampus == 1 ? {} : { 'display':'none' }}className='customDropdown' value={this.state.campusHousing} onChange={this.handleDropdown.bind(this, 'campusHousing')}
                  clearable={this.state.clearable} options={campusOptions} placeholder='Please select' />
                <div className='flexThirdWrapper' style={this.state.onCampus == 2 ? {} : { 'display':'none' }}>
                  <div className='flexThird'>
                    <input type='text' value={this.state.currentCity} placeholder='City' onChange={this.handleInput.bind(this, 'currentCity')} />
                  </div>
                  <div className='flexThird'>
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
          <div className='continue_btn_div' >
            <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.props.handleSave('backgroundInfo', this.state) }} >Save</button>
          </div>
        </div>
      </div>
    )
  }
}
