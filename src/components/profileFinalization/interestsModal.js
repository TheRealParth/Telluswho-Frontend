import React from 'react'
import Select from 'react-select'
import { interestOptions } from '../interests/options/interestOptions'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import TagsInput from 'react-tagsinput'
import FormBox from '../interests/ui/formbox'
import AddInterestsModal from './addInterestsModal'

export default class InterestsModal extends React.Component {
  constructor (props) {
    super(props)
    var cat = []
    let i = 0
    interestOptions.forEach(option => {
      cat.push({ key: option.categoryId, value: option.category, selected: false })
      i++
    })


    this.state = {
      section: 0,
      categories: cat,
      subcategories: [],
      interests: this.props.interests,
      currInterest: this.props.interests.length,
      showAddInterestModal: false,
      showError: false,
      showOverlay: true
    }

    this.state.categories.forEach((cat) => {
      var categorySelected = this.state.interests.filter(function(interest){
        return (interest.category == cat.value) ? true : false ;
      });
      cat.selected = (categorySelected.length > 0) ? true : false;
    })

    var subcat = {}
    var j = 0
    interestOptions.forEach(option => {
      if (this.state.categories[option.categoryId].selected === true) {
        subcat[option.categoryId] = []
        option.subcategory.forEach(sub => {
          subcat[option.categoryId].push({ subId: j, categoryId: option.categoryId, category: this.state.categories[option.categoryId].value, value: sub, selected: false })
          j++
        })
      }
    })

    this.state.subcategories = subcat;
    
    
  }

  addInterest () {
    this.setState({ showAddInterestModal: true })
  }

  pushNewInterest (newInterest) {
    
    this.state.interests.push({ category: newInterest.category, selected: false, subcategory: newInterest.value, value: []})
    this.setState({ interests: [...this.state.interests] })
    this.setState({ showAddInterestModal: false })
  }

  handleChange (i, e) {
    
    this.setState({ interests : [...this.state.interests] })
  }

  render () {
    var categories = []
    var i = 0;
    var customTags = [];
    var newInterests = this.state.newInterests;
    var addInterstModal;

    this.state.interests.forEach((interest) => {
      customTags.push(<span class="react-tagsinput-tag" key={i}>{ interest.title } ({ interest.category }) <a class="react-tagsinput-remove" onClick={ this.handleChange.bind(this, i) }></a></span>)
      i++;
    })

    
    if(this.state.showAddInterestModal)
      addInterstModal = <AddInterestsModal interests={this.state.interests} categories={this.state.categories} done={this.pushNewInterest.bind(this)} />  
    
    
    return (
      <div className='edit_overlay'>
        <div className='overlay-inner-div' style={{ 'padding':'0' }}>
          
          <div className='auth_title'>
            <span className='pull-right'>
              <i className='glyphicon glyphicon-remove' onClick={() => { this.props.closeModal('interests', this.state) }} />
            </span>
            Interests
          </div>

          <div className='row margin0'>
              <div id='interests-section'>
                <div className='barFix section4'>
                  <h2 style={{ fontSize: 1.5 + 'em', textAlign: 'center' }}>Please complete the following statement:
                  <br /> <br />
                  “I would like to meet someone who has a shared interest in…”</h2>
                  { customTags }
                </div>

                <div id='newInterests-section'>
                  { addInterstModal }
                </div>

              </div>

          </div>

          <div className='continue_btn_div' >
            <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.props.handleSave('interests', this.state) }}>Save</button>
            <button className='btn btn-primary continue_btn pull-right' onClick={this.addInterest.bind(this)}>Add</button>  
          </div>

        </div>
      </div>
    )
  }
}
