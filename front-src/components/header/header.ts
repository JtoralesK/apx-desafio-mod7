import { Router } from "@vaadin/router";
import { state } from "../../state";



function revisaToken(token){
if(token=="a"){
return false
}else{
  return true
}
}


export class Header extends HTMLElement{
    connectedCallback(){
     this.render()
     const ham = document.querySelector('.ham');
     const enlaces = document.querySelector('.enlaces-menu');
     const barras = document.querySelectorAll('.ham span');
      const linkBuscador = document.querySelector(".linkBuscador")
      const linkInicio = document.querySelector(".linkInicio")
      
      linkBuscador.addEventListener("click",(e)=>{
        const cs = state.getState()
        console.log(cs.dataRegistro);
        const revision = revisaToken(cs.dataRegistro.token)
  if(revision==false){
       Router.go("/login")
  }else{
    console.log("pasa");
  }     
       //Router.go("/login")
        
      })
      linkInicio.addEventListener("click",()=>{
        console.log(2);
        
        Router.go("/")
        
      })
      

ham.addEventListener('click', () => {
    enlaces.classList.toggle('activado');
    barras.forEach(child => {child.classList.toggle('animado')});
    ham.classList.toggle('girar');
});
   }

   render(){
    const logoPet = require("url:../../img/logoPet.png");   
    const img = document.createElement("img");
    
    img.setAttribute("src", logoPet);
       const style = document.createElement("style")

      this.innerHTML=`

      <header>
      <nav>
          <a href=""><img class="logo" src=${logoPet} alt="logo"></a>

          <ul class="enlaces-menu">
              <li><a class="linkInicio">incio</a></li>
              <li><a class="linkBuscador">Buscador de mascotas</a></li>
              <li><a href="#">nosotros</a></li>
              <li><a href="#">Contacto</a></li>
          </ul>

          <button class="ham" type="button">   
              <span class="br-1"></span>
              <span class="br-2"></span>
              <span class="br-3"></span>
          </button>                       
      </nav>
  </header>
      `
    style.innerHTML=`
    
    body {
      margin: 0;
      padding: 0;
      line-height: 1.6;
      background-size: cover;
     
    }
    
    .logo{
      width: 120px;
      height: 25px;  
    }
   
  
    nav{
        display: flex;
        align-items:center;
        justify-content: space-around;
        min-height:8vh;
        background-color: #2c4939;
        cursor:pointer;
    }
  
    .ham{
      display:none;
      background-color:transparent;
      cursor: pointer;
      border:none;
      margin:0;
      padding:0;
      }
      
      .ham span{
          background-color: #f3f3f3;
          display:block;
          height:3px;
          width: 28px;
          margin:10px auto;
          border-radius:2px;    
      }
    .enlaces-menu{
        display:flex;
        padding:0;
    }
    .enlaces-menu li{
        padding: 0 40px;
        list-style-type: none;
        transition: 0.3s;
    }
  
    .enlaces-menu li a{
        text-decoration:none;
        font-size: 1.8rem;
        color:#f3f3f3;
        font-weight:600;
    }
    .enlaces-menu li:hover{
        background-color: rgba(84, 89, 94, 0.74);
    }
  
  
  /* DISPOSITIVOS MOVILES */
  
    @media (max-width:768px) {
      body{
      }
        .ham{
            display:block;
            cursor:pointer;
            position: absolute; 
            top:15px;
            right:25px;
            transition: 0.2s  0.1s; 
    
        }
     
        
        nav{
            flex-direction:column;
            align-items: flex-start;
            padding-top: 25px;
            padding-bottom: 25px;
        }
  
        .logo{
          padding-left:25px;
          
        }
        .buttonHeader{
          border: none;
           color: #fff;
        }
        .enlaces-menu{
          
            flex-direction:column;
            justify-content: space-around;
            align-items:center;
            height: 92vh;         
            margin:0;
            padding:0; 
            display:none;
            opacity:0;
            transition: opacity 5s ease-out;
            width:100%;
        
           
        }
        .enlaces-menu li{
          text-align:center;
          width:100%;
          padding:20px;    
      }
      
    
  }
  
  /* Animaciones */
    
  @keyframes muestraMenu {
      from {opacity: 0;}
      to {opacity: 1;}
    }
  
    .enlaces-menu.activado{
        display:flex; 
        animation: muestraMenu 350ms ease-in-out both;
    }
  
    .br-1.animado{
      transform: rotate(-45deg) translate(-10px, 8px);
    }
    
    .br-2.animado{
      opacity: 0;
    }
    .br-3.animado{
      transform: rotate(45deg) translate(-10px, -8px);
    }
  
   .ham.girar:hover{
       transform:rotate(360deg);
   }
    `
   
      
      
        
    this.appendChild(style)
   }
  
}
customElements.define("header-el",Header)