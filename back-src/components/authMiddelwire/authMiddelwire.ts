import * as jwt from"jsonwebtoken"

export function authMiddelwire(req,res,next){  
    const token = req.headers.authorization.split(" ")[1]
    try{
      const data = jwt.verify(token,process.env.SECRET_WORD)
      req._user=data
      next()
    }catch(error){
      res.json({error:"token incorrecto"})
    }
    
  }