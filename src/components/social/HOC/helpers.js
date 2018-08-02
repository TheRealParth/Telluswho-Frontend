var _ = require('lodash');
import { defaultOptions } from '../options/defaultOptions';
import { groupColors } from '../options/groupColors';

export const createTags = (interests, schoolAndWork) => {
    let i = 0;
    return _.flatten([
         _.map(defaultOptions, (option) => {
           option.id = i
           option.type = 'default'
           option.color = groupColors[i % groupColors.length]
           i++
           return option
         }),
         _.map(schoolAndWork.organizations, (org) => {
           var newOrg = {
             id: i,
             type: 'organization',
             value: org,
             color: groupColors[i % groupColors.length]
           }
           i++
           return newOrg
         }),
         _.flatten(
              _.map(interests, (interest) => {
                return _.map(interest.methodInGroup, (method) => {
                  var newMethod = {
                    id: i,
                    type: 'activity',
                    activity: method + ' ' + interest.title,
                    value: method + ' ' + interest.title,
                    color: groupColors[i % groupColors.length]
                  }
                  i++
                  return newMethod
                })
              })
            )
       ])
       if(schoolAndWork.doesWork === 1){
         this.setState({doesWorkOrVolunteer: true});
         temp.push({
           id: i,
           type: 'work',
           value: schoolAndWork.workField + " (as employee at " + schoolAndWork.workPlace + ")",
           color: groupColors[i % groupColors.length]
         })
         i++
       }
       if(schoolAndWork.doesVolunteer === 1){
         this.setState({doesWorkOrVolunteer: true});
         temp.push({
           id: i,
           type: 'work',
           value: schoolAndWork.volunteerField + " (as volunteer at " + schoolAndWork.volunteerPlace + ")",
           color: groupColors[i % groupColors.length]
         })
         i++
       }
}

export const createSingleTag = (type, title, id) => {
  if(type == "activity"){
    return {
      id: id,
      type: 'activity',
      activity: title,
      value: title,
      color: groupColors[id % groupColors.length]
    }
  } else if(type == "organization") {
    return {
      id: id,
      type: 'organization',
      activity: title,
      value: title,
      color: groupColors[id % groupColors.length]
    }
  } else if(type ==  "default") {
    return {
      id: id,
      type: 'default',
      activity: title,
      value: title,
      color: groupColors[id % groupColors.length]
    }
  } else {
    return false;
  }
}

export const createGroupItem = (id, title, offset ) => {
  return {
    index: id,
    x: 0 + offset,
    y: 0 + offset,
    title: title
  }
}

export const createSocialGroups = (id, title, cordinates) => {
  return {
    index: id,
    x: cordinates.x,
    y: cordinates.y,
    title: title
  }
}
