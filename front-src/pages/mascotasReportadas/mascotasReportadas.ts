import {Router} from"@vaadin/router"
import {state} from"../../state"
import {Dropzone} from"dropzone"

class MascotasReportadas extends HTMLElement{
    connectedCallback(){
      this.render()
      const elemento:any = document.querySelector("#results-item-template")
      const mascotasReportadas:HTMLElement = document.querySelector(".results")      
      const cs = state.getState()
      const reports = cs.me.reports
      
      if(reports==[]){
        console.log("no hay");
        
      }else{
        reports.map((e)=>{
        
          const tituloel= elemento.content.querySelector(".title_clone")
          const location= elemento.content.querySelector(".location_clone")
          const img = elemento.content.querySelector(".src_clone")
          location.textContent= e.location
          tituloel.textContent= e.petName
          img.src=e.url
          const clone = document.importNode(elemento.content, true)
          mascotasReportadas.appendChild(clone)
            
          })
      }
      
   }

   render(){
       const style = document.createElement("style")

      this.innerHTML=`
      <h1 class="title_principal">Mis Mascotas Reportadas</h1>
     <div class="results">
      <template id="results-item-template" class="servicios_content">
      <div class="servicios_card">
      <img class="src_clone"  alt="">
      <h1 class="title_clone"></h1>
      <h3 class="location_clone"></h3>

      </div>
       </template>
     </div>

     
      `
    style.innerHTML=`
    *{
      box-sizing: border-box;
      margin:0;

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
  margin: 15px 0;
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


    `  

    this.appendChild(style)
   }
  
}
customElements.define("mascotas-el",MascotasReportadas)