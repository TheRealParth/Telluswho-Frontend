import React from 'react'
import { browserHistory } from 'react-router'
import QuestionOptions from './question-options'
import { connect } from 'react-redux'
import { postWellbeing, increaseProgress } from '../../actions/surveyAction.js'

var res = {
  'physicalHealth': 0,
  'happyAtNjit': 0,
  'stayAtNjit': 0,
  'lackCompanionShip': 0,
  'feelLeftOut': 0,
  'feelIsolated': 0,
  'feelFailure': 0,
  'highSelfEsteem': 0,
  'lifeIdeal': 0,
  'lifeExcellent': 0,
  'lifeSatisfied': 0,
  'doNotHaveProud': 0
}

@connect((store) => {
  return {
  		user: store.user.user,
  		profile:store.survey.profile.profile,
  		progress:store.survey.progress
  }
})

export default class WellBeing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showError:false,
      error:'',
      questions:[
				{ 'ques':'In terms of your physical health, do your currently feel', 'type':3, 'ans':'physicalHealth' },
				{ 'ques':'Currently, you would say that you are', 'type':4, 'ans':'happyAtNjit' },
				{ 'ques':'Currently, you  would say that you', 'type':5, 'ans':'stayAtNjit' },
				{ 'ques':'How often do you feel you lack companionship?', 'type':6, 'ans':'lackCompanionShip' },
				{ 'ques':'How often do you feel left out?', 'type':6, 'ans':'feelLeftOut' },
				{ 'ques':'How often do you feel isolated from others?', 'type':6, 'ans':'feelIsolated' },
				{ 'ques':'All in all, I am inclined to feel that I am a failure', 'type':1, 'ans':'feelFailure' },
				{ 'ques':'I have high self-esteem', 'type':1, 'ans':'highSelfEsteem' },
				{ 'ques':'In most ways my life is close to ideal', 'type':1, 'ans':'lifeIdeal' },
				{ 'ques':'The conditions of my life are excellent', 'type':1, 'ans':'lifeExcellent' },
				{ 'ques':'I am satisfied with my life', 'type':1, 'ans':'lifeSatisfied' },
				{ 'ques':'I feel I do not have much to be proud of', 'type':1, 'ans':'doNotHaveProud' }
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
   this.props.dispatch(postWellbeing(this.state.answers)).then((res) => {
     
     if (res.type != 'DATA_ERR') {
       this.props.dispatch(increaseProgress())
       browserHistory.push('/background')
     } else {
       this.setState({ showError:true, error:res.payload.response.data.message })
     }
     window.scrollTo(0, 0)
   })
 	}
  render () {
	    return (
  <div >
    <h2 className='section_title'>
	    		Please rate the following to the best <br /> of your ability
	    	</h2>
    <div className='error' style={!this.state.showError ? { 'display':'none' } : {}}>{this.state.error}</div>
    <div className='survey_container barFix mid'>
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
