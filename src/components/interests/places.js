import React from 'react'
import { connect } from 'react-redux'
import { setPlaces, increaseProgress } from '../../actions/surveyAction.js'
import PlacesAutoComplete from './ui/placesAutoComplete'

@connect((store) => {
  return {
    user: store.user.user,
    profile:store.survey.profile.profile,
    progress:store.survey.progress,
    interests:store.survey.interests ? store.survey.interests : store.survey.profile.interests
  }
})
export default class Places extends React.Component {
  constructor (props) {
    super(props)
    var temp = []

    this.props.interests.forEach((intrs) => {
      if (intrs.doingInGroup != 3) {
        var a = intrs
        a.places = []
        temp.push(a)
      }
    })

    this.state = {
      interests: temp,
      error: '',
      service: new google.maps.places.AutocompleteService()
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.state.lat = position.coords.latitude
      this.state.lon = position.coords.longitude
    })
  }
  handleSelect = (places, interestId) => {
    var tee = []

    this.state.interests.forEach((interest) => {
      if (interest.id == interestId) {
        interest.places = []

        // places.forEach((place) => {
        //   interest.places.push({
        //     placesId: place.data.place_id,
        //     locationName: place.value.structured_formatting.main_text,
        //     fullAddress: place.data.description
        //   })
        // })
        places.forEach((place) => {
          
          interest.places.push({
            placesId: place.key,
            locationName: place.value,
            fullAddress: place.value
          })
        })
      }
      tee.push(interest)
    })

    this.setState({ interests: tee })
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

  nextPage = () => {
    var allSet = true

    this.state.interests.forEach((interest) => {
      if (_.isEmpty(interest.places)) allSet = false
      
    })
    if (allSet) {
      this.props.dispatch(setPlaces(this.state.interests)).then((res) => {
        if (res.type != 'DATA_ERR') {
          this.props.dispatch(increaseProgress())
        } else {
          this.setState({ error: 'Error saving to database' })
        }
      })
    } else {
      this.setState({ error: 'You must select at least one place for each activity' })
    }
    window.scrollTo(0, 0)
  }
  render () {
    return (<div className='barFix section4'>

      <h2 id='page-heading-2'>Please select where you do this <b>GROUP</b> activity.</h2>
      <br />
      <div className='error'>{this.state.error}</div>
      <div className='cardHolder dragFrame '>

        {
         this.state.interests.map((obj, i) => {
           return (<PlacesAutoComplete getOptions={this.getOptions} handleSelect={this.handleSelect} key={i} interest={obj} />)
         })
       }

      </div>

      <div className='continue_btn_div' >
        <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.nextPage() }}>Continue</button>
      </div>
    </div>)
  }
}
