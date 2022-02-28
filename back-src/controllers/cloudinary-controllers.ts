import { cloudinary } from "../lib/cloudinary/connection"
import { index } from "../lib/algolia/algolia"
import { User,Auth,Report } from "../model";
export async function updateProfile(userId:number,data){
    console.log(data);
    
    if(data.url){
       const image = await cloudinary.uploader.upload(data.url,{
            resource_type:"image",
            discard_original_filename:true,
            width:1000
        }
  );
  const updateData = {
    petName:data.petName,
    description:data.description,
    location:data.location,
    lat:data.lat,
    lng:data.lng,
    url:image.secure_url,
    cellphone:data.cellphone,
    user_id:userId
  }

  const report=await Report.create(updateData);
    
    
    
  index.saveObject({
   rubro: report.get("petName"),
   title: report.get("description"),
   objectID: report.get("id"),
   "_geoloc": {
     "lat":report.get("lat"),
     "lng":report.get("lng")
   }
 }).then((object) => {
   console.log(object);
 }).catch((e)=>{
   console.log(e);
   
 })
 return  report
    }
    
}
