import { where } from "sequelize/types";
import { cloudinary } from "../lib/cloudinary/connection"
import { index } from "../lib/algolia/algolia"
import { User,Auth,Report } from "../model";
import * as crypto from"crypto"
import * as jwt from"jsonwebtoken"


export async function TodosLosReportes(){
    const data=await Report.findAll({})
    console.log(data);
    
    return data
}
export async function unReporte(number:number){
  
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
    if(body.url){
      respuesta.url=body.url
    }
    if(body.userEmail){
      respuesta.userEmail=body.userEmail
    }
    if(body.location){
      respuesta.location=body.location
    }
    if(body.lat && body.lng){
      respuesta._geoloc={
        lat:body.lat,
        lng:body.lng
      }
    }
    return respuesta
  }
export async function actulizaReporte(data,id:number,idUser:number){
  if(data.url){
    console.log("if");

  const image = await cloudinary.uploader.upload(data.url,{
    resource_type:"image",
    discard_original_filename:true,
    width:1000
})

const dataMasImage = {
   petName :data.petName,
   location:data.location,
   lat:data.lat,
   lng:data.lng,
   url:image.secure_url
}


   const dataActualiza=await Report.update(dataMasImage,{where:{id}})

   const user=await User.findByPk(idUser)
   const dataMasEmail = {
    petName :data.petName,
    location:data.location,
    lat:data.lat,
    lng:data.lng,
    url:image.secure_url,
    userEmail:user.get("email"),

 }
 
      const indexItem = bodyparse(dataMasEmail,id)
      
      index.partialUpdateObject(indexItem).then((object) => {
        console.log("okay");
      }).catch((e)=>{
        console.log("salio mal");
        
      })
return dataActualiza
  }else{
    console.log("else");
    
  const dataActualiza=await Report.update(data,{where:{id}})

  const user=await User.findByPk(idUser)
  const dataMasEmail = {
   petName :data.petName,
   location:data.location,
   lat:data.lat,
   lng:data.lng,
   userEmail:user.get("email"),

}
     const indexItem = bodyparse(dataMasEmail,id)
     
     index.partialUpdateObject(indexItem).then((object) => {
       console.log("okay");
     }).catch((e)=>{
       console.log("salio mal");
       
     })
     return dataActualiza
  }
 
}

export async function reportesDeUnUsuario(id:number){
    // const user= await User.create({
    //   first_name:"javierApx"
    // })
    const usersReports = await Report.findAll({where:{
      userId:id,
    },
    // include:[User]
    })
     return usersReports
    
}
export async function reporteCerca(lng:number,lat:number){
 
  const { hits } = await index.search("", {
    aroundLatLng:[lat,lng].join(","),
    aroundRadius:10000
  })

 return hits
  
}
export async function eliminateMascot( idReport:number) {
  const objectID = `${idReport}`

  try {

      const mascotFound = await Report.findByPk(idReport);
      await mascotFound.destroy();
      await index.deleteObject(objectID);
  
      return true;

  } catch (e) {
      console.error(e,"algo salio mal");
  }
}
