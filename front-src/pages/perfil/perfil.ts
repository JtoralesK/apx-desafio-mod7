import {Router} from"@vaadin/router"
import {state} from"../../state"

class Perfil extends HTMLElement{
    connectedCallback(){
        this.render()
        const buttonEditar = document.querySelector(".buttonEditar")
        const buttonCambiar = document.querySelector(".buttonPasswordChange")

     buttonEditar.addEventListener("click",()=>{
          Router.go("/editarPerfil")
          
    })
    
    buttonCambiar.addEventListener("click",()=>{
        Router.go("/change")
        
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
      <button class="buttonEditar">Editar Perfil</button>
      <button class="buttonPasswordChange">Cambiar contraseña</button>
      </div>
      <section>
      <div class="div-button">
      <button id="cerrar"class="button">Cerrar Secion</button>
      </div>

      `
    style.innerHTML=`
    *{
      box-sizing: border-box;
      margin:0;
    }
    .button{
        margin-top:25px;
       width:100%;
       color:red;
    }
    .buttonPasswordChange{
        margin-top:20px;
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
        .div-button{
            width:300px;
            margin: 0 auto;
        }
    `  
    const button = document.querySelector("#cerrar")

    button.addEventListener("click",()=>{
        console.log("cerrar secion");

          state.setCuenta()
      })

    this.appendChild(style)
   }
  
}
customElements.define("perfil-el",Perfil)