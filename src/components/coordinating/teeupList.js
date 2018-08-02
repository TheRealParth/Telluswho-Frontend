/**
 * Created by isg6 on 4/6/2017.
 */
import React, { Component } from 'react'

export default class TeeupList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      teeupTitle: 'Teeup Title*',
      invitedPeople: ['Invited People'],
      where:'Suggest Where'
    }
  }

  render () {
    const teeupTitle = this.state.teeupTitle
    const invitedPeople = this.state.invitedPeople
    const where = this.state.where
    

    return (
      <div>
        {/* <table>
          <thead>
            <tr>
              <th colSpan={2}>New Teeup Create: </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='hide-border'>IC</td>
              <td>{teeupTitle}</td>
            </tr>
            <tr>
              <td className='hide-border'>IC</td>
              <td>{invitedPeople.map((people) => <div key={people.toString()}>{people}</div>)}</td>
            </tr>
            <tr>
              <td className='hide-border'>IC</td>
              <td>Invitation Message</td>
            </tr>
            <tr>
              <td className='hide-border'>IC</td>
              <td>Suggest When</td>
            </tr>
            <tr>
              <td className='hide-border'>IC</td>
              <td>{where}</td>
            </tr>
          </tbody>

        </table> */}
      </div>
    )
  }
}
