import {Router} from"@vaadin/router"
import {state} from"../../state"

class Perfil extends HTMLElement{
    connectedCallback(){
        this.render()
      const button = document.querySelector(".button")
      console.log(button);
      
      button.addEventListener("click",()=>{
          console.log(321);
          
          state.setCuenta()
      })

      
   }

   render(){
       const style = document.createElement("style")
       const cs = state.getState()
      
       const email=cs.dataRegistro.email
       const usuario=cs.dataRegistro.fullname
      this.innerHTML=`
      <section class="container">
      <div class="container_perfil">
      <h1 class="miPerfil">Mi perfil</h1>
      <p>Usuario:${usuario}</p>
      <p>Email:${email}</p>
      <button class="button">Cerrar Secion<button>
      
      </div>
      <section>
     
      `
    style.innerHTML=`
    *{
      box-sizing: border-box;
      margin:0;
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