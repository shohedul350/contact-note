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

export default (state,{type,payload})=>{
    switch(type){
      case GET_GUEST:
          return{
              ...state,  
              guests:payload
          }
        case GUEST_ERROR:
            return{
                ...state,
                guests:[],
                errors:payload
            }
        case ADD_GUESTS:
            return{
                ...state,
                guests:[...state.guests,payload]
            }

            case REMOVE_GUESTS:
                return{
                    ...state,
                guests:state.guests.filter(guest=>guest._id !==payload)
                }

                case UPDATE_GUESTS:
                    return{
                        ...state,
                        guests:state.guests.map(guest=>guest._id === payload._id ? payload:guest)
                    
                    }

                    case EDIT_GUESTS:
                        return{
                 ...state,
                 editTable:payload
                 
                        }

                        case CLEAR_EDIT:
                            return{
                     ...state,
                     editTable:null
                     
                            }
        case SEARCH_GUEST:
            const reg=new RegExp(`${payload}`,`gi`)
            return {
                ...state,
                search: state.guests.filter(guest=>guest.name.match(reg))

            }
            case REMOVE_GUESTS :
                return{
                    ...state,
                guests:state.guests.filter(guest=>guest.id !==payload)
                }

            case CLEAR_SEARCH:
                return{
                    ...state,
                    search:null
                }
        case TOGGLES_FILTER:
        return{
        ...state,
        filterGuest: !state.filterGuest
        }
        default:
            return state
    }
}