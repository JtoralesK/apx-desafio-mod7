import {Router} from"@vaadin/router"
import {state} from"../../state"


class CambiarContraseña extends HTMLElement{
    connectedCallback(){
      this.render()
    
       
    const form = document.querySelector("form")
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const cs = state.getState()
        const target:any = e.target
        const passwordViejaConfirmar = target.passwordViejaConfirmar.value
        const passwordNueva = target.passwordNueva.value
        const passwordNuevaConfirmar = target.passwordNuevaConfirmar.value
        state.cambiarContraseña(passwordViejaConfirmar,passwordNueva,passwordNuevaConfirmar,()=>{
            const error = document.querySelector(".error")
            if(cs.password.error){
                if(error.firstChild){
                    error.firstChild.remove()
                }
                
                const h2 = document.createElement("h2")
                h2.textContent=`${cs.password.error}`
                h2.className="red"
                error.appendChild(h2)
            }
            if(cs.password.okay==true){
                if(error.firstChild){
                    error.firstChild.remove()
                }
                const h2 = document.createElement("h2")
                h2.textContent=`La contraseña ha sido cambiada`
                h2.className="green"
                error.appendChild(h2)
                state.setObjetoPassword()
                setTimeout(() => {
                    Router.go("/perfil")
                   }, 1500);
            }
        })        
        
    })
   }

   render(){
       const cs = state.getState()
     
     

       const style = document.createElement("style")

      this.innerHTML=`
     
      <div class="spinner">Cargando..</div>

      <form class="form">
      <div class="form_container">
      <h1 class="title">Cambiar Contraseña</h1>
          <label >
          <h2>Contraseña vieja</h2>
          <input type="password" placeholder="Contraseña" name="passwordViejaConfirmar" required>
          </label>

          <label >
          <h2>Contraseña Nueva</h2>
          <input type="password" placeholder="Contraseña" name="passwordNueva" required>
          </label>
          <label >

          <h2>Confirmar contraseña</h2>
          <input type="password" placeholder="Contraseña" name="passwordNuevaConfirmar" required> 
          </label>     
          <div class="error"></div>
          <button class="cambiar" >CAMBIAR</button>
     
      </div>
   
      

     
      `
    style.innerHTML=`
    *{
      box-sizing: border-box;
      margin:0;

  }
  .title{
      color:red;
  }
 input{
     width:100%;
     height:25px;
 }
 h2{
     text-align:center;
 }
 .red{
     color:red;
 }
 .green{
     color:green;
 }
   .form_container{
    width: 300px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    gap: 20px;
   }
  
  
  .spinner {
    display:none;
  box-shadow: 0 0 0 5px #4c7551, inset 0 0 0 1px#4c7551;
  position: absolute;
  height: 20px;
  width: 240px;
  border-radius: 2px;
  overflow: hidden;
  animation:  6s linear infinite;
  margin:15px 0 0 75px;
}
.spinner:before {
  display: block;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #0cff774d;
  animation: load 6s linear infinite;
}

@keyframes load {
  0% {
    width: 0;
  }
  40%,
  50% {
    width: 100%;
  }
  90%,
  100% {
    width: 0;
  }
}
    `
   

    this.appendChild(style)
   }
  
}
customElements.define("cambiar-contraseña",CambiarContraseña)