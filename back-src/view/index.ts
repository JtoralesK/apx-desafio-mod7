import {User,Auth,Report}from"../model"
import {sequelize} from"../db/connection"
import *as express from "express"
import *as cors from"cors"
import * as crypto from"crypto"
import { colocaDatos ,actualizarPerfilUsuario} from "../controllers/auth-controllers"
import {me,meConfirm } from"../controllers/user-controllers"
import {  TodosLosReportes, unReporte,actulizaReporte,eliminateMascot,reporteCerca,reportarUnaMacota} from "../controllers/report-controllers"
import {sendEmailToUser} from"../lib/sendgrid/sendgrid"
import * as path from "path"
import { index } from "../lib/algolia/algolia"
import {authMiddelwire}from"../components/authMiddelwire/authMiddelwire"
const rutaRelativa = path.resolve(__dirname, "../../dist/index.html");
const port = process.env.PORT ;

const app = express();
app.use(cors());
app.use(express.static("dist"));
app.use(express.json({limit:"50mb"}));


app.post("/auth",async(req,res)=>{
  if(req.body){
    const datos = await colocaDatos(req.body,"auth");
   res.json(datos);
  }else{
    res.json({error:true});
  }
 
})
app.post("/auth/token",async(req,res)=>{
  const {email,password}=req.body;
  if(req.body){
    const datos = await colocaDatos(req.body,"auth/token");
   res.json(datos);
  }else{
    res.json({error:true});
  }
 
})


 
app.get("/me",authMiddelwire,async(req,res)=>{
  
 const user=await me(req._user.id) ;
 res.json(user);
})


app.get("/user",authMiddelwire,async(req,res)=>{
  
  const user=await meConfirm(req._user.id) ;
  res.json(user);
 })
app.get("/all",async(req,res)=>{
  
  const user=await User.findAll();
  res.json(user);
 })


 //report -algolia

 
app.get("/reportes/all",async(req,res)=>{
 const data=await TodosLosReportes();
 res.json(data);
})
app.get("/me/reportes",authMiddelwire,async(req,res)=>{
  
  const data=await unReporte(req._user.id);
  res.json(data);
 })
 

 app.put("/reportes/:id",authMiddelwire,async(req,res)=>{
   
  if(req.body){
    const datos = await actulizaReporte(req.body,req.params.id,req._user.id);
   res.json(datos);
  }else{
    res.json({error:"faltan datos"});
  }
 })
 app.put("/editar-perfil",authMiddelwire,async(req,res)=>{
   
  if(req.body){
    const datos = await actualizarPerfilUsuario(req.body,req._user.id);
   res.json(datos);
  }else{
    res.json({error:"faltan datos"});
  }
 })
 app.get("/reportes-cerca-de",async(req,res)=>{
 
  const cerca = await reporteCerca(req.query.lng,req.query.lat);
  res.json(cerca);
 })



 //cloudinary

 app.post("/profile",authMiddelwire,async(req,res)=>{  
   
  if(!req.body){
    res.status(404).json({error:"faltan datos"});
  }else{
    
    const outputData = await reportarUnaMacota(req._user.id,req.body);
    res.json(outputData);
  }
})
app.post("/email",async(req,res)=>{  
   const {emailUser,name,bio,cellphone} = req.body  ;
   if(!req.body){
    res.status(404).json({error:"faltan datos"})
  }else{
    const outputData = await sendEmailToUser(emailUser,name,bio,cellphone);
    res.json(outputData);
  }
 
  
})
app.delete("/eliminar-report/:id", async(req, res) => {
 if(!req.body){
  res.status(404).json({error:"faltan datos"});
}else{
  const resp= await eliminateMascot(req.params.id);
 res.json(resp);
}
});
app.get("*", (req, res) => {
 
  res.sendFile(rutaRelativa);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})