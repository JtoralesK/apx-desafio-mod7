export function bodyparse(body,id?){
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