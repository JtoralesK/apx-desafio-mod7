import { cloudinary } from "../lib/cloudinary/connection"
import { index } from "../lib/algolia/algolia"
import { User,Auth,Report } from "../model";
import {getResult}from"../components/getResults"

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
  const user = await User.findByPk(updateData.user_id)
  const report=await Report.create(updateData);

    
    
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
