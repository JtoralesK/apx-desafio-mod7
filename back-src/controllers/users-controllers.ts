import { where } from "sequelize/types";
import { cloudinary } from "../lib/cloudinary/connection"
import { User,Auth,Report } from "../model";
import * as crypto from"crypto"
import * as jwt from"jsonwebtoken"
import {getResult}from"../components/getResults"

function getSHA256ofJSON (text:string){
    return crypto.createHash('sha256').update(text).digest('hex')
  }
  const secretWord = 'lallalalalal12345ldf3'

export  function colocaDatos(data,tipo:string){
    if(tipo=="auth"){
        return auth(data.email,data.password,data.fullname)
    }
    if(tipo=="auth/token"){
        return authToken(data.email,data.password)
    }
 
 
}

async function auth(email:string,password:string,fullname:string){
if(email && password && fullname ){
    const datosCompletos = {
        email,
        fullname,
        
    }
    const [user, created] = await User.findOrCreate({
    where: { email },
    defaults:datosCompletos
    
  });
  if(created==true){
    const [auth, authCreated] = await Auth.findOrCreate({
      where: {  user_id:user.get("id")},
      defaults: {
        password:getSHA256ofJSON(password),
        email,
        user_id:user.get("id")
      }
      
    });
    
    const [result,error]= await getResult(user)   
    console.error(error)
 
    return  [result,error]
    
  }else{
    return  [null,{error:"ya estaba creado"}]
    
  }
 
 
}else{
    return {error:"faltan datos"}
    
}
}

async function authToken(email:string,password:string){
    const auth = await Auth.findOne({
        where: {
          email,
          password:getSHA256ofJSON(password)
        },
       
        
      });
    
      if(auth){
        var token = jwt.sign({ id:auth.get("user_id") }, process.env.SECRET_WORD)
    
       return {token}
      }else{
       return {user:"incorrect dates"}
     
      }
    
}
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
export async function actualizarPerfilUsuario(body,id:number){
  const respuesta:any={}

  if(body.email){
    respuesta.email=body.email

  }
  if(body.name){
    respuesta.fullname=body.name
  }
  const perfilActualizado=await User.update(respuesta,{where:{id}})

  if(body.email){
    console.log(1,body);
    const perfilActualizadoAuth=await Auth.update({email:body.email},{where:{ id}})    
        
  const [result,error]= await getResult(perfilActualizadoAuth) 
  console.error(error)
   
  return  [result,error]
  }else{
    console.log("else");
    
    const [result,error]= await getResult(perfilActualizado)    
  return  [result,error]
  }
 
  
 
  
}


