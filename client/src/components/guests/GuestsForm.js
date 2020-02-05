import React,{useState,useContext,useEffect} from 'react'
import GuestContext from '../../context/guestContext/guestContext'

const GuestForm = () => {

  const {addGuest,editTable,updateGuest,clearEdit}=useContext(GuestContext)
  useEffect(()=>{ 
    if(editTable !== null){
     setGuest(editTable)
    } else{
      setGuest({
        name:'',
        phone:'',
        dietary:'Non-Veg' 
      })}},[editTable])


  const [guest,setGuest]=useState({
    name:'',
    phone:'',
    dietary:'Non-Veg'
  })

 
  const {name,phone,dietary}=guest
const onchange=(e)=>{
  setGuest({
    ...guest,
    [e.target.name]: e.target.value
  })
}

const onsubmit=e=>{
  e.preventDefault();

  if(editTable === null){
    addGuest(guest)
   
  }else{
    updateGuest(guest)
    clearEdit()
  }
    setGuest({
      name:'',
      phone:'',
      dietary:'Non-Veg'
    })
 
 

}

  return (
    <div className="">
      <h1>Invite Someone</h1>
      <form onSubmit={onsubmit }>


       <div className="form-group">
        <input type="text" 
        className="form-control"
         placeholder="Name"
          name="name"
           value={name} 
           onChange={onchange} />
        </div>

        <div className="form-group">
        <input type="number"
         className="form-control"
         placeholder="Phone" 
         name="phone" 
         value={phone} 
         onChange={onchange} />
        </div>

        <p className="">Dietary :</p>
        <div className="form-check form-check-inline">
        <label className="form-check-label">Non-veg
        <input type="radio" 
        className="form-check-input" 
        name="dietary" 
        value="Non-Veg" 
        onChange={onchange} 
        checked={dietary==='Non-Veg'}
     
        />
        <span className="checkmark"></span>
        </label>
        </div>

        <div className="form-check form-check-inline">
        <label className="form-check-label">Vegan
        <input type="radio" 
        className="form-check-input"
        name="dietary" 
         value="Vegan"
          onChange={onchange}
         checked={dietary==='Vegan'}
          />
          <span className="checkmark"></span>
          </label>
          </div>


          <div className="form-check form-check-inline">
        <label className="form-check-label">Pascatarian
        <input type="radio" 
        className="form-check-input"
        name="dietary" 
        value="Pescatarian" 
          onChange={onchange}
         checked={dietary==='Pescatarian'}
          />
          <span className="checkmark"></span>
          </label>
          </div>

        
          <input type="submit" value={editTable !== null ? 'Update Guest' : 'Add Guest'} className="btn btn-success form-control" />
        {editTable !== null ? < input onClick={clearEdit} type="button" className="btn clear" value="Cancel" /> : null}
        {/* <input type="submit" value="Add Guest" className="btn btn-success form-control" /> */}
      </form>
    </div>
  )
}

export default GuestForm