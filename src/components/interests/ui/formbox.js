import React from 'react'

export default class FormBox extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div onClick={this.props.select.bind(this)} className='formBox formBox-drag reviewBox no-highlight' style={{ backgroundColor: this.props.category.selected ? '#459aff' : '#fff' }} >
        <div style={{ padding: 0 + 'px' }}>
          <div className='interestHeader no-highlight' style={{ color: this.props.category.selected ? '#F9F9F9' : '#2B2B2B', fontSize: 17 + 'px', fontWeight: 'semibold', lineHeight: 1.5 }}>
            { this.props.category.value }

          </div>
          <div className='background' />
        </div>
      </div>
    )
  }

}
