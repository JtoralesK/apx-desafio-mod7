type Mode="iniciado" | "registrado"
type Page="/cerca" | "/report" | "/mascotas"
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
        lng:"",
        lat:""
       },
       me:{
        token:"",
        reports:[],
        reportsCercanos:[],
        page:""
       },
       error:{
         usuario:""
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
      },setPage(type:Page,callback){
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
      dataParaCloudinary(name:string,description:string,img:string,location:string,callback){
        let data = this.getState()
        data.report.name = name
        data.report.description =description
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
          if(data.fullname && data.createdAt){
            console.log(data.fullname && data.createdAt);
            cs.dataRegistro.fullname=data.fullname 
            cs.dataRegistro.created=data.createdAt
          }if(data.error){
            console.log(data.error);
            cs.error.usuario="error"

          }
          

          
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
    reportesCerca(callback){
      const cs = this.getState()
    
      
      fetch(API_BASE_URL+`/reportes-cerca-de?lat=${cs.location.lat}&lng=${cs.location.lng}`,{
        headers:{
          "content-type":"application/json",
        }
      }).then((r)=>{return r.json()}).then((e)=>
      {
        cs.me.reportsCercanos=e
        this.setState(cs)  
          callback()  
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