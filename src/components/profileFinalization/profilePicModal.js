import React from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
type defaultProps = {
	close?: any,
	imageUrl: string,
	closeModal: any,
	handleCrop: any
}
export default class ProfilePicModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      crop:{},
      cp: {}
    }
  }
  props: defaultProps;
  close () {
    this.props.closeModal('profilePic')
  }
  handleCrop = (crop, pixelCrop) => {
    const pc = pixelCrop
    const cp = crop
    this.setState({ crop: pc, cp: cp })
    
  }
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps != this.props
  }
  handleSubmit () {
    
    this.props.handleCrop(this.props.imageUrl, this.state.crop)
    this.props.closeModal('profilePic')
  }
  render () {
    return (
      <div className='edit_overlay'>
        <div className='overlay-inner-div' style={{ 'padding':'0' }}>
          <div className='auth_title'>
            <span className='pull-right'>
              <i className='glyphicon glyphicon-remove' onClick={this.close.bind(this)} />
            </span>
			      		Crop your photo
			      	</div>

          <ReactCrop src={this.props.imageUrl} onComplete={this.handleCrop.bind(this)} crop={{
            keepSelection: true,
            aspect: 1
          }} />
          <div className='continue_btn_div' >
            <button className='btn btn-primary continue_btn pull-right' onClick={this.handleSubmit.bind(this)}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}
