import React from 'react'
import { browserHistory } from 'react-router'
import QuestionOptions from './question-options'
import { connect } from 'react-redux'
import { postSenseOfCommunity, increaseProgress } from '../../actions/surveyAction.js'

var res = {
  'studentsCare':0,
  'facultyCare':0,
  'connected':0,
  'community':0,
  'likeFamily':0,
  'isolated':0,
  'friendSupport':0,
  'satisfied':0,
  'loan':0,
  'advice':0
}

@connect((store) => {
  return {
  		user: store.user.user,
  		profile:store.survey.profile.profile,
  		progress:store.survey.progress
  }
})

export default class SenseOfCommunity extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showError:false,
      error:'',
      questions:[
				{ 'ques':'I find that students at NJIT care about each other', 'type':1, 'ans':'studentsCare' },
				{ 'ques':'I feel that faculty at NJIT care about their students', 'type':1, 'ans':'facultyCare' },
				{ 'ques':'I feel connected to others at NJIT', 'type':1, 'ans':'connected' },
				{ 'ques':'I do not feel a spirit of community at NJIT', 'type':1, 'ans':'community' },
				{ 'ques':'I feel that NJIT is like family', 'type':1, 'ans':'likeFamily' },
				{ 'ques':'I feel isolated at NJIT', 'type':1, 'ans':'isolated' },
				{ 'ques':'I feel confident that my friends at NJIT will support me if I need them', 'type':1, 'ans':'friendSupport' },
				{ 'ques':'I am satisfied with my life at NJIT', 'type':1, 'ans':'satisfied' },
				{ 'ques':'If I need an emergency loan of $100, I know someone at NJIT i can turn to', 'type':1, 'ans':'loan' },
				{ 'ques':'There is someone at NJIT I can turn to for advice for making very important decisions', 'type':1, 'ans':'advice' }
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
 		
   this.props.dispatch(postSenseOfCommunity(this.state.answers)).then((res) => {
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
	    		Please rate the following on <br /> how much you agree/disagree
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
