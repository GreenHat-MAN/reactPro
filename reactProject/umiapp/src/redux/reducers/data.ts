import { fromJS } from "immutable";
import { typeAny } from "../actions";

const defaultState = fromJS({
    count:1000,
    roleList:[],
    userInfo:null
})


export const data = (state:any = defaultState,action:any)=>{
    const {type,payload} = action;
    switch(type){
        case "changeCount":
            return state.update('count',(x:typeAny)=>x+payload)
      case "changeRole":
            return state.set('roleList',payload)
      case "changeUserInfo":
        return state.set('userInfo',payload)
        default:
            return state;
    }
}
