import {User,Auth,Report}from"../model"
import {sequelize} from"../db/connection"
import *as express from "express"
import *as cors from"cors"
import * as crypto from"crypto"
import { colocaDatos, me,meConfirm ,actualizarPerfilUsuario} from "../controllers/users-controllers"
import {reportarUnaMacota } from"../controllers/cloudinary-controllers"
import {  TodosLosReportes, unReporte,actulizaReporte,eliminateMascot,reporteCerca} from "../controllers/algolia-controllers"
import {sendEmailToUser} from"../lib/sendgrid/sendgrid"
import * as jwt from"jsonwebtoken"
import * as path from "path"
import { index } from "../lib/algolia/algolia"

const rutaRelativa = path.resolve(__dirname, "../../dist/index.html");
const port = process.env.PORT || 3005

const app = express()
app.use(cors())
app.use(express.static("dist"))
app.use(express.json({limit:"50mb"}))




app.post("/auth",async(req,res)=>{
  if(req.body){
    const datos = await colocaDatos(req.body,"auth")
   res.json(datos)
  }else{
    res.json({error:true})
  }
 
})
app.post("/auth/token",async(req,res)=>{
  const {email,password}=req.body
  if(req.body){
    const datos = await colocaDatos(req.body,"auth/token")
   res.json(datos)
  }else{
    res.json({error:true})
  }
 
})
function authMiddelwire(req,res,next){
  const token = req.headers.authorization.split(" ")[1]
  try{
    const data = jwt.verify(token,process.env.SECRET_WORD)
    req._user=data
    next()
  }catch(error){
    res.json({error:true})
  }
  
}

 
app.get("/me",authMiddelwire,async(req,res)=>{
  
 const user=await me(req._user.id) 
 res.json(user)
})


app.get("/user",authMiddelwire,async(req,res)=>{
  console.log(req._user.id);
  
  const user=await meConfirm(req._user.id) 
  res.json(user)
 })
app.get("/all",async(req,res)=>{
  
  const user=await User.findAll()
  res.json(user)
 })


 //report -algolia

 
app.get("/reportes/all",async(req,res)=>{
 const data=await TodosLosReportes()
 res.json(data)
})
app.get("/me/reportes",authMiddelwire,async(req,res)=>{
  console.log(req._user.id,"user");
  
  const data=await unReporte(req._user.id)
  res.json(data)
 })
 

 app.put("/reportes/:id",authMiddelwire,async(req,res)=>{
   
  if(req.body){
    const datos = await actulizaReporte(req.body,req.params.id,req._user.id)
   res.json(datos)
  }else{
    res.json({error:"faltan datos"})
  }
 })
 app.put("/editar-perfil",authMiddelwire,async(req,res)=>{
   
  if(req.body){
    const datos = await actualizarPerfilUsuario(req.body,req._user.id)
   res.json(datos)
  }else{
    res.json({error:"faltan datos"})
  }
 })
 app.get("/reportes-cerca-de",async(req,res)=>{
  const {lat} = req.query
  const {lng} = req.query
console.log(lat,lng);

  const cerca = await reporteCerca(lng,lat)
  res.json(cerca)
 })



 //cloudinary

 app.post("/profile",authMiddelwire,async(req,res)=>{  
   
  if(!req.body){
    res.status(404).json({error:"faltan datos"})
  }else{
    
    const outputData = await reportarUnaMacota(req._user.id,req.body)
    res.json(outputData)
  }
})
app.post("/email",async(req,res)=>{  
   const {emailUser} = req.body  
   const {name} = req.body
   const {bio} = req.body
   const {cellphone} = req.body

   if(!req.body){
    res.status(404).json({error:"faltan datos"})
  }else{
    const outputData = await sendEmailToUser(emailUser,name,bio,cellphone)
    res.json(outputData)
  }
 
  
})
app.delete("/eliminar-report/:id", async(req, res) => {
 if(!req.body){
  res.status(404).json({error:"faltan datos"})
}else{
  const resp= await eliminateMascot(req.params.id)
 res.json(resp)
}
});
app.get("*", (req, res) => {
 
  res.sendFile(rutaRelativa)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})