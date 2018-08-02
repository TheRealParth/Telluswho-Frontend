import React from 'react'

type defaultProps = {
  onSelect: any;
  selectedList: number;
  enableTags: boolean;
}

export default class Tabs extends React.Component {
  constructor (props) {
    super(props)
  }
  props: defaultProps

  getTags = () => {
    let enableTags = (this.props.currQues+1 == this.props.totalQuestions) ? true : this.props.enableTags;
    let selectedList = (this.props.currQues+1 == this.props.totalQuestions) ? 1 : this.props.selectedList;
    if (enableTags) {
      return <li className={selectedList ? 'tagsTab active' : 'tagsTab'}><a onClick={() => this.selectItem(1)}>Tags</a></li>
    } else {
      return
    }
  }
  selectItem = (n) => {
    if (this.props.selectedList != n) {
      this.props.onSelect(n)
    }
  }
  render () {
    let selectedList = (this.props.currQues+1 == this.props.totalQuestions) ? 1 : this.props.selectedList;
    return (
      <ul className='socialTabs nav nav-pills nav-justified'>
        <li className={!selectedList ? 'contactsTab active' : 'contactsTab'}><a onClick={() => this.selectItem(0)}>Contacts</a></li>
        {this.getTags()}
      </ul>
    )
  }
}
