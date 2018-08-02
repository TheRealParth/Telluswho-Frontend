import React from 'react'
import Shape from './shape'
import { pageTypes } from '../options/pageTypes'

type defaultProps = {
}

export default class Question extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
    }
  }
  props: defaultProps;
  handleTitleChange = (e) => {
    this.setState({title: e.target.value})
  }
  handleCreateGroupItem = () => {
    if(this.state.title.length){
      this.props.addGroupItem(this.state.title)
      this.props.setGroupContactsSection();
      this.setState({title: ''})
    }
  }
  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.handleCreateGroupItem();
    }
  }

  render() {
    switch(this.props.type) {
      case (pageTypes.TAGS_QUESTIONS ) : {
        if(this.props.question) {
          return (
            <div>
              <p> Add your &nbsp;
                      <span style={{ color: this.props.question.color ? this.props.question.color : '' }}>
                        <b>
                          <span className='inlineSymbol' >
                            <Shape groupItem={this.props.question} />
                          </span>{this.props.question.value}</b></span> to the social map by dragging them from your contact list.<br />
                     If the contact is already in the dropbox, you can simple click the contact to add them to the &nbsp;
                      <span style={{ color: this.props.question.color }} ><b><span className='inlineSymbol'><Shape groupItem={this.props.question} /> </span>{this.props.question.value}</b></span> tag. <br />
                     If you want to remove the contact from the current tag, click the contact again.<br /> At the end of this series of questions, you'll be able to review and change all of the contacts and their tags.
                    </p>
            </div>
          )
        } else {
          return  <div>
            Loading...
          </div>
        }

      }
      case (pageTypes.SORT_CONTACTS) : {
        if(this.props.sortContactsSection){
              return (
                <div>
                  <p> Are there any other important group activities that are not listed on the social map? Please add by clicking the "Tags" tab on the left and then the + button and then tag the relevant people.
                      Current tag:   <span style={{ color: this.props.question.color }} ><b><span className='inlineSymbol'><Shape groupItem={this.props.question} /> </span>{this.props.question.value}</b></span></p>
                </div>
              )
        } else {
          return (
            <div>
              <p> Are there any important NJIT contacts missing from your social map? If so, please add them. Current tag:   <span style={{ color: this.props.question.color }} ><b><span className='inlineSymbol'><Shape groupItem={this.props.question} /> </span>{this.props.question.value}</b></span></p>
            </div>
          )
        }
      }
      case (pageTypes.GROUP_CONTACTS) : {
        if(this.props.groupContactsSection) {
          return (<div>
            Please associate each group item to their respective group members by clicking the + button on the title then clicking all the contacts that belong to it.
            <br/>To Add More Groups : <input type='text' placeholder='Group Title' value={this.state.title} onKeyUp={(e)=>this.handleKeyPress(e)} onChange={this.handleTitleChange} />
            <i className="glyphicon glyphicon-plus" onClick={this.handleCreateGroupItem} />
            <br/><br />
            You can view the contacts in the group by clicking on <i className="glyphicon glyphicon-plus" onClick={this.handleCreateGroupItem} />
            <br/><br />
          </div>)
        } else {
          return (
            <div>
              Now that you have all your NJIT friends on the social desktop, please arrange them into groups that make sense to you. Add a title and click the + button to create a group.
              <input type='text' placeholder='Group Title' value={this.state.title} onKeyUp={(e)=>this.handleKeyPress(e)} onChange={this.handleTitleChange} />
              <i className="glyphicon glyphicon-plus" onClick={this.handleCreateGroupItem} />
              <br/><br/>
            </div>
          )
        }
      }
      case (pageTypes.BUCKET_QUESTIONS) : {
          return (
            <div>
              <h2>{this.props.bucketQuestion.value}</h2>
            </div>
          )
      }
      case (pageTypes.SELECT_CONTACTS) : {
          return (
            <div>
              <h2>{this.props.selectContactsQuestion.value}</h2>
            </div>
          )
      }
      default : {
        return <div>
          Loading...
        </div>
      }
    }
  }

  // render () {
  //   if(this.props.doneSocial){
  //     return (<div></div>)
  //   }
  //   else if(this.props.question){
  //       if(this.props.doneContactsQuestions){
  //         return (
  //           <div>
  //             <h2>{this.props.contactsQuestion.value}</h2>
  //           </div>
  //         )
  //     }
  //     else if(!this.props.doneContactsQuestions && this.props.doneGroups) {
  //       return (
  //         <div>
  //           Now that you have all your NJIT friends on the social desktop, please arrange them into groups that make sense to you. Add a title and click the + button to create a group.
  //           <input type='text' placeholder='Group Title' value={this.state.title} onKeyUp={(e)=>this.handleKeyPress(e)} onChange={this.handleTitleChange} />
  //           <i className="glyphicon glyphicon-plus" onClick={this.handleCreateGroupItem} />
  //           <br/>
  //           <span style={{ color: this.props.question.color }} ><b><span className='inlineSymbol'><Shape groupItem={this.props.question} /> </span>{this.props.question.value}</b></span>
  //         </div>
  //       )
  //     }
  //     else if(!this.props.doneGroups && this.props.doneContacts){
  //       return (
  //         <div>
  //           <p> Are there any other important group activities that are not listed on the social map? Please add by clicking the "Tags" tab on the left and then the + button and then tag the relevant people.
  //               Current tag:   <span style={{ color: this.props.question.color }} ><b><span className='inlineSymbol'><Shape groupItem={this.props.question} /> </span>{this.props.question.value}</b></span></p>
  //         </div>
  //       )
  //     } else if(!this.props.doneContacts && this.props.doneTagsQuestion){
  //       return (
  //         <div>
  //           <p> Are there any important NJIT contacts missing from your social map? If so, please add them. Current tag:   <span style={{ color: this.props.question.color }} ><b><span className='inlineSymbol'><Shape groupItem={this.props.question} /> </span>{this.props.question.value}</b></span></p>
  //         </div>
  //       )
  //     } else if(!this.props.doneTags){
  //       return (
  //         <div>
  //           <p> Add your &nbsp;
  //                   <span style={{ color: this.props.question.color ? this.props.question.color : '' }}>
  //                     <b>
  //                       <span className='inlineSymbol' >
  //                         <Shape groupItem={this.props.question} />
  //                       </span>{this.props.question.value}</b></span> to the social map by dragging them from your contact list.<br />
  //                  If the contact is already in the dropbox, you can simple click the contact to add them to the &nbsp;
  //                   <span style={{ color: this.props.question.color }} ><b><span className='inlineSymbol'><Shape groupItem={this.props.question} /> </span>{this.props.question.value}</b></span> tag. <br />
  //                  If you want to remove the contact from the current tag, click the contact again.<br /> At the end of this series of questions, you'll be able to review and change all of the contacts and their tags.
  //                 </p>
  //         </div>
  //       )
  //     } else {
  //       return (<div> </div>)
  //     }
  //   } else {
  //     return (<h1> Loading... </h1>)
  //   }
  // }
}
