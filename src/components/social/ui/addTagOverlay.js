import React from 'react'

export default class AddTagOverlay extends React.Component {
  constructor (props) {
    super();
    this.state = {
      title: ""
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return ((this.props != nextProps) || (this.state != nextState))
  }
  createTag = () => {
    if(!this.state.title || !this.state.title){
      this.setState({error: "Please enter a name for the tag."})
    } else {
      this.props.handleAddTag(this.props.type, this.state.title)
    }
  }
  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      if(this.state.title.length) {
          this.props.handleAddTag(this.props.type, this.state.title)
      } else {
        this.setState({error: "Invalid input"})
      }

    }
  }
  handleTitle = (e) => {
    this.setState({title: e.target.value})
  }
  getType = () => {
    if(this.props.type == "default") {
      return "social"
    } else return this.props.type
  }
  render () {
    return(
      <div>
      <div className='edit_overlay' >
        <div className='overlay-inner-div' style={{ 'paddingRight':'5%', height: '100px' }}>
          <div className='success-message-container'>
              <div className='error'> {this.state.error} </div>
            <div id='self' style={{position: 'relative'}} className='contactCard no-highlight'>
                  Please enter the name of the {this.getType()} tag below:<br/>
                  <div className='auth_input'>
                    <input type='text' value={this.state.username} onKeyPress={this.handleKeyPress} onChange={this.handleTitle} placeholder='Enter the tag name' />
                  </div>
                  </div>
                  <button className='btn btn-primary continue_btn pull-right' style={{marginTop: '200px'}} onClick={() => { this.createTag() }}>Create</button>
                  <a  style={{ bottom: '100px'}} onClick={()=>{this.props.hideAddTag()}}>close window</a>
              </div>
            </div>
          </div>

        </div>
    )
  }
}
