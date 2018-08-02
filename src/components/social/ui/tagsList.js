import React from 'react'
import Shape from './shape'


type defaultProps = {
  handleSelectTag: any;
  tagList: Array<Object>;
}
export default class TagsList extends React.Component {
  constructor (props) {
    super(props)
  }
  getStyle = (tag) =>{
    return { borderColor: tag.color, color: tag.color  }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return ((this.props != nextProps) || (this.state != nextState));
  }
  render () {
    return (
      <div className='tabContainer'>
        <h2 className="tag-title">
          Social  <i onClick={()=>this.props.openAddWindow('default')} className="glyphicon glyphicon-plus" />
        </h2>
        <ul className="tags-list">
          {
            this.props.tagList.map((tag) => {
              if (tag.type === 'default') {
                return <li onClick={(e)=>this.props.handleSelectTag(tag.id)} style={this.getStyle(tag)} key={tag.id}>
                  <Shape groupItem={tag} />
                {tag.value}
              </li>
              }
            })
          }
        </ul>
        <h2 className="tag-title">
          Organizations <i onClick={()=>this.props.openAddWindow('organization')} className="glyphicon glyphicon-plus" />
        </h2>
        <ul className="tags-list">
          {
            this.props.tagList.map((tag) => {
              if (tag.type === 'organization') {
                return <li onClick={(e)=>this.props.handleSelectTag(tag.id)} style={this.getStyle(tag)} key={tag.id}>
                  <Shape groupItem={tag} />
                  {tag.value}
                </li>
              }
            })
          }
        </ul>
        <h2 className="tag-title">
          Activities  <i onClick={()=>this.props.openAddWindow('activity')} className="glyphicon glyphicon-plus" />
        </h2>
        <ul className="tags-list">
          {
            this.props.tagList.map((tag) => {
              if (tag.type === 'activity') {
                return <li onClick={(e)=>this.props.handleSelectTag(tag.id)} style={this.getStyle(tag)} key={tag.id}>
                  <Shape groupItem={tag} />
                  {tag.activity}
                </li>
              }
            })
          }
        </ul>
        <h2 style={{display: !this.props.doesWorkOrVolunteer ? 'none' : ''}} className="tag-title">
          Work/Volunteer
        </h2>
        <ul className="tags-list">
          {
            this.props.tagList.map((tag) => {
              if (tag.type === 'work') {
                return <li onClick={(e)=>this.props.handleSelectTag(tag.id)} style={this.getStyle(tag)} key={tag.id}>
                  <Shape groupItem={tag} />
                  {tag.value}
                </li>
              }
            })
          }
        </ul>
      </div>
    )
  }
}
