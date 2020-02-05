import React,{useContext} from 'react'
import GuestContext from '../../context/guestContext/guestContext'

const GuestFilter = () => {

  const {toggleFilter}=useContext(GuestContext)
  return (
    <div className="lead card">
<label className="switch">
  <input type="checkbox" onChange={()=>toggleFilter()}/>
  <span class="slider round"></span>
  
</label>


     </div>
    
  )
}

export default GuestFilter


  
