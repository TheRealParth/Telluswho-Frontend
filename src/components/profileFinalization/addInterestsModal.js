import React from 'react'
import Select from 'react-select'
import { interestOptions } from '../interests/options/interestOptions'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import TagsInput from 'react-tagsinput'
import FormBox from '../interests/ui/formbox'

export default class AddInterestsModal extends React.Component {
  constructor (props) {
    super(props)
    
    var subcat = {}
    var j = 0;
    interestOptions.forEach(option => {
        subcat[option.categoryId] = []
        option.subcategory.forEach(sub => {
          subcat[option.categoryId].push({ subId: j, categoryId: option.categoryId, category: this.props.categories[option.categoryId].value, value: sub, selected: false })
          j++
        })
    })


    
    this.state = {
      section: 0,
      categories: this.props.categories,
      subcategories: subcat,
      interests: this.props.interests,
      currInterest: this.props.interests.length,
      selectedCategory : {},
      categorySelected: false,
      selectedSubCategory: {},
      showError: false,
      showOverlay: true
    }

    this.state.categories.forEach((cat) => {
      var categorySelected = this.state.interests.filter(function(interest){
        return (interest.category == cat.value) ? true : false ;
      });
      cat.selected = (categorySelected.length > 0) ? true : false;
    })
    
    
  }

  logger = (selected) => {
    this.setState({ selectedCategory: selected})
    this.setState({ categorySelected : true })
  }

  saveInterest = (selected) => {
    this.setState({ selectedSubCategory : selected})
    this.props.done(selected)
  }

  render () {
    var cat = [];
    var subCategoryDropDown;
    this.state.categories.forEach((category) => {
      if(category.selected == false)
        category.label = category.value
    })

    if(this.state.categorySelected){
      var subCategory = this.state.subcategories[this.state.selectedCategory.key]
      subCategory.forEach((subcat) => {
        subcat.label = subcat.value
      })  
      subCategoryDropDown = <Select style={{ marginBottom: 10 + 'px' }} className='customDropdown'
          onChange={this.saveInterest}
          value={this.state.selectedSubCategory}
          options={subCategory}
          placeholder='Please select a sub-category' />
    }
    
    return (
      <div className='formBox formBox-drag reviewBox no-highlight'>
        <h6>Category </h6>
        <Select style={{ marginBottom: 10 + 'px' }} className='customDropdown'
          onChange={this.logger}
          value={this.state.selectedCategory}
          options={this.state.categories}
          placeholder='Please select a category' />
        { subCategoryDropDown }
      </div>
    )
  }
}
