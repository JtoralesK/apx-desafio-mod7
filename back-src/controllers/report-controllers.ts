import { where } from "sequelize/types";
import { cloudinary } from "../lib/cloudinary/connection"
import { index } from "../lib/algolia/algolia"
import { User,Report } from "../model";
import {getResult}from"../components/try/getResults"
//entra conexion algolia

export async function TodosLosReportes(){
    const data=await Report.findAll({})
    const [result,error]= await getResult(data)    
    return  [result,error]
}
export async function unReporte(number:number){
    const usersReports = await Report.findAll({where:{
      user_id:number,
    },
    })
    const [result,error]= await getResult(usersReports)    
    return  [result,error]

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


   const dataActualiza=await Report.update(dataMasImage,{where:{id}}).catch((err)=>{
    console.error(err)
  })

   const user=await User.findByPk(idUser).catch((err)=>{
    console.error(err)
  })
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
      const [result,error]= await getResult(dataActualiza)   
      console.error(error);
 
      return  [result,error]
  }else{
    
  const dataActualiza=await Report.update(data,{where:{id}})
  
  const user=await User.findByPk(idUser).catch((err)=>{
    console.error(err)
  })
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
     const [result,error]= await getResult(dataActualiza)  
     console.error(error);
  
    return  [result,error]
  }
 
}

export async function reportesDeUnUsuario(id:number){
 
    const usersReports = await Report.findAll({where:{
      userId:id,
    },
    })
     const [result,error]= await getResult(usersReports)  
     console.error(error);
  
    return  [result,error]
}
export async function reporteCerca(lng:number,lat:number){
 
  const { hits } = await index.search("", {
    aroundLatLng:[lat,lng].join(","),
    aroundRadius:20000
  })
  const [result,error]= await getResult(hits)  
  console.error(error);
  
  return  [result,error]
  
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

//cloudinary

export async function reportarUnaMacota(userId:number,data){
    
  if(data.url && data.lat!=false && data.lng!=false ){
    console.log("entro");
    
     const image = await cloudinary.uploader.upload(data.url,{
          resource_type:"image",
          discard_original_filename:true,
          width:1000
      }
);
const updateData = {
  petName:data.petName,
  location:data.location,
  lat:data.lat,
  lng:data.lng,
  url:image.secure_url,
  cellphone:data.cellphone,
  user_id:userId
}
const user = await User.findByPk(updateData.user_id).catch((err)=>{
  console.error(err)
})
const report=await Report.create(updateData).catch((err)=>{
  console.error(err)
})

  
  
index.saveObject({
 petName: report.get("petName"),
 url: report.get("url"),
 location:report.get("location"),
 cellphone: report.get("cellphone"),
 objectID: report.get("id"),
 userEmail:user.get("email"),
 "_geoloc": {
   "lat":report.get("lat"),
   "lng":report.get("lng")
 }
}).then((object) => {
 console.log(object);
}).catch((e)=>{
 console.log(e);
 
})
const [result,error]= await getResult(report)   
console.error(error)

return  [result,error]
  }else{
    console.log("no entro");
    
    return {error:false}
  }
  
}