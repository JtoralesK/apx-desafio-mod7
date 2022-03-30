import { User,Auth,Report } from "../model";
import {getResult}from"../components/try/getResults"

export async function me(id:number){
    const userConfimardo=await User.findByPk(id)
      
    const [result,error]= await getResult(userConfimardo)  
    console.error(error)
    
    return  [result,error]
  }
  export async function meConfirm(id:number){
    const userConfimardo=await User.findByPk(id)
        
    const [result,error]= await getResult(userConfimardo)   
    console.error(error)
   
    return  [result,error]
    
  }