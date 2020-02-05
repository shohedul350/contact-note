  
import React,{useContext,useRef} from 'react'
import GuestContect from '../../context/guestContext/guestContext'

const GuestSearch = () => {
  const { searchGuest,clearSearch}=useContext(GuestContect)
  const searchValue=useRef('')

  const handleChange=e=>{
   if(searchValue.current.value !== ''){
     searchGuest(e.target.value)
   }
   else{
     clearSearch()
   }
  }
  return (
    <div className="card">
      <input type="text" onChange={handleChange } className="search" placeholder=" Search Guest by name ..." />
      
    </div>
  )
}

export default GuestSearch