import React from 'react'
import { browserHistory } from 'react-router'
import { setViewedTerms } from '../../actions/userAuth.js'
import { connect } from 'react-redux'
import Header from '../../pages/ui/header'

@connect((store) => {
  return {
    user: _.isEmpty(store.user.user) ? store.survey.user : store.user.user
  }
})
export default class TermsConditions extends React.Component {
  constructor (props) {
    super(props)
  }
  handleSubmit () {
    this.props.dispatch(setViewedTerms())
    localStorage.setItem('hasViewedTerms', true)
    browserHistory.push('/signup')
  }
  getName = () => {
    if (this.props.user.fullName) {
      return (<span style={{ fontWeight: 700 }}>{this.props.user.fullName}</span>)
    } else {
      return ''
    }
  }
  render () {
    return (
      <div className='terms_overlay'>
        <div className='terms-overlay-inner-div'>
          <div className='title'>Consent Form</div>
          <div className='consent_form' style={{ fontWeight: '600' }}>
            <p style={{ fontWeight: 700, textDecoration: 'none' }}>
							NEW JERSEY INSTITUTE OF TECHNOLOGY <br />
							323 MARTIN LUTHER KING BLVD.<br />
							NEWARK, NJ 07102<br /><br />
            </p>
            <p style={{ textDecoration: 'none' }}>Thank you for participating in our research study. Please read below statement carefully</p>
            <p style={{ fontWeight: '900' }}>CONSENT TO PARTICIPATE IN A RESEARCH STUDY</p>
            <p style={{ }}><b style={{ fontWeight: '900' }}>TITLE OF STUDY:</b><br />Student’s Social Network Changes Over Time</p><br />
            <p ><b style={{ fontWeight: '900' }}>RESEARCH STUDY:</b><br />I have been asked to participate in a research study under the direction of  Dr. Quentin Jones. Other professional persons who work with them as study staff may assist to act for them.
							</p><br />
            <p ><b style={{ fontWeight: '900' }}>PURPOSE:</b><br />Understand how students’ form their social networks and how do they change over time and the diffusion on innovation.</p>
            <br />
            <p ><b style={{ fontWeight: '900' }}>DURATION:</b><br />My participation in this study will last for 30 minutes.</p><br />
            <p ><b style={{ fontWeight: '900' }}>PROCEDURE:</b><br />I have been told that, during the course of this study, the following will occur:
							</p>
            <ol >
              <li>Make an account with a username and password. Password will not be stored</li>
              <li>Fill out basic information questions that include personality and well-being questionnaires, as well as questions regarding birthday, gender, relationship status, and sexuality</li>
              <li>Get interests, hobbies and activities as well as follow-up questions like how passionate you are about them, your level of expertise and if you are looking to meet people who are interested in them</li>
              <li>Download a mobile app that can retrieve mobile phone contacts</li>
              <li>Phone contacts will be displayed so we can know more about who you do activities with, as well as, how and where you met them </li>
              <li>Complete diffusion of innovation questionnaire which will ask questions about a coordination software</li>
            </ol>
            <br />
            <p><b style={{ fontWeight: '900' }}>PARTICIPANTS:</b><br />I will be one of about 100 participants in this study.</p><br />
            <p><b style={{ fontWeight: '900' }}>EXCLUSIONS:</b><br />I will inform the researcher if any of the following apply to me <br /><br />I am under 18 years of age

								</p><br />
            <p><b style={{ fontWeight: '900' }}>RISKS/DISCOMFORTS:</b><br /><p>I have been told that the study described above may involve the following risks and/or discomforts:
								</p>
              <p>You may feel uncomfortable answering some of the background questions that include your gender and sexuality. You may decide to stop participating at any time.
								</p>
              <p>There also may be risks and discomforts that are not yet known.
								</p>
              <p>
									I fully recognize that there are risks that I may be exposed to by volunteering in this study which are inherent in participating in any study; I understand that I am not covered by NJIT’s insurance policy for any injury or loss I might sustain in the course of participating in the study.
								</p>
            </p>
            <br />

            <p><b style={{ fontWeight: '900' }}>CONFIDENTIALITY:</b><br />I understand confidential is not the same as anonymous.  Confidential means that my name will not be disclosed if there exists a documented linkage between my identity and my responses as recorded in the research records.  Every effort will be made to maintain the confidentiality of my study records.  If the findings from the study are published, I will not be identified by name.  My identity will remain confidential unless disclosure is required by law.
								</p><br />
            <p><b style={{ fontWeight: '900' }}>PAYMENT FOR PARTICIPATION:</b><br />I have been told that I will receive up to $30 compensation for my participation in this study.
								</p><br />
            <p><b style={{ fontWeight: '900' }}>RIGHT TO REFUSE OR WITHDRAW:</b><br />I understand that my participation is voluntary and I may refuse to participate, or may discontinue my participation at any time with no adverse consequence. I also understand that the investigator has the right to withdraw me from the study at any time.
								</p><br />
            <p><b style={{ fontWeight: '900' }}>INDIVIDUAL TO CONTACT:</b><br />If I have any questions about my treatment or research procedures, I understand that I should contact the principal investigator at:
								</p><br />
            <p>Dr. Quentin Jones (quentin.jones@njit.edu) 973-596-3368</p>
            <br />
            <p>If I have any addition questions about my rights as a research subject, I may contact:</p>
            <br />
            <p style={{ paddingLeft: '5em' }}>
									Farzan Nadim, IRB Chair<br />
									New Jersey Institute of Technology<br />
									323 Martin Luther King Boulevard<br />
									Newark, NJ  07102<br />
									(973) 596-5825<br />
									irb@njit.edu/farzan@njit.edu <br />
            </p>
            <br /><br />
            <p style={{ fontSize: '18px' }}><b style={{ fontWeight: '900' }}>SIGNATURE OF PARTICIPANT</b><br />
					        By clicking the ‘I agree’ button below, I agree to and have read this entire form, or it has been read to me, and I understand it completely.  All of my questions regarding this form or this study have been answered to my complete satisfaction.  I agree to participate in this research study.
									</p>
            <br />
            <br />
            <br />
            <button type='button' className='btn continue_btn pull-right' onClick={this.handleSubmit.bind(this)}>I agree</button>
            <br />
            <br />
          </div>
        </div>
      </div>
    )
  }
}
