import React from 'react'
import { connect } from 'react-redux'
import { setPassionLevel, setDoingInGroup, setLookingForOthers, setExpertiseLevel, setWillingToTeach, setWillingToBeTaught, increaseProgress } from '../../actions/surveyAction.js'
import { DropTarget } from 'react-dnd'
import InterestCard from './ui/interestCard'
import DropZoneMap from './mappers/dropZoneMap'
import { browserHistory } from 'react-router'

type Interest = {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  levelOfPassion: number;
  levelOfExpertise: number;
  willingToTeach: number;
  doingInGroup: number;
  methodInGroup: Array<string>;
  lookingForOthers: number,
}
type DefaultProps = {
  interests?: Array<Interest>;
  title: string;
  surveyType: "levelOfPassion" | "levelOfExpertise" | "willingToBeTaught" | "willingToTeach" | "doingInGroup";
  dropBoxes: Array<string>;
}

@connect((store) => {
  return {
  		user: store.user.user,
  		profile:store.survey.profile,
  		progress:store.survey.progress,
    interests:store.survey.interests ? store.survey.interests : store.survey.profile.interests
  }
})
export default class BasicDnD extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      interests: props.interests,
      showError: false,
      currDragItem: '',
      currDropItem: 0,
      error: ''
    }
  }

  props: DefaultProps;

  shouldComponentUpdate (nextProps, nextState) {
    return (this.props != nextProps || this.state != nextState)
  }
  checkInterests () {
    const interests = this.state.interests
    interests.forEach((interest) => {
      if (!interest[this.props.surveyType]) return false
    })
    return true
  }
  nextPage (page) {
    // if(section != 2) this.setState({section: this.state.section + 1 })
    if (checkInterests()) {
      // TODO Add error message
      this.setState({ showError: false })
      this.props.setLevel(this.state.interests).then((res) => {
        if (res.type != 'DATA_ERR') {
          this.props.dispatch(increaseProgress())
          browserHistory.push(this.props.nextPage)
        } else {
          // TODO Add error message
          this.setState({ showError:true })
        }
        window.scrollTo(0, 0)
      })
    } else {
      this.setState({ showError: true })
    }
  }
  resetInterest (i) {
    var newInterests = []
    this.state.interests.forEach((obj) => {
      if (obj.id == this.state.currDragItem) {
        obj[this.props.surveyType] = i
      }
      newInterests.push(obj)
    })
    this.setState({ interests: newInterests })
  }

  undropInterest = (ob) => {
    var newInterests = this.state.interests
    newInterests.forEach((obj, i) => {
      if (obj.id == ob.id) {
        newInterests[i][this.props.surveyType] = 0
      }
    })
    this.setState({ interests: newInterests })
  }
  setDragItem (id) {
    // 
    
    this.setState({ currDragItem: id })
  }
  promiseGetter () {
    switch (this.props.surveyType) {
      case 'levelOfPassion':
        return Promise.resolve(this.props.dispatch(setPassionLevel(this.state.interests)))
        break
      case 'levelOfExpertise':
        return Promise.resolve(this.props.dispatch(setExpertiseLevel(this.state.interests)))
        break
      case 'willingToTeach' :
        return Promise.resolve(this.props.dispatch(setWillingToTeach(this.state.interests)))
        break
      case 'willingToBeTaught' :
        return Promise.resolve(this.props.dispatch(setWillingToBeTaught(this.state.interests)))
        break
      case 'doingInGroup' :
        return Promise.resolve(this.props.dispatch(setDoingInGroup(this.state.interests)))
        break
    }
  }
  nextPage = () => {
    var isComplete = true
    this.state.interests.forEach((interest) => {
      if (!interest[this.props.surveyType]) isComplete = false
    })

    if (isComplete) {
      this.promiseGetter().then((res) => {
        if (res.type != 'DATA_ERR') {
          this.props.dispatch(increaseProgress())
        } else {
          this.setState({ error: 'Error saving to database' })
        }
      })
    } else {
      this.setState({ error: 'You must drag all items into one of the bordered boxes below.' })
    }
  }
  render () {
    return (

      <div className='barFix section4'>

        <h2 id='page-heading-2'>{this.props.title}</h2>
        <div className='error'>{this.state.error}</div>
        <div className='cardHolder dragFrame '>

          {
        this.state.interests.map((obj, i) => {
          if (!obj[this.props.surveyType]) { return (<InterestCard key={i} interest={obj} callback={this.setDragItem.bind(this, obj.id)} />) }
        })
      }

        </div>
        <div className='droppables'>
          {
          this.props.dropBoxes.map((dropbox, i) => {
            return <DropZoneMap key={i + 1} value={i + 1} fieldType={this.props.surveyType} remove={this.undropInterest} set={this.resetInterest.bind(this)} interests={this.state.interests} title={dropbox} />
          })
        }
        </div>
        <div className='continue_btn_div'>
          <button className='btn btn-primary continue_btn pull-right' onClick={this.nextPage}>Continue</button>
        </div>
      </div>

    )
  }
}
