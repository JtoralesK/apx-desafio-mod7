import { Router } from "@vaadin/router";
import { state } from "../state";





export class Headeer extends HTMLElement{
    connectedCallback(){
     this.render()
     
    const menuVentana = document.querySelector(".menu_ventana")
    const menu:HTMLElement = document.querySelector(".menu")
    const mascotas = document.querySelector(".submenuMascotas");
    const submenu = document.querySelector(".submenu");
    //links 
    const inicio = document.querySelector(".inicio")
    const mascotasReportadas = document.querySelector(".mascotasReportadas")
    const reportarMascotas = document.querySelector(".reportarMascotas")
    const mascotasCercaTuyo = document.querySelector(".MascotasCercaTuyo")

    

    //mostrar ventanas
    menuVentana.addEventListener("click",()=>{
      menu.classList.toggle("mostrar")
    })
    mascotas.addEventListener("click",()=>{
      submenu.classList.toggle("mostrarSubmenu")
    })
     
    //router
    inicio.addEventListener("click",()=>{
      Router.go("/")
      
    })
    const cs = state.getState()


    mascotasReportadas.addEventListener("click",()=>{
      state.confirmaUser(()=>{
        const verificador =cs.dataRegistro.created
        if(verificador==false){
          console.log(1);
          
          state.obtieneMisReportes(()=>{
            Router.go("/mascotas")
          })
         }else{
          Router.go("/login")
         }
      })
      
    
    })
    reportarMascotas.addEventListener("click",()=>{
      state.confirmaUser(()=>{
        const verificador =cs.dataRegistro.created
        console.log(2);
        

        if(verificador==false){
         Router.go("/report")
        }else{
         Router.go("/login")
        }

      })
     
     })
     mascotasCercaTuyo.addEventListener("click",()=>{
      state.confirmaUser(()=>{
        const verificador =cs.dataRegistro.created
        console.log(3);
        
        if(verificador==false){
         Router.go("/cerca")
        }else{
         Router.go("/login")
        }

      })

    
     })
    
   }

   render(){
    // const logoPet = require("url:../../img/logoPet.png");   
    // const img = document.createElement("img");
    
    // img.setAttribute("src", logoPet);
       const style = document.createElement("style")

      this.innerHTML=`
      <header class="nav_bar">
      <p>icono</p>
   <span class="menu_ventana">
     <a class="menu_link" href="#">Menu<i class="fas fa-bars"></i></a>
   </span>         
    </header>
   
      <nav class="as">
   
       <ul class="menu">
           <li class="items"><a class="menu_link inicio">inicio</a></li>
           <li class="items"><a class="menu_link" href="#">nosotros</a></li>
           <li class="container_submenu items">
             <a href="#" class="menu_link submenuMascotas" >Mascotas <i class="fas fa-chevron-down"></i></a>
             <ul class="submenu">
               <li class="menu_item"><a href="" class="menu_link reportarMascotas ">Reportar Mascotar </a></li>
               <li class="menu_item"><a href="" class="menu_link mascotasReportadas">Mascotas Reportadas</a></li>
               <li class="menu_item"><a href="" class="menu_link MascotasCercaTuyo">Mascotas cerca tuyo</a></li>
             </ul>
           
           </li>
          
       </ul>
   
                   
   </nav> 
      `
    style.innerHTML=`
    body {
      margin: 0;
      background-color: rgba(123, 129, 129, 0.329);
    }
   
.nav_bar {
  background-color: #4c7551;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.menu_ventana {
  background-color: transparent;
  border: none;
  color: white;
  text-decoration: none;
}
.menu,
.submenu {
  list-style: none;
  margin: 0;
  padding: 0;
}
.menu {
  background-color: #555;
  width: 100%;
  margin-left: -100%;
  transition:all 0.5s;
  position: absolute;
  z-index: 100;

}
.menu_link {
  padding: 20px;
  color: white;
  display: block;
  font-size: 1.2em;
  text-decoration: none;
}
.menu_link:hover{
    background-color: #444;
}
.submenu .menu_link {
  padding-left: 50px;
  background-color: #333;
}
.submenu .menu_link:hover{
    background-color: #222;
}
.submenu {
  height: 0;
  overflow: hidden;
  transition: 0.5s;
}
.mostrar{
  margin-left:0;
  display:"initial";
}
.mostrarSubmenu{
  overflow:visible;
  transition: 0.5s;

}

@media (min-width:1024px){
    .nav_bar{
        display:none;
    }
    .menu{
        margin-left:0;
        display: flex;
        justify-content: center;
    }
    .menu_link {
      padding:15px;
    }
    .items{
      margin:0 20px;
    }
    .submenu{
        position: absolute;
        top:60px;
        width: 180px;
        overflow: visible;
        z-index: 10;
        opacity: 0;
        visibility: hidden;
    }
    .container_submenu{
        position: relative;
    }
    .container_submenu:hover .submenu{
        opacity: 1;
        visibility: visible;
    }
}
    
    `
   
      
      
        
    this.appendChild(style)
   }
  
}
customElements.define("header-el2",Headeer)