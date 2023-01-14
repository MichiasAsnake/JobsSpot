import React from 'react'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

function JobDetail(props){
  return (
    
    <div className='detailContainer'>

      <div style={{boxShadow: '0 8px 6px -5px #d4d2d0', 
      padding:'0px 0 20px 15px',
      boxSizing:'content-box',
      width:'fit-con',
      postion:'relative',
      marginLeft:'-18px'}}>

      <img src={props.image} style={{width:70, 
      border: 'solid white 2px', 
      borderRadius: 10, 
      marginTop:10,
      marginBottom:-10}}>

      </img><h2 style={{fontSize:'20px',marginBottom:'5px',fontFamily: 'Yorkten NorMed'}}>{props.title}</h2>
      <div className='jobDescriptionStyle' style={{color: '#2557a7', 
      fontWeight:'500' }}>
        {props.company}</div>
      <div className='jobDescriptionStyle'>{props.city} • {props.country}</div>
      <div className='jobType'>
        <BusinessCenterIcon style={{fontSize:'17px',padding:'2px 0 2px 2px'}}/>{props.employmentType}
      </div>
      {props.payment && <div className='jobType'>${props.payment}</div>}
      <button className='applyButton' onClick= {() => window.location.href = props.link}>
        Apply now on {props.site}</button>
      </div>
      <div className='jobDetailScroll'>
        
        {props.benefits && <div><h3 style={{fontFamily: 'Yorkten NorMed'}}>Job details</h3>
        <ul><div className='jobDescriptionStyleD'>{props.benefits}</div></ul></div>}

        {props.qualifications && <div><h3 style={{fontFamily: 'Yorkten NorMed'}}>Qualifications</h3>
        <ul><div className='jobDescriptionStyleD'>{props.qualifications}</div></ul></div>}

        <h3 style={{fontFamily: 'Yorkten NorMed'}}>Full Job Description</h3>
        {props.description}</div>
    </div>
    
  )
}

export default React.memo(JobDetail)