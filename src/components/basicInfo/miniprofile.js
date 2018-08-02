import React from 'react'
import { getUserImage } from '../../actions/userAuth.js'

export default class MiniProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: this.props.user.firstName,
      userImg: this.props.profilePicUrl ? `url(${this.props.profilePicUrl})` : `url(http://api.adorable.io/avatars/100/${this.props.user.firstName + this.props.user.lastName}.jpg)`
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props != nextProps) {
      if (nextProps.user) {
        if (nextProps.user.profilePic && nextProps.user.profilePic.imageData) {
          this.setState({ userImg: 'url(data:image/' + nextProps.user.profilePic.type + ';base64,' + nextProps.user.profilePic.imageData + ')' })
        } else {
          this.setState({ userImg: `url(http://api.adorable.io/avatars/100/${nextProps.user.firstName + nextProps.user.lastName}.jpg)` })
          this.setState({ firstName: nextProps.user.firstName })
        }
      }
      if (nextProps.profilePicUrl) {
        this.setState({
          userImg: `url(${nextProps.profilePicUrl})`
        })
      }
    }
  }
  getAge = (val) => {
    var birthday = new Date(val)
    	var ageDifMs = Date.now() - birthday.getTime()
    	var ageDate = new Date(ageDifMs) // miliseconds from epoch
    	var age = Math.abs(ageDate.getUTCFullYear() - 1970)
    	return (age > 1 && age < 140) ? <p>{age}</p> : <p className='valuePlaceholder' />
  }
  getBackground = () => {
    	const obj = this.props.backgroundInfo
    	return (
      <div className='profileInfo'>
        <hr />
        <div className='infoHolders'>
          <div className='info'>Age
						{this.getAge(obj.dob)}
          </div>
          <div className='info' >Nationality
			     	{!obj.nationality.length ? <p className='valuePlaceholder' /> : <p>{obj.nationality.join(', ')}</p>}
          </div>
        </div>
        <div className='infoHolders'>
          <div className='info'>Native Language
			     	{!obj.nativeLanguage ? <p className='valuePlaceholder' /> : <p>{obj.nativeLanguage}</p>}
          </div>
          <div className='info' >Curently Live
			     	{!obj.onCampus ? <p className='valuePlaceholder' /> : <p>{obj.onCampus == 1 ? obj.campusHousing : obj.currentCity}</p>}
          </div>
        </div>
      </div>
    	)
  }
  getSchoolWork = () => {
    const obj = this.props.schoolAndWork
    	if (this.props.progress < 5 || !obj) {
    		return
    	} else {
	    	return (
  <div className='profileInfo'>
    <hr />
    <div className='infoHolders'>
      <div className='info' style={{ 'width':'100%' }}>Student Type
				     		{!obj.graduate ? <p className='valuePlaceholder' /> : obj.graduate == 1 ? <p>Graduate</p> : <p>Undergraduate</p>}
      </div>
    </div>
    <div className='infoHolders'>
      <div className='info' style={{ 'width':'100%' }}>Major
				     	{!obj.majors.length ? <p className='valuePlaceholder' /> : <p>{obj.majors.map((obj, i) => {
				     		return (<span key={i}>{obj} </span>)
				     	})}</p>}
      </div>
    </div>
  </div>
	    	)
	    }
  }

  getInterests = () => {
    const interests = this.props.interests
      if (this.props.progress < 5 || !interests) {
        return
      } else {
        return (
          <div className='profileInfo'>
            <hr />
            <div className='infoHolders'>
              <div className='info' style={{ 'width':'100%', 'overflow-y': 'scroll', height: 100+'px' }}>Interests
                <p>
                {interests.map((obj, i) => {
                  return (<span key={i}>{obj.title}({obj.category}) <br /></span>)
                })}</p>
              </div>
            </div>
          </div>
        )
      }
  }

  getUserImage = () => {
    return (<div className='picHolder' style={{ backgroundImage: this.state.userImg }} />)
  }
  getUserName = () => {
    return (<h2>{this.state.firstName}</h2>)
  }
  render () {
	    return (
  <div className='profileView'>
    <div className='profilePic'>
      {this.getUserImage()}
    </div>
    {this.getUserName()}
    {this.getBackground()}
    {this.getSchoolWork()}
    {this.getInterests()}
  </div>
	 	)
 	}
}
