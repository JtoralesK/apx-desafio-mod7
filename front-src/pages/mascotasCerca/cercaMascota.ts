import {Router} from"@vaadin/router"
import {state} from"../../state"
class MascotasCercanas extends HTMLElement{
    connectedCallback(){
      this.render()
      const cs = state.getState()
      
      const reports = cs.me.reportsCercanos
      const ventana:HTMLElement = document.querySelector(".avisar")
      const salir:HTMLElement = document.querySelector(".salir")
      const form:HTMLElement = document.querySelector(".enviarEmailForm")


    reports.map((e)=>{
      
      const  petName ="boton"+e.objectID
      const button = '.'+ petName
      const avisar = document.querySelector(button)
      
      if(avisar){        
        avisar.addEventListener("click",()=>{
          ventana.style.display="initial"
  
        })
      }
     
      
      form.addEventListener("submit",(event)=>{
        event.preventDefault()
        const target:any = event.target  
          const name = target.nombre.value
          const bio = target.donde.value
          const cellphone = target.cellphone.value  
          const userEmail = e.userEmail
          console.log(2);

          state.setEmail(name,bio,cellphone,userEmail,()=>{
            state.emailEnviar(()=>{

              const emailokay = cs.email.emailEnviado
              
              if(emailokay==true){
                ventana.style.display="none"

                const enviadoConExito:HTMLElement = document.querySelector(".avisarEmailEnviado")
                enviadoConExito.style.display="initial"
                setTimeout(() => {
                  Router.go("/home")
                 }, 2000);
              }
            })
          })    
        
      })


    })
    salir.addEventListener("click",()=>{
      ventana.style.display="none"
      
    })
    

      
   }

   render(){
       const style = document.createElement("style")

       const elemento:any = document.querySelector(".results-item-template")
       const sinMascotas:HTMLElement = document.querySelector(".sinMascotas")

       const cs = state.getState()
       const reports = cs.me.reportsCercanos
     
       
     function verificaSiHayMascotas(){
      if(reports[0]){
        return true
      }else{
        return false
      }
     }
     
      this.innerHTML=`
      <h1 class="title_principal"> Mascotas Cercanas</h1>
      <div class="results">
      <div class="results-item-template" class="servicios_content">
      ${
       
        verificaSiHayMascotas()? reports.map((e)=>
        `  <div class="servicios_card">
        <img class="src_clone" src="${e.url}"  alt="">
        <h3 class="location_clone">${e.location}</h3>
        <div class="misma">
        <h1 class="title_clone">${e.petName}</h1>
        <button class="${"boton"+e.objectID} lovi">Lo vi</button>
        </div>
        </div>
        ` 
       ).join(""):`<h2 class="sinMascotas">No hay mascotas cerca tuyo</h2> `}
     
       </div>
     </div>
     
     <section class="avisar">
     <div class=avisar_container>
     <button class="salir">Volver</button>
     <form class="enviarEmailForm">
     <h1>reportar info de</h1>
     <label >
     <h2>Tu nombre</h2>
     <input type="text" class="" name="nombre" required  >
     </label>
     <label >
     <h2>Tu telefono</h2>
     <input type="text" class="" name="cellphone" required  >
     </label>
         <label >
             <h2>¿Donde lo viste?</h2>
             <textarea name="donde" class="bio" ></textarea >
         </label>
         <button class="enviarEmail">Enviar</button>
     </form>
     </div>
     </section>
     <div class="avisarEmailEnviado">
     <h1 class="exito">Email enviado con exito</h1>
     </div>
      `
    style.innerHTML=`
    *{
      box-sizing: border-box;
      margin:0;

  }
  .enviarEmail{
    display:block;
  }
  .lovi{
    background: none;
    border: none;
    background-color:#468246ab;
    border-radius:3px;
  }
  .sinMascotas{
    color:red;
  }
  .exito{
    color:#2ec500;
    background-color:gray;
    text-align:center;
  }
  .misma{
    display:flex;
    justify-content: space-between;  
    padding:0 10px;
  }
  .title_principal{
    margin:20px;
    text-align:center;
  }
  @media (min-width:678px){
   .results{
    display:flex;
    flex-direction: row;
   
   }
  }
.content-h3-title {
  margin: 0px;
  padding-top: 17px;
  font-size: 16px;
}

.servicios_content{
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

 .servicios_card {
background-color: #F5F3EE;
width:340px;
height: 220px;
border-radius: 5px;
box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
overflow: hidden;
margin: 20px;
transition: all 0.25s;
text-align: center;
position: static;
z-index: 1;
display: inline-table;

}
 .servicios_card:hover {
  transform: translateY(8px);
  box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
}

 .src_clone {
  width: 100%;
  height: 140px;
  background-size:contain;

}
.title_clone {
  font-weight: 600;
  font-size:32px;
  margin:  0;
  font-family: 'Baloo Thambi 2', cursive;
  text-align:left;
}
.location_clone{
  font-weight: 400;
  font-size:16px;
  margin: 5px 0 0 10px;
  font-family: 'Baloo Thambi 2', cursive;
  text-align:left;
}
.servicios_card-p {
  padding: 0 1rem;
  font-size: 17px;
  text-align:center;
  font-weight: 300;
  font-family: 'Lato', sans-serif;
  margin: 0;
  color:#989797;

}
.button{
  background-color: #2c4939;
  box-shadow: inset 9px 0px 0px 0px #2E8B57;
  border: none;
  color: #fff;
  display: inline-block;
  font-family: 'Baloo Thambi 2', cursive;
  font-size: 14px;
  transition: all .3s ease-in-out;
  border-radius: 25px;
  margin-top: 10px;
  letter-spacing: 0.1px;
  line-height: 1em;
  padding: 20px 30px;
  text-transform: uppercase;
}

.avisar{
  display:none;
  background-color: rgba(0,0,0,.8);
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  opacity:0;
  pointer-events:none;
  transition: all 1s;
  opacity:1;
  pointer-events:auto;
}
.avisar_container{
  background-color:#0085e2;
  width:300px;
  padding: 10px 20px;
  margin: 20% auto;
  position: relative;
}
.avisarEmailEnviado{
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  pointer-events:none;
  transition: all 1s;
  pointer-events:auto;
  margin-top:70px;
  padding:10px;
  display:none;
}
    `  

    this.appendChild(style)
   }
  
}
customElements.define("mascotascercanas-el",MascotasCercanas)