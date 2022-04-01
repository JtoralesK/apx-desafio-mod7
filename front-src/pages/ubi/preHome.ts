import {Router} from"@vaadin/router"
import {state} from"../../state"

class Prehome extends HTMLElement{
    connectedCallback(){
      this.render()
      const cs = state.getState()
      const button = document.querySelector("#button");
      button.addEventListener("click",()=>{
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
        function success(position) {
    
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            cs.me.location.lat=lat
            cs.me.location.lng=lng
            
            state.setState(cs)
        }
        function error(err) {
            console.log(err.code,err.message);
            console.warn("algo salio mal");
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
        setTimeout(() => {
            Router.go("/home")
           }, 1000);
          
      })
   }

   render(){
   
       const style = document.createElement("style")

      this.innerHTML=`
     <section class="section">
    <div class="div">
    <button class="button" id="button">Dar Mi Ubicacion</button>
    </div>
     </section>

      `
    style.innerHTML=`
    .section{
        background-color:#033a0a;
        width:100%;
        height:100vh;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .div{
        width:320px;
        margin:0 auto;
    }
    .button{
        width:100%;
        height:50px;
        margin-top:300px;
        font-size:32px;
        border:none;
        border-radius:3px;
        font-weight:700;
        
    }
    .button:hover{
        background-color:pink;
    }
   
    `
   
      
      
        
    this.appendChild(style)
   }
  
}
customElements.define("pre-el",Prehome)