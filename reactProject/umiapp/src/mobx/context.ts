
import PublicDte from "./publicDte";

import {useContext,createContext} from 'react'

const store = createContext({
  PublicDte
})

// 自定义HOOKS
export const useStore = ()=>{
  return useContext(store)
}
