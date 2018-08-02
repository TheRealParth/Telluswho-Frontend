import React from 'react'
import Header from './ui/header'
import Footer from './ui/footer'

export default class Welcome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
 	nextPage = (page) => {
 		this.props.router.push(page)
 	}
  render () {
	    return (
  <div style={{ 'marginTop':'-2%' }}>
    <Header />
    <div className='welcome_content'>
      <p>Welcome to TellUsWho! This is a social networking survey tool that is looking to bridge the gap between student’s campus life and their social networks. This is currently a pilot study which means that not all features will be available for use. The goal of this pilot study is for you to create a profile, download a mobile app to collect your phone contacts, and answer questions about your social network on campus. If you would like to participate in the next iteration of this study which includes using our mobile app to find people on campus and coordinate activities with friends, please let the researcher know at the end of this study.
	      			<br /><br />
        <br />
        <b>To participate in this study you MUST have a UCID and an iPhone or Android phone</b>
        <br /><br /><br />
      </p>
      <div style={{ 'height':'40px' }}>
        <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.nextPage('/terms') }}>Sign up</button>
      </div>
      <div className='link_div' >
        <span onClick={() => { this.nextPage('/login') }}>Already Registered?<br />
	      				Sign in</span>
      </div>
    </div>
    <Footer />
  </div>
	 	)
 	}
}