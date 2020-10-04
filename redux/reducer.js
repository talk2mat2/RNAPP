import * as actiontypes from './action.types'
const initial_state={loading:false,user:{},error:{}}

export const userReducer=(state=initial_state,action)=>{
switch (action.type){
    case actiontypes.loginUser_Start:
       return {...state,loading:action.loading};  
    case actiontypes.loginUser_Success:
        return {...state,loading:action.loading,user:action.payload};
    case actiontypes.loginUser_failure:
        return {...state,loading:action.loading,error:action.payload};
    
        default:
            return state
}



}