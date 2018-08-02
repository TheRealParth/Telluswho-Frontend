import React from 'react'
import { browserHistory } from 'react-router'

export default class QuestionOptions extends React.Component {
  constructor () {
    super()
    this.state = {
      selected:0
    }
  }
 	nextPage (page) {
 		browserHistory.push(page)
 	}
 	isActive (value) {
    	return 'btn btn-default ' + ((value === this.state.selected) ? 'active' : 'default')
  	}
 	setVal (val) {
 		this.setState({ selected:val })
 		this.props.setVal(val)
 	}
  render () {
    var partial
    switch (this.props.type) {
      case 1:
        partial = (<div className='btn-group fiveGroup'>
          <button type='button' className={this.isActive(1)} onClick={this.setVal.bind(this, 1)}>Strongly <br />Disagree</button>
          <button type='button' className={this.isActive(2)} onClick={this.setVal.bind(this, 2)}>Disagree</button>
          <button type='button' className={this.isActive(3)} onClick={this.setVal.bind(this, 3)}>Neutral</button>
          <button type='button' className={this.isActive(4)} onClick={this.setVal.bind(this, 4)}>Agree</button>
          <button type='button' className={this.isActive(5)} onClick={this.setVal.bind(this, 5)}>Strongly <br />Agree</button>
        </div>)
        break
      case 2:
        partial = (<div className='btn-group fiveGroup'>
          <button type='button' className={this.isActive(1)} onClick={this.setVal.bind(this, 1)}>Extremely <br />Uncharacterstic</button>
          <button type='button' className={this.isActive(2)} onClick={this.setVal.bind(this, 2)}>Uncharacterstic</button>
          <button type='button' className={this.isActive(3)} onClick={this.setVal.bind(this, 3)} >Neutral</button>
          <button type='button' className={this.isActive(4)} onClick={this.setVal.bind(this, 4)} >Characterstic</button>
          <button type='button' className={this.isActive(5)} onClick={this.setVal.bind(this, 5)}>Extremely <br />Characterstic</button>
        </div>)
        break
      case 3:
        partial = (<div className='btn-group fiveGroup'>
          <button type='button' className={this.isActive(1)} onClick={this.setVal.bind(this, 1)}>Very <br />Healthy</button>
          <button type='button' className={this.isActive(2)} onClick={this.setVal.bind(this, 2)}>Healthy</button>
          <button type='button' className={this.isActive(3)} onClick={this.setVal.bind(this, 3)} >Neutral</button>
          <button type='button' className={this.isActive(4)} onClick={this.setVal.bind(this, 4)} >Poorly <br /> Healthy</button>
          <button type='button' className={this.isActive(5)} onClick={this.setVal.bind(this, 5)}>Very poorly <br />healthy</button>
        </div>)
        break
      case 4:
        partial = (<div className='btn-group fiveGroup'>
          <button type='button' className={this.isActive(1)} onClick={this.setVal.bind(this, 1)}>Very happy at <br />NJIT</button>
          <button type='button' className={this.isActive(2)} onClick={this.setVal.bind(this, 2)}>Happy <br /> at NJIT</button>
          <button type='button' className={this.isActive(3)} onClick={this.setVal.bind(this, 3)} >Neutral</button>
          <button type='button' className={this.isActive(4)} onClick={this.setVal.bind(this, 4)} >Unhappy<br /> at NJIT</button>
          <button type='button' className={this.isActive(5)} onClick={this.setVal.bind(this, 5)}>Very unhappy <br />at NJIT</button>
        </div>)
        break
      case 5:
        partial = (<div className='btn-group fiveGroup'>
          <button type='button' className={this.isActive(1)} onClick={this.setVal.bind(this, 1)}>Well definitely <br />stay at NJIT</button>
          <button type='button' className={this.isActive(2)} onClick={this.setVal.bind(this, 2)}>Will probably <br /> stay at NJIT</button>
          <button type='button' className={this.isActive(3)} onClick={this.setVal.bind(this, 3)} >Neutral</button>
          <button type='button' className={this.isActive(4)} onClick={this.setVal.bind(this, 4)} >Will probably<br />leave NJIT</button>
          <button type='button' className={this.isActive(5)} onClick={this.setVal.bind(this, 5)}>Will definitely <br />leave NJIT</button>
        </div>)
        break
      case 6:
        partial = (<div className='btn-group GroupSix'>
          <button type='button' className={this.isActive(1)} onClick={this.setVal.bind(this, 1)}>Never</button>
          <button type='button' className={this.isActive(2)} onClick={this.setVal.bind(this, 2)}>Hardly <br />Ever</button>
          <button type='button' className={this.isActive(3)} onClick={this.setVal.bind(this, 3)} >Sometimes</button>
          <button type='button' className={this.isActive(4)} onClick={this.setVal.bind(this, 4)} >Often</button>
          <button type='button' className={this.isActive(5)} onClick={this.setVal.bind(this, 5)}>Very often</button>
          <button type='button' className={this.isActive(6)} onClick={this.setVal.bind(this, 6)}>Always</button>
        </div>)
        break
    }
	    return (
  <div>
    {partial}
  </div>
	 	)
 	}
}
