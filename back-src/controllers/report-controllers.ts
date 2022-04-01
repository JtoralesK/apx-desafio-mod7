import { cloudinary } from "../lib/cloudinary/connection"
import { index } from "../lib/algolia/algolia"
import { User,Report } from "../model";
import {getResult}from"../components/try/getResults"
import {bodyparse} from"../components/objectParseado/parseador"
//entra conexion algolia

export async function TodosLosReportes(){
    const data=await Report.findAll({})
    const [result,error]= await getResult(data)  
    if(error){
      console.log(error);
    }  
    return  [result,error]
}
export async function unReporte(number:number){
    const usersReports = await Report.findAll({where:{
      user_id:number,
    },
    })
    const [result,error]= await getResult(usersReports) 
    if(error){
      console.log(error);
    }     
    return  [result,error]

}

export async function actulizaReporte(data,id:number,idUser:number){
  if(data.url){
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
      if(error){
        console.log(error);
      }  
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
     if(error){
      console.log(error);
    } 
  
    return  [result,error]
  }
 
}

export async function reportesDeUnUsuario(id:number){
 
    const usersReports = await Report.findAll({where:{
      userId:id,
    },
    })
     const [result,error]= await getResult(usersReports)  
     if(error){
      console.log(error);
    } 
  
    return  [result,error]
}
export async function reporteCerca(lng:number,lat:number){
 
  const { hits } = await index.search("", {
    aroundLatLng:[lat,lng].join(","),
    aroundRadius:20000
  }).catch((error)=>{
    console.log(error);
    
    return error
  })
  if(hits){
    return hits
  }
  
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
if(error){
  console.log(error);
} 

return  [result,error]
  }else{
    console.log("no entro");
    
    return {error:false}
  }
  
}
