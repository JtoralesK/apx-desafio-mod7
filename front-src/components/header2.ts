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
    const perfil = document.querySelector(".perfil")


    

    //mostrar ventanas
    menuVentana.addEventListener("click",()=>{
      
      if (menu.classList.contains("mostrar")) {
        menu.classList.remove("mostrar")

      } else {
        menu.classList.toggle("mostrar")
      }
    })
    mascotas.addEventListener("click",()=>{
      submenu.classList.toggle("mostrarSubmenu")
    })
     
    //router
    inicio.addEventListener("click",()=>{
      if (menu.classList.contains("mostrar")) {
        menu.classList.remove("mostrar")

      } else {
        menu.classList.toggle("mostrar")
      }
      state.setNumberReportEditado()
      Router.go("/home")
      
    })
    const cs = state.getState()


    mascotasReportadas.addEventListener("click",()=>{
      state.setNumberReportEditado()

      if (menu.classList.contains("mostrar")) {
        menu.classList.remove("mostrar")

      } else {
        menu.classList.toggle("mostrar")
      }
      state.confirmaUser(()=>{
        const verificador =cs.dataRegistro.created
        if(verificador==false){
          
          state.obtieneMisReportes(()=>{
            Router.go("/mascotas")
          })
         }else{
          state.setPage("/mascotas",()=>{
            Router.go("/login")
          })
         }
      })
      
    
    })
    reportarMascotas.addEventListener("click",()=>{
      state.setNumberReportEditado()

      if (menu.classList.contains("mostrar")) {
        menu.classList.remove("mostrar")

      } else {
        menu.classList.toggle("mostrar")
      }
      state.confirmaUser(()=>{
        const verificador =cs.dataRegistro.created
        

        if(verificador==false){
         Router.go("/report")
        }else{
          state.setPage("/report",()=>{
            Router.go("/login")
          })
        }

      })
     
     })
     mascotasCercaTuyo.addEventListener("click",()=>{
      state.setNumberReportEditado()

      if (menu.classList.contains("mostrar")) {
        menu.classList.remove("mostrar")

      } else {
        menu.classList.toggle("mostrar")
      }
      state.confirmaUser(()=>{
        const verificador =cs.dataRegistro.created
          if(verificador==false){
  
            state.reportesCerca(()=>{
              
              Router.go("/cerca")
  
             })
  
          }else{
            state.setPage("/cerca",()=>{
              Router.go("/login")
            })
          }
        

       

      })
     })
     perfil.addEventListener("click",()=>{
      state.setNumberReportEditado()

      if (menu.classList.contains("mostrar")) {
        menu.classList.remove("mostrar")

      } else {
        menu.classList.toggle("mostrar")
      }
      state.confirmaUser(()=>{
        const verificador =cs.dataRegistro.created
        console.log(4);
        
        if(verificador==false){
          state.obtieneMiData(()=>{
            Router.go("/perfil")
          })

        }else{
          state.setPage("/perfil",()=>{
            Router.go("/login")
          })
        }

      })
    })
   }

   render(){
  
       const style = document.createElement("style")

      this.innerHTML=`
      <header class="nav_bar">
      <p>YourPet</p>
   <span class="menu_ventana">
     <a class="menu_link" href="#">Menu<i class="fas fa-bars"></i></a>
   </span>         
    </header>
   
      <nav class="as">
   
       <ul class="menu">
           <li class="items"><a class="menu_link inicio">inicio</a></li>
           <li class="items"><a class="menu_link perfil" href="#">perfil</a></li>
           <li class="container_submenu items">
             <a href="#" class="menu_link submenuMascotas" >Mascotas <i class="fas fa-chevron-down"></i></a>
             <ul class="submenu">
               <li class="menu_item"><a href="" class="menu_link reportarMascotas ">Reportar Mascota </a></li>
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
  z-index: 100;
  position: fixed

}
@media (min-width:678px){
 
.menu {
  position: inherit;

}
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
.sacar{
  margin-left: -100%
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