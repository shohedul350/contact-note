import React,{useContext,useEffect} from 'react';
 import GuestForm from '../guests/GuestsForm'
import GuestCounter from '../guests/GuestCounter'
import GuestFilter from '../guests/GuestFilter'
import GuestSearch from '../guests/GuestSearch'
import Guests from '../guests/Guests'
import AuthContext from '../../context/authContext/authContext'

const Home = () => {


  const {getUser}=useContext(AuthContext)
  useEffect(()=>{
    getUser()
   // eslint-disable-next-line
  },[])
  return (
    <div className="container">
    
            <div className="d-flex">
                <div className=" filter">
                    <GuestFilter/>
                   <GuestSearch/>
                </div>
                 <GuestForm/>
              <GuestCounter/>
        
        </div>
        

        <Guests/>

      
    </div>
  )
}

export default Home