import React,{useContext} from 'react'
import GuestContext from '../../context/guestContext/guestContext'

const GuestCounter = () => {
  const {guests}=useContext(GuestContext)

  const totalInvited=guests.length
  const attending =guests.filter(guest=>guest.isconfirmed)
  const totalAttending=attending.length
  const invitedByDiet=(type)=>guests.filter(guest=>guest.dietary===type).length
  const attendingByDiet=(type)=>attending.filter(guest=>guest.dietary===type).length
  return (
    <div className="container px-5">
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Guest</th>
      <th scope="col">Invited</th>
      <th scope="col">Attending</th>
      
    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="row">Non-Veg</th>
      <td>{invitedByDiet('Non-Veg')}</td>
      <td>{attendingByDiet('Non-Veg')}</td>
     
    </tr>
    <tr>
      <th scope="row">Veg</th>
      <td>{invitedByDiet('Vegan')}</td>
      <td>{attendingByDiet('Vegan')}</td>
     
    </tr>
    <tr>
    <th scope="row">Pascatarain</th>
    <td>{invitedByDiet('pascatarain')}</td>
  <td>{attendingByDiet('pascatarain')}</td>
    
      
    </tr>
    <tr>
    <th scope="row">Total</th>
  <td>{totalInvited}</td>
  <td>{totalAttending}</td>
      
    </tr>
  </tbody>
</table>
    </div>
  )
}

export default GuestCounter