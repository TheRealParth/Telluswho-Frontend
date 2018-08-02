import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { postInterests, increaseProgress } from '../../actions/surveyAction.js'
import FormBox from './ui/formbox'
import { interestOptions } from './options/interestOptions'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
var _ = require('lodash')

@connect((store) => {
  return {
  		user: store.user.user,
  		profile:store.survey.profile.profile,
  		progress:store.survey.progress
  }
})

export default class YourInterests extends React.Component {
  constructor (props) {
    super(props)
    var cat = []
    var subcat = []
    let i = 0
    interestOptions.forEach(option => {
      cat.push({ key: option.categoryId, value: option.category, selected: false })
      i++
    })
    this.state = {
      section: 0,
      categories: cat,
      subcategories: [],
      interests: [],
      currInterest: 0,
      showError: false,
      showOverlay: false
    }
  }
  handleChange (i, e) {
    var temp = this.state.interests
    temp[i].value = e
    this.setState({ interests: temp })
  }
  toggleCategory (i, e) {
    this.state.categories[i].selected = !this.state.categories[i].selected
    this.setState({ categories: [...this.state.categories] })
  }
  toggleSubCategory (i, j, e) {
    var temp = this.state.subcategories
    for (var f = 0; f < temp[i].length; f++) {
      if (temp[i][f].subId == j) {
        temp[i][f].selected = !temp[i][f].selected
      }
    }
    this.setState({ subcategories: temp })
  }
  nextPage (page) {
    if ((this.state.currInterest + 1 >= this.state.interests.length) && this.state.section == 2) {
      this.setState({ section: 3 })
      this.props.dispatch(postInterests(this.state.interests)).then((res) => {
        if (res.type != 'DATA_ERR') {
          browserHistory.push('/group')
          this.props.dispatch(increaseProgress())
        }
      })
    }

    if (this.state.section == 0) {
      if(!this.state.interests.length){
        var interests = []
        interestOptions.forEach(option => {
          if(this.state.categories[option.categoryId].selected == true){
            interests.push({ category: option.category, selected: true, subcategory: option.subcategory.join(), value: []})
          }
        })  
      }
      this.setSubCategories()
      this.setState({ interests: interests })
      this.setState({ section: this.state.section + 2 })
    } else if ((this.state.section == 1) && (!this.state.interests.length)) {
      var interests = []

      for (var sub in this.state.subcategories) {
        var subcat = this.state.subcategories[sub]
        subcat.forEach(subCat => {
          if (subCat.selected) {
            interests.push({ category: subCat.category, selected: false, subcategory: subCat.value, value: [] })
          }
        })
        this.setState({ interests: interests })
        this.setState({ section: this.state.section + 1 })
      }
    } else if (this.state.section == 2 && (this.state.interests.length)) {
      if (this.state.interests.length > this.state.currInterest) {
          // 
          // TODO Add a check to see if input is empty
        if (!this.state.interests[this.state.currInterest].value || this.state.interests[this.state.currInterest].value.length <= 0) {
          this.setState({ showError: true })
          this.setState({ errorMessage: 'Must enter at least one interest. Press enter after typing.' })
        } else {
          this.setState({ showError: false })
          this.setState({ currInterest: this.state.currInterest + 1 })
        }
      } else {
        this.setState({ section: this.state.section + 1 })
      }
    } else {
      this.setState({ showError: true })
    }

    window.scrollTo(0, 0)
  }
  setSubCategories () {
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

    this.setState({ subcategories: subcat })
  }
  handleOverlaySubmit = () => {
    this.setState({ showOverlay: false })
  }

