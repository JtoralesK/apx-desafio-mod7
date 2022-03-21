import {Router} from"@vaadin/router"
import {state} from"../../state"

class PerfilEditable extends HTMLElement{
    connectedCallback(){
        this.render()
      const form = document.querySelector(".form")
      
      form.addEventListener("submit",(e)=>{
          e.preventDefault()
          const target:any = e.target
          state.editarPerfilDelUsuario(target.name.value,target.email.value)
      })

      
   }

   render(){
       const style = document.createElement("style")
       const cs = state.getState()
      console.log(cs.me);
      
       const email=cs.me.email
       const usuario=cs.me.name
      this.innerHTML=`
      <section class="container">
      <div class="container_perfil">
      <h1 class="miPerfil">Editar perfil</h1>
      <form class="form">
      <input type="text" class="input " name="name"   placeholder="${usuario}">
      <input type="text" class="input " name="email"   placeholder="${email}">
      <button class="button">Editar Perfil</button>
      </div>
      </form>
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
customElements.define("editar-perfil-el",PerfilEditable)