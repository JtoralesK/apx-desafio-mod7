import { where } from "sequelize/types";
import { cloudinary } from "../lib/cloudinary/connection"
import { index } from "../lib/algolia/algolia"
import { User,Auth,Report } from "../model";
import * as crypto from"crypto"
import * as jwt from"jsonwebtoken"
// function getSHA256ofJSON (text:string){
//     return crypto.createHash('sha256').update(text).digest('hex')
//   }
  const secretWord = 'lallalalalal12345ldf3'




export async function TodosLosReportes(){
    const data=await Report.findAll({})
    console.log(data);
    
    return data
}
export async function unReporte(number:number){
  console.log(number);
  
    const usersReports = await Report.findAll({where:{
      user_id:number,
    },
    })

    return usersReports
  

}



function bodyparse(body,id?){
    const respuesta:any={}
    if(id){
      respuesta.objectID=id
    }
    if(body.petName){
      respuesta.petName=body.petName
    }
    if(body.description){
      respuesta.description=body.description
    }
    if(body.lat && body.lng){
      respuesta._geoloc={
        lat:body.lat,
        lng:body.lng
      }
    }
    return respuesta
  }
export async function actulizaReporte(data,id:number){
    const dataActualiza=await Report.update(data,{where:{id}})
      
      const indexItem = bodyparse(data,id)
      index.partialUpdateObject(indexItem).then((object) => {
        console.log(object);
      }).catch((e)=>{
        console.log(e);
        
      })
       
   return dataActualiza
}

export async function reportesDeUnUsuario(id:number){
    // const user= await User.create({
    //   first_name:"javierApx"
    // })
    const usersReports = await Report.findAll({where:{
      userId:id,
    },
    include:[User]
    })
     return usersReports
    
}