  render () {
    const getError = () => {
      if (this.state.showError) {
        return (<div className='error' style={{ marginTop: '15%', marginBottom: '-13%' }}>{this.state.errorMessage ? this.state.errorMessage : 'Please select at least one interest.'}</div>)
      } else {
        return
      }
    }
    const getTitle = () => {
      if ((this.state.currInterest < this.state.interests.length)) {
        return (<div>
          <h1>Please provide us with at least one specific group interest or activity for { this.state.interests[this.state.currInterest].category ? this.state.interests[this.state.currInterest].category : '' } </h1>
          <h2 style={{ fontSize: 1.5 + 'em', textAlign: 'center' }}>(e.g. {this.state.interests[this.state.currInterest].subcategory ? this.state.interests[this.state.currInterest].subcategory : '' })</h2>
        </div>)
      } else {
        return
      }
    }

    if (this.state.showOverlay) {
      return (<div className='validate_overlay' style={{ backgroundColor: '#eee', marginTop: '10%', marginBottom: '-10%' }}>
        <div className='overlay-inner-div' style={{ minHeight: '380px', border: '1px solid #aaa' }}>
          <div className='col-md-12 col-sm-12 formBox' style={{ borderRightWidth: '0px' }}>
            <div className='formWrapper' style={{ borderBottom: 0 + 'px' }}>
              <p style={{ fontSize: '16px' }}>In this section we are looking to know more about your interests, hobbies and activities.<br /><br /> We are <b>NOT</b> looking for every single interest, hobby or activity you do, but rather, ones where you <b>WOULD LIKE TO MEET PEOPLE WHO DO THEM.</b> <br /> <br />On the first screen you will be given a list of broad categories like music, movies, books etc. When you continue you will answer more detailed questions about the categories you chose. For example, if you want to meet someone who shares a similar genre of music, you will select “genre” now and list the genre on the next page.</p>
            </div>
          </div><button type='button' className='btn continue_btn pull-right' onClick={this.handleOverlaySubmit}>Continue</button>

        </div>
      </div>)
    }
    if (this.state.section == 0) {
      var categories = []

      this.state.categories.forEach((cat) => {
        categories.push(<FormBox key={cat.key} select={this.toggleCategory.bind(this, cat.key)} category={cat} />)
      })
      var partial = (
        <div id='interests-section'>
          <div className='barFix section4'>
            <h2 style={{ fontSize: 1.5 + 'em', textAlign: 'center' }}>We want to know some of the group interests and activities you already do with your friends<br /> and some you want to do in the future.
             <br /> <br />
            Please pick up to 3
            <br /> <br />
            </h2>
            <div className='cardHolder dragFrame '>
              {
                categories
              }
            </div>
          </div>
          <div className='continue_btn_div' style={{ 'width':'35%' }}>
            <button className='btn btn-primary continue_btn pull-right' onClick={this.nextPage.bind(this)}>Continue</button>
          </div>
        </div>)
    } else if (this.state.section == 1) {
      var subs = []
      var i = 0

      this.state.categories.forEach((cat) => {
        if (cat.selected) {
          subs.push(<h3 key={i}>{cat.value}</h3>)
          i++
          this.state.subcategories[cat.key].forEach((sub, index) => {
            subs.push(<FormBox key={i} catKey={cat.key} sub subKey={sub.subId} select={this.toggleSubCategory.bind(this, cat.key, sub.subId)} category={sub} />)
            i++
          })
        }
      })
      partial = (
        <div id='interests-section'>
          <div className='barFix section4'>
            <h2 style={{ fontSize: 1.5 + 'em', textAlign: 'center' }}>
              In this section we want to know more about the categories you chose on the previous page. Please select the <b>SHARED</b> interests that might make you want to <b>MEET SOMEONE</b>.
 <br /> <br />
Is your <b>SHARED</b> interest a....?</h2>
            <div className='cardHolder dragFrame '>
              {
                  subs
                }
            </div>
          </div>
          <div className='continue_btn_div' style={{ 'width':'35%' }}>
            <button className='btn btn-primary continue_btn pull-right' onClick={this.nextPage.bind(this)}>Continue</button>
          </div>
        </div>)
    } else if (this.state.section == 2) {
      var fields = []
      var i = 0
      this.state.interests.forEach((interest) => {
        fields.push(<TagsInput key={i} value={this.state.interests[i].value} onChange={this.handleChange.bind(this, i)} />)
        i++
      })
      partial = (

        <div id='interests-section'>
          { getError()}
          <div className='barFix section4'>
            {getTitle()}
            <h2 style={{ fontSize: 1.5+ 'em', textAlign: 'center' }}>Please press the <b>ENTER</b> button to create a tag.</h2>
            <div className='cardHolder dragFrame '>
              {
                   fields[this.state.currInterest]
                 }
            </div>
          </div>
          <div className='continue_btn_div' style={{ 'width':'35%' }}>
            <button className='btn btn-primary continue_btn pull-right' onClick={this.nextPage.bind(this)}>Continue</button>
          </div>
        </div>)
    } else {
      return (<h1>Interests Page</h1>)
    }
    return partial
  }
}
