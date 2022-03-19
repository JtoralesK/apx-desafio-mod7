import {Router} from"@vaadin/router"
import {state} from"../../state"
import {Dropzone} from"dropzone"

class MascotasReportadas extends HTMLElement{
  report: string;
  constructor() {
      super();
  }
    connectedCallback(){
      
      this.render()
      const cs = state.getState()
      
      const reports = cs.me.reports
      reports.map((e)=>{
        const  petName =e.petName+e.id+e.user_id
        const button = '.'+ petName
        
        const avisar = document.querySelector(button)
        
        avisar.addEventListener("click",()=>{
          console.log(e.id);
          
          state.setNumberReport(e.id,()=>{
            Router.go("/cambiar")
          })
        })
        
        
  
      })
   
   }

   render(){
     
       const style = document.createElement("style")
  
       const elemento:any = document.querySelector(".results-item-template")
       const sinMascotas:HTMLElement = document.querySelector(".sinMascotas")

       const cs = state.getState()
       const reports = cs.me.reports
      
       
       reports.filter((e)=>{
         
       })
       function verificador(){
        if(reports[0]){
          return true
        }else{
          return false
        }
       }
     
    
      this.innerHTML=`
      <h1 class="title_principal">Mis Mascotas Reportadas</h1>
      <div class="results">
      <div class="results-item-template" class="servicios_content">
      ${  verificador()? reports.map((e)=>
          
          
        
        `  <div class="servicios_card">
        <img class="src_clone" src="${e.url}"  alt="">
        <h3 class="location_clone">${e.location}</h3>
  
        <div class="misma">
        <h1 class="title_clone">${e.petName}</h1>
        <button class="${e.petName+e.id+e.user_id} editar">Editar</button>
        </div>
  
        </div>
        ` 
       ).join(""):`<h2 class="sinMascotas">No reportaste ninguna mascota</h2> ` }
     
       </div>
     </div>
     
    

     
      `
    style.innerHTML=`
    *{
      box-sizing: border-box;
      margin:0;

  }
  .sinMascotas{
    color:red;
  }
  .editar{
    background: none;
    border: none;
    background-color:#468246ab;
    border-radius:3px;
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
    flex-wrap: wrap;
    padding:20px;
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
  font-family: 'Baloo Thambi 2', cursive;
  text-align:left;
}
.location_clone{
  font-weight: 400;
  font-size:16px;
  margin: 5px 0;
  font-family: 'Baloo Thambi 2', cursive;
  text-align:right;
}
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


    `  
  
    this.appendChild(style)
   }
  
}
customElements.define("mascotas-el",MascotasReportadas)