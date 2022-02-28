type Mode="iniciado" | "registrado"
type Page="mascotasReportadas" | "reportarMascotas" | "mascotasCercaTuyo"
type Local="token" | "reports" 

const API_BASE_URL= process.env.DB_HOST

const state={
  
    data: {
        dataRegistro:{
            fullname:"",
            email:"",
            password:"",
            mode:"",
            token:"",
            created:false
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
        lng:"",
        lat:""
       },
       me:{
        token:"",
        reports:[],
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
      },
      setModeRegistoUser(callback){
        let cs = this.getState()
        cs.dataRegistro.mode = ""
        this.setState(cs) 
        callback()

      },
      setReportLocation(lng:string,lat:string){
        let cs = this.getState()
        cs.report.lng = lng
        cs.report.lat = lat
        this.setState(cs) 
      },

      dataRegistroMiUser(fullname:string,email:string,password:string){
        let data = this.getState()
        data.dataRegistro.fullname = fullname
        data.dataRegistro.email = email
        data.dataRegistro.password = password
        data.dataRegistro.mode = "registrado"
        console.log("registrado");
        
        this.setState(data) 
      }, dataInicioSecion(email:string,password:string){
        let data = this.getState()
        data.dataRegistro.email = email
        data.dataRegistro.password = password
        data.dataRegistro.mode = "iniciado"
        console.log("iniciado");

        this.setState(data) 

      },
      dataParaCloudinary(name:string,description:string,img:string,callback){
        let data = this.getState()
        data.report.name = name
        data.report.description =description
        data.report.img =img
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
            fullname:cs.dataRegistro.fullname,
            email:cs.dataRegistro.email,
            password:cs.dataRegistro.password

          })

        }).then(response => response.json())
        .then(data => {        
          callback()
          
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
            email:cs.dataRegistro.email,
            password:cs.dataRegistro.password

          })

        }).then(response => response.json())
        .then(data =>{
         cs.me.token=data.token
         callback()
          this.setState(cs) 
        })
          
          
      },
      obtieneMiData(callback){
        const cs = this.getState()
        fetch(API_BASE_URL+"/me",{
          headers:{
            'Authorization':`bearer ${cs.me.token}`
          },

        }).then(response => response.json())
        .then(data => {
          cs.dataRegistro.fullname=data.fullname 
          cs.dataRegistro.created=data.createdAt

          
          this.setState(cs)  
          callback()       
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
          
          cs.dataRegistro.created=data.error
          this.setState(cs)  
          callback()       
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
          
         console.log(data);
         
          // this.setState(cs)  
          callback()       
        });
        
      }, obtieneMisReportes(callback){        
        const cs = this.getState()
        
        fetch(API_BASE_URL+"/me/reportes",{
          headers:{
            'Authorization':`bearer ${cs.me.token}`
          },

        }).then(response => response.json())
        .then(data => {
           cs.me.reports=data
           this.setState(cs)  
          callback()       
        });
      },

      //cloudinary

    makeToReport(){
      const cs = this.getState()
      const petName=  cs.report.name 
      const location = cs.report.location 
      const description= cs.report.description 
      const lng = cs.location.lng
      const lat = cs.location.lat
      const cellphone = 1124670573
      const url = cs.report.img 
    
      
      fetch(API_BASE_URL+"/profile",{
        headers:{
          "content-type":"application/json",
          'Authorization':`bearer ${cs.me.token}`
        },
        method:"POST",
        body:JSON.stringify({
          petName,description,location,lng,lat,cellphone,url
        })
      }).then((r)=>{return r.json()}).then((e)=>
      {
        console.log(e);
      })
    },
    //user location

    getCurrentUbication() {
      const cs = this.getState()
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        cs.location.lat=lat
        cs.location.lng=lng
        this.setState(cs)

        
      });
    }
}

export {state}