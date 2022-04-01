import { User } from "../model";
export async function me(id:number){
    const userConfimardo=await User.findByPk(id)
    try{
      return userConfimardo
    }catch(error){
      return error
    }
    
  }
  export async function meConfirm(id:number){
    const userConfimardo=await User.findByPk(id)
    try{
      return userConfimardo
    }catch(error){
      return error
    }   
    
  }

  export async function allUsers(){
    const allUsers=await User.findAll(); 
    try{
      return allUsers
    }catch(error){
      return error
    }   
    
  }