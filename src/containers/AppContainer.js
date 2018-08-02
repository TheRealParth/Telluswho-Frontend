import React, { Component } from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import Welcome from '../pages/welcome'
import EnsureLoggedInContainer from '../components/auth/ensureLoggedInContainer'
import EnsureLoggedOutContainer from '../components/auth/ensureLoggedOutContainer'
import Login from '../components/auth/login'
import SignUp from '../components/auth/signup'
import Forgot from '../components/auth/forgot'
import SetPassword from '../components/auth/SetPassword'
import Home from '../pages/home'
import SenseOfCommunity from '../components/scientific/senseOfCommunity'
import Sociability from '../components/scientific/sociality'
import WellBeing from '../components/scientific/well-being'
import Background from '../components/basicInfo/background'
import SchoolWork from '../components/basicInfo/schoolWork'

// Interests stuff
import Passion from '../components/interests/yourInterests'
import Expertise from '../components/interests/expertise'
import Teach from '../components/interests/teach'
import Taught from '../components/interests/taught'
import Group from '../components/interests/group'
import GroupMethod from '../components/interests/groupMethod'
import Places from '../components/interests/places'
import Others from '../components/interests/others'
import YourInterests from '../components/interests/yourInterests'
import Profile from '../components/profileFinalization/profile'
import TagsQuestions from '../components/social/tagsQuestions'
import SortContacts from '../components/social/sortContacts'
import GroupContacts from '../components/social/groupContacts'
import SelectContacts from '../components/social/selectContacts'
import BucketQuestions from '../components/social/bucketQuestions'
import CoordinatingHome from '../components/coordinating/coordinatingHome'
import ValidationOverlay from '../components/home/validationOverlay'
import TermsConditions from '../components/home/termsandconditions'
import ValidateEmail from '../components/home/validateEmail'
import { loadSurveyData } from '../actions/surveyAction.js'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'

@connect((store) => {
  return {
    user: _.isEmpty(store.user.user) ? store.survey.user : store.user.user,
    profile:store.survey.profile,
    progress:store.survey.progress,
    redirectURL: store.user.redirectURL,
  }
})
class AppContainer extends Component {
  constructor (props) {
    super(props)
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps !== this.props
  }

  componentDidMount(){
    this.props.dispatch(loadSurveyData())
  }

  render () {
    const { store } = this.props

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div id='rootDiv' style={{ height: '100%' }}>
          <Provider store={store}>
            <Router history={browserHistory} >
              <Route path='/terms' component={TermsConditions} />
              <Route component={EnsureLoggedOutContainer}>
                <Route path='/' component={Welcome} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={SignUp} />
                <Route path='/forgot' component={Forgot} />
                <Route path='/setPassword/:email/:code' component={SetPassword} />
              </Route>
              <Route component={EnsureLoggedInContainer} >
                <Route path='/validate' component={ValidationOverlay} />
                <Route path='/validateEmail' component={ValidateEmail} />

                <Route path='/home' component={Home}>
                  <Route path='/senseOfCommunity' component={SenseOfCommunity} />
                  {/* <Route path="/sociability" component={Sociability}></Route>
                        <Route path="/wellbeing" component={WellBeing}></Route> */}
                  <Route path='/background' component={Background} />
                  <Route path='/schoolandwork' component={SchoolWork} />

                  <Route path='/interests' component={YourInterests} />
                  {/* <Route path="/passion" component={Passion}></Route>
                          <Route path="/expertise" component={Expertise}></Route> */}
                  {/* <Route path="/teach" component={Teach}></Route>
                          <Route path="/taught" component={Taught}></Route> */}
                  <Route path='/group' component={Group} />
                  <Route path='/groupMethod' component={GroupMethod} />
                  {/* <Route path="/others" component={Others}></Route> */}
                  <Route path='/places' compon5ent={Places} />

                  <Route path='/profile' component={Profile} />

                  <Route path='/tagsQuestions' component={TagsQuestions} />
                  <Route path='/sortContacts' component={SortContacts} />
                  <Route path='/groupContacts' component={GroupContacts} />
                  <Route path='/bucketQuestions' component={BucketQuestions} />
                  <Route path='/selectContacts' component={SelectContacts} />


                  <Route path='/coordinating' component={CoordinatingHome} />
                </Route>
              </Route>
            </Router>
          </Provider>
        </div>
      </DragDropContextProvider>
    )
  }
}

export default AppContainer
