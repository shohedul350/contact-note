import React ,{useReducer}from 'react'
import axios from 'axios'
import GuestContext from './guestContext'
import guestReducer from './guestReducer'
import {
    TOGGLES_FILTER,
    SEARCH_GUEST,
    CLEAR_SEARCH,
    ADD_GUESTS,
    REMOVE_GUESTS,
    UPDATE_GUESTS,
    EDIT_GUESTS,
    CLEAR_EDIT,
    GET_GUEST,
    GUEST_ERROR
} from '../type'

 const GuestState = (props) => {

    const initialState={
        filterGuest:false,
        search:null,
        editTable:null,
        guests:[],
        errors:null
    }

    const [state,dispatch]=useReducer(guestReducer,initialState)
//get guest

const getGuest=async()=>{
    try {
        const res=await axios.get('http://localhost:5000/guest')
        
        dispatch({
          type:GET_GUEST,
          payload:res.data
         
        })
    } catch (error) {
        dispatch({
            type:GUEST_ERROR,
            payload:error.response.msg
        })
    }
}
//add guest
const addGuest=async (guest)=>{
   console.log(guest)
    const config={
        header:{
            'Content-Type':'application/json'
        }
    }
    try {
       const res=await axios.post('http://localhost:5000/guest',guest,config)
    //    console.log(res);
    //    console.log(res.data)
        dispatch({
            type:ADD_GUESTS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:GUEST_ERROR,
            payload:error.response.msg
        })
    }
   
}

//remove guest
const removeGuest=async(id)=>{
    try {
        await axios.delete(`http://localhost:5000/guest/delete/${id}`)
        dispatch({
            type:REMOVE_GUESTS,
            payload:id
        })   
    } catch (error) {
        dispatch({
            type:GUEST_ERROR,
            payload:error.response.msg
        })
    }
  

}
 //update guest
const updateGuest=async(guest)=>{
    console.log(guest)
    const config={
        header:{
            'Content-Type':'application/json'
        }
    }
    const res=await axios.put(`http://localhost:5000/guest/update/${guest._id}`,guest,config)
   
    try {
         
        dispatch({
            type:UPDATE_GUESTS,
            payload:res.data
        }) 
    } catch (error) {
        dispatch({
            type:GUEST_ERROR,
            payload:error.response.msg
        })
    }
   
}


//edit guest
const editGuest=(guest)=>{
    dispatch({
        type:EDIT_GUESTS,
        payload:guest
    })  
}

//clear guest
const clearEdit=()=>{
    dispatch({
        type:CLEAR_EDIT,
        
    }) 
}

    const toggleFilter=()=>{
        dispatch({
            type:TOGGLES_FILTER
        })
    }

    const searchGuest=(guest)=>{
        dispatch({
            type:SEARCH_GUEST,
            payload:guest
        })
    }

    const clearSearch=()=>{
        dispatch({
            type:CLEAR_SEARCH,
     
        })
    }
    return (
      <GuestContext.Provider
      value={{
        getGuest,
        guests:state.guests,
          filterGuest:state.filterGuest,
          toggleFilter,
          searchGuest,
          search:state.search,
          clearSearch,
          addGuest,
          removeGuest,
          updateGuest,
          editGuest,
          clearEdit,
          editTable:state.editTable
      }}
      
      >{props.children}</GuestContext.Provider>
    )
}
  export default GuestState; 