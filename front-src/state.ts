import { Router } from "@vaadin/router"

type Mode="iniciado" | "registrado"
type Page="/cerca" | "/report" | "/mascotas"| "/perfil"
type Local="token" | "reports" 

const API_BASE_URL= process.env.DB_HOST
console.log(process.env.API_SENDGRID,API_BASE_URL );

const state={
  
    data: {
        dataRegistro:{
            password:"",
            mode:"",
            token:"",
            created:""
        },
        location:{
          lng:"",
          lat:""
        },
       report:{
        petName:"",
        location:"",
        description:"",
        cellphone:"",
        url:"",
        lng:false,
        lat:false
       },
       me:{
         error:false,
        token:"",
        reports:[],
        reportsCercanos:[],
        page:"",
        name:"",
        email:""
       },
       error:{
         usuario:"",
         confirmarUbicacion:"",
         usuarioCreado:""
       },
       email:{
         name:"",
         cellphone:"",
         bio:"",
         emailUser:"",
         emailEnviado:false
       },editar:{
        lng:undefined,
        lat:undefined,
        report:0

       }
      
       
    
      },
      listeners: [],
      getState() {
        return this.data;
      },
    
      setState(newState) {
        this.data = newState;
       
        for (const cb of this.listeners) {
          cb();
        }
       localStorage.setItem("me", JSON.stringify(this.data.me));
      
       console.log(newState);
       
        
      },
    
     init(){
       let data = this.getState()       
      if(!localStorage.me){
        this.setState(data)
      }else{
        const localData = JSON.parse(localStorage.getItem("me"))
        data.me=localData
        this.setState(data) 
      }
     
     },
    
      subscribe(cb: (any) => any) {
        this.listeners.push(cb);
      },setCuenta(){
        let data = this.getState()  
        data.dataRegistro={
          password:"",
          mode:"",
          token:"",
          created:""
      },
     data.report={
      petName:"",
      location:"",
      description:"",
      cellphone:"",
      url:"",
      lng:false,
      lat:false
     },
     data.me={
       error:false,
      token:"",
      reports:[],
      reportsCercanos:[],
      page:"",
      name:"",
      email:""
     },
     data.error={
       usuario:"",
       confirmarUbicacion:"",
       usuarioCreado:""

     },
     data.email={
       name:"",
       cellphone:"",
       bio:"",
       emailUser:"",
       emailEnviado:false
     },data.editar={
      lng:undefined,
      lat:undefined,
      report:0

     }
  
        this.setState(data)

        Router.go("/")
      
      },
      setPage(type:Page,callback){
        let cs = this.getState()
        cs.me.page=type
        this.setState(cs) 
        callback()
      },
      setModeRegistoUser(callback){
        let cs = this.getState()
        cs.dataRegistro.mode = ""
        this.setState(cs) 
        callback()

      },
      setError(){
        let cs = this.getState()
        cs.error.usuario = ""
        this.setState(cs) 
      }, setErrorUbi(){
        let cs = this.getState()
        cs.error.confirmarUbicacion = ""
        this.setState(cs) 
      }, setErrorUserCreado(){
        let cs = this.getState()
        cs.error.usuarioCreado = ""
        this.setState(cs) 
      }, setBoolean(){
        let cs = this.getState()
        cs.me.error = false
        this.setState(cs) 
      },
      setReportLocation(lng:string,lat:string){
        let cs = this.getState()
        cs.report.lng = lng
        cs.report.lat = lat
        this.setState(cs) 
      },
      EditarReportLocation(lng:string,lat:string){
        let cs = this.getState()
        cs.editar.lng = lng
        cs.editar.lat = lat
        this.setState(cs) 
      },setNumberReportEditado(){
        let cs = this.getState()
        cs.editar.report = 0
       
        this.setState(cs) 
      },
      setEmailEnviado(){
        let cs = this.getState()
        cs.email.emailEviado = false
        this.setState(cs) 
      },
      setEmail(name:string,bio:string,cellphone:string,emailUser:string,callback){
        let cs = this.getState()
        cs.email.name = name
        cs.email.cellphone = cellphone
        cs.email.bio = bio
        cs.email.emailUser = emailUser


        this.setState(cs) 
        callback()
      }, setNumberReport(id:number,callback){
        let cs = this.getState()
        cs.editar.report = id
        this.setState(cs) 
        callback()

      },

      dataRegistroMiUser(fullname:string,email:string,password:string){
        let data = this.getState()
        data.me.fullname = fullname
        data.me.email = email
        data.dataRegistro.password = password
        data.dataRegistro.mode = "registrado"
        
        this.setState(data) 
      }, dataInicioSecion(email:string,password:string){
        let data = this.getState()
        data.me.email = email
        data.dataRegistro.password = password
        data.dataRegistro.mode = "iniciado"
        console.log("iniciado");

        this.setState(data) 

      },
      dataParaCloudinary(name:string,img:string,location:string,callback){
        let data = this.getState()
        data.report.name = name
        data.report.img =img
        data.report.location=location


        this.setState(data) 
        callback()
      },

     
     
      meLocalstorage(){
        const cs = this.getState()
        const me = cs.me
              
        localStorage.setItem("me", JSON.stringify(me));
      },




      //conexion postgresql

      pushDataRegisto(callback){
        const cs = this.getState()
        fetch(API_BASE_URL+"/auth",{
          method:"POST",
          headers:{
            'Content-Type': 'application/json'
          },
           body:JSON.stringify({
            fullname:cs.me.fullname,
            email:cs.me.email,
            password:cs.dataRegistro.password

          })

        }).then(response => response.json())
        .then(data => {     
          console.log(data);
          if(data[0]){
            
          }if(data[1]){
            cs.error.usuarioCreado=true
            console.error("ya esta creado el usuario")
          }
          callback()
         
          
        }).catch((error)=>{
          console.error(error)
        });
      },

      obtieneToken(callback){
        const cs = this.getState()
        
        fetch(API_BASE_URL+"/auth/token",{
          method:"POST",
          headers:{
            'Content-Type': 'application/json'
          },
           body:JSON.stringify({
            email:cs.me.email,
            password:cs.dataRegistro.password

          })

        }).then(response => response.json())
        .then(data =>{
         cs.me.token=data.token
         callback()
          this.setState(cs) 
        }).catch((error)=>{
          console.error(error)
        });
          
          
      },
      obtieneMiData(callback){
        const cs = this.getState()
        fetch(API_BASE_URL+"/me",{
          headers:{
            'Authorization':`bearer ${cs.me.token}`
          },

        }).then(response => response.json())
        .then(data => {
          console.log(data);
          
          if(data[0]){
            cs.me.name=data[0].fullname 
            cs.me.email=data[0].email 
            // cs.dataRegistro.created=data.createdAt
          }if(data.error){
            console.log(data.error);
            cs.error.usuario="error"

          }
          

          
          this.setState(cs)  
          callback()       
        }).catch((error)=>{
          console.error(error)
        });
        
      },
      confirmaUser(callback){
        const cs = this.getState()
        
        fetch(API_BASE_URL+"/user",{
          headers:{
            'Authorization':`bearer ${cs.me.token}`
          },

        }).then(response => response.json())
        .then(data => {
          if(data[0]){
            cs.dataRegistro.created=false
            this.setState(cs)  
            callback() 
          }if(data[1]){
            console.log("algo ocurrio");
            
          }
          if(data.error){
            cs.dataRegistro.created=true
            this.setState(cs)  
            callback()
          }
               
        }).catch((error)=>{
          console.error(error)
        });
        
      },
      
      hacerUnReporte(callback){
        const cs = this.getState()
        const petName=  cs.report.name 
        const description= cs.report.description 
        const lng = cs.report.lng
        const lat = cs.report.lat
        
        const cellphone = 1124670573
        const url = cs.report.img 
        fetch(API_BASE_URL+"/reportes",{
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
            'Authorization':`bearer ${cs.me.token}`
          }, 
             body:JSON.stringify({
              petName,description,lng,lat,cellphone,url
            

          })

        }).then(response => response.json())
        .then(data => {
          
          callback()       
        }).catch((error)=>{
          console.error(error)
        });
        
      }, obtieneMisReportes(callback){        
        const cs = this.getState()
        
        fetch(API_BASE_URL+"/me/reportes",{
          headers:{
            'Authorization':`bearer ${cs.me.token}`,

          },

        }).then(response => response.json())
        .then(data => {
          console.log(data);
          if(data[0]){
            console.log("todo bien ");

            cs.me.reports=data[0]

          }if(data[1]){
            console.log("ocurrio algo");
            
          }

           this.setState(cs)  
          callback()       
        }).catch((error)=>{
          console.error(error)
        });
      },

      //cloudinary

    makeToReport(callback){
      const cs = this.getState()
      const petName=  cs.report.name 
      const location = cs.report.location 
      const lng = cs.report.lng
      const lat = cs.report.lat
      const url = cs.report.img 
 
      fetch(API_BASE_URL+"/profile",{
        headers:{
          "content-type":"application/json",
          'Authorization':`bearer ${cs.me.token}`
        },
        method:"POST",
        body:JSON.stringify({
          petName,location,lng,lat,url
        })
      }).then((r)=>{return r.json()}).then((e)=>
      {
        console.log(e);
        
        if(e[1]){
          cs.error.confirmarUbicacion=e.error
      
        }
        if(e[0]){
          cs.me.error=true

          this.obtieneMisReportes(()=>{
            Router.go("/mascotas")
          })
        }
        this.setState(cs)  
        callback()

      }).catch((error)=>{
        console.error(error)
      });

    },
    reportesCerca(callback){
      const cs = this.getState()
    console.log(cs.location.lat,cs.location.lng);
    
      
      fetch(API_BASE_URL+`/reportes-cerca-de?lat=${cs.location.lat}&lng=${cs.location.lng}`,{
        headers:{
          "content-type":"application/json",
        }
      }).then((r)=>{return r.json()}).then((e)=>
      {
        console.log(e);
        
        if(e[0]){
          cs.me.reportsCercanos=e[0]
          this.setState(cs)  
            callback() 
        }if(e[1]){
          console.error("algo salio mal");
          
        }
       
      }).catch((error)=>{
        console.error(error)
      })
    }, emailEnviar(callback){
      const cs = this.getState()
      const emailUser=  cs.email.emailUser 
      const name= cs.email.name 
      const bio = cs.email.bio
      const cellphone = cs.email.cellphone
      
   
      fetch(API_BASE_URL+"/email",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        }, 
           body:JSON.stringify({
           emailUser,bio,cellphone,name
        })

      }).then(response => response.json())
      .then(data => {
        console.log(data);
       
       cs.email.emailEnviado=true
         this.setState(cs)  
         callback()
      }).catch((error)=>{
        console.error(error)
      });
      
      
    },editarReport(petName,location,img,){
      const cs = this.getState()
      const lat = cs.editar.lat
      const lng = cs.editar.lng
     const e = {petName,location,url:img,lat,lng }
     fetch(API_BASE_URL+"/reportes/"+cs.editar.report,{
      method:"PUT",
      headers:{
        'Authorization':`bearer ${cs.me.token}`,
        'Content-Type': 'application/json',
      }, 
         body:JSON.stringify(e)

    }).then(response => response.json())
    .then(data => {
     this.obtieneMisReportes(()=>{
       Router.go("/mascotas")
     })
       
    }).catch((error)=>{
      console.error(error)
    });
    
      
    },editarPerfilDelUsuario(a,b){
      const cs = this.getState()
      const name = a
      const email = b
      console.log(name,email,cs.me.token);
      
     fetch(API_BASE_URL+"/editar-perfil",{
      
      headers:{
        'Authorization':`bearer ${cs.me.token}`,
        'Content-Type': "application/json"

      }, method:"PUT",
         body:JSON.stringify({name,email})

    }).then(response => response.json())
    .then(data => {
     console.log(data);
      state.obtieneMiData(()=>{
         Router.go("/perfil")

      })
     
       
    }).catch((error)=>{
      console.error(error)
    });
    
      
    },elminarReport(){
      const cs = this.getState()
     
     fetch(API_BASE_URL+"/eliminar-report/"+cs.editar.report,{
      method:"DELETE",

    }).then(response => response.json())
    .then(data => {
     this.obtieneMisReportes(()=>{
       Router.go("/mascotas")
     })
       
    }).catch((error)=>{
      console.error(error)
    });
    
      
    },
    //user location

    
}

export {state}