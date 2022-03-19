import {Router} from"@vaadin/router"
import {state} from"../../state"

class Perfil extends HTMLElement{
    connectedCallback(){
        this.render()
        const button0 = document.querySelector(".button0")
     const button = document.querySelector(".button")
     button0.addEventListener("click",()=>{
          Router.go("/editarPerfil")
    })

      button.addEventListener("click",()=>{
          
          state.setCuenta()
      })

      
   }

   render(){
       const style = document.createElement("style")
       const cs = state.getState()
      
       const email=cs.me.email
       const usuario=cs.me.name
      this.innerHTML=`
      <section class="container">
      <div class="container_perfil">
      <h1 class="miPerfil">Mi perfil</h1>
      <p>Usuario:${usuario}</p>
      <p>Email:${email}</p>
      <button class="button0">Editar Perfil</button>
      <button class="button">Cerrar Secion</button>

      </div>
      <section>
     
      `
    style.innerHTML=`
    *{
      box-sizing: border-box;
      margin:0;
    }
    .button{
        margin-top:15px;
    }
    .miPerfil{
        text-align:center;
        color:red;
        font-size:45px;
    }
        .container_perfil{
            width:300px;
            margin: 0 auto;
            display:flex;
            flex-direction: column;
            margin-top:30px;
            font-size:32px;
           
        }

    `  

    this.appendChild(style)
   }
  
}
customElements.define("perfil-el",Perfil)