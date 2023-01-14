import React from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Icon } from '@mui/material';


function SearchBar (props){

  const [what, setWhat] = React.useState('');
  const [where, setWhere] = React.useState('');
  const[loaded, setLoaded] = React.useState(false)
  /*const[recent,setRecent] = React.useState(false)*/
  

  const handleSubmit = (event) => {
  event.preventDefault();

  setWhat('')
  setWhere('')
  setLoaded(!loaded)
  event.target.reset()

  
  props.FetchAPI(what,where)
  props.Loaded(loaded)
}

  const search = {
  what: props.what,
  where: props.where,
  key: Date.now()}

  localStorage.setItem('search', JSON.stringify(search))

  const recent = JSON.parse(localStorage.getItem('search'))

  return (<div>
    <form onSubmit={handleSubmit}>
      <div style={{display:'flex',flexDirection:'column',}} className='searchContainer'>
    <div>
    <input 
    type="text"
    
    id="what" 
    name="what"
    value={props.what}
    className='searchBar' 
    placeholder='What'
    onChange={(event) =>
      setWhat(event.target.value) 
    }
    />
    <input 
    type="text" 
    id="where" 
    name="where"
    value={props.where} 
    className='searchBar'
    placeholder='Where'
    onChange={(event) =>
      setWhere(event.target.value)}
    />
    <button type="submit" className='findJobsButton'>Find Jobs</button>

    
   
    </div>
    </div>
    </form>
  
     
   </div>
  )
}

export default React.memo(SearchBar)