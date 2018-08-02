import React from 'react'
import { browserHistory } from 'react-router'
import QuestionOptions from './question-options'
import { connect } from 'react-redux'
import { postSociability, increaseProgress } from '../../actions/surveyAction.js'

var res = {
  'likePeople': 0,
  'mixSocially': 0,
  'preferOthers': 0,
  'peopleStimulating': 0,
  'makingContacts': 0,
  'sociallyAwkward': 0,
  'talkToStrangers': 0,
  'tenseWithStrangers': 0,
  'tenseWithPeople': 0,
  'nervousAuthority': 0,
  'uncomfortableParties': 0,
  'oppositeSex': 0
}

@connect((store) => {
  return {
  		user: store.user.user,
  		profile:store.survey.profile.profile,
  		progress:store.survey.progress
  }
})

export default class Sociability extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showError:false,
      error:'',
      questions:[
				{ 'ques':'I like to be with people', 'type':2, 'ans':'likePeople' },
				{ 'ques':'I welcome the opportunity to mix socially with people', 'type':2, 'ans':'mixSocially' },
				{ 'ques':'I prefer working with others rather than alone', 'type':2, 'ans':'preferOthers' },
				{ 'ques':'I find people more stimulating than anything else', 'type':2, 'ans':'peopleStimulating' },
				{ 'ques':"I'd be unhappy if I were prevented from making many social contacts", 'type':2, 'ans':'makingContacts' },
				{ 'ques':'I am somewhat socially awkward', 'type':2, 'ans':'sociallyAwkward' },
				{ 'ques':"I don't find it hard to talk to strangers", 'type':2, 'ans':'talkToStrangers' },
				{ 'ques':"I feel tense when I'm with people I don't know well", 'type':2, 'ans':'tenseWithStrangers' },
				{ 'ques':'When conversing I worry about saying something dumb', 'type':2, 'ans':'tenseWithPeople' },
				{ 'ques':'I feel nervous when speaking to someone in authority', 'type':2, 'ans':'nervousAuthority' },
				{ 'ques':'I am often uncomfortable at parties and other social functions', 'type':2, 'ans':'uncomfortableParties' },
				{ 'ques':'I am more shy with members of the opposite sex', 'type':2, 'ans':'oppositeSex' }
      ],
      answers:res
    }
  }
  setAnswer (type, val) {
    this.setState({ showError:false, error:'' })
    res[type] = val
    this.setState({ answers:res })
  }
 	nextPage (page) {
   this.props.dispatch(postSociability(this.state.answers)).then((res) => {
     
     if (res.type != 'DATA_ERR') {
       this.props.dispatch(increaseProgress())
       browserHistory.push('/wellbeing')
     } else {
       this.setState({ showError:true, error:res.payload.response.data.message })
     }
     window.scrollTo(0, 0)
   })
 	}
  render () {
	    return (
  <div>
    <h2 className='section_title mid'>
	    		Please rate the following on <br /> how characterstic they are for you
	    	</h2>
    <div className='error' style={!this.state.showError ? { 'display':'none' } : {}}>{this.state.error}</div>
    <div className='survey_container barFix'>
      {
	    		this.state.questions.map((ques, i) => {
	    			return (
  <div className={(this.state.questions.length - 1 == i) ? 'question_div bottom' : 'question_div'} key={i}>
    <label>
      <p>{ques.ques}</p>
    </label> <br />
    <QuestionOptions type={ques.type} setVal={this.setAnswer.bind(this, ques.ans)} />
  </div>
    )
	    		})
	    	}
    </div>
    <div className='continue_btn_div'>
      <button className='btn btn-primary continue_btn pull-right' onClick={this.nextPage.bind(this)}>Continue</button>
    </div>
  </div>
	 	)
 	}
}
