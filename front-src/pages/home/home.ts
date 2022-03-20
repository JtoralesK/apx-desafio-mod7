import {Router} from"@vaadin/router"
import {state} from"../../state"

class Home extends HTMLElement{
    connectedCallback(){
      this.render()
      const huella:HTMLElement = document.querySelector(".huella")
      const page_home:HTMLElement = document.querySelector(".page_home")
      const body:HTMLElement = document.querySelector(".body")
      const reportarMascotas = document.querySelector(".button")
      const cs = state.getState()
      reportarMascotas.addEventListener("click",()=>{
        console.log(12452);
        
        state.confirmaUser(()=>{
          const verificador =cs.dataRegistro.created
          
          if(verificador==false){
           Router.go("/cerca")
          }else{
            state.setPage("/cerca",()=>{
              Router.go("/login")
            })
          }
  
        })
       
       })
   }

   render(){
   
       const style = document.createElement("style")

      this.innerHTML=`
     
     <section class="section_principal">
    <div class="section_whoAre">
    <h1 class="title">¿Quienés somos?<h1>
    <p class="parrafo_principal">Somos rescatistas que queremos facilitar la búsqueda de una mascota perdida o la de los humanos de la mascota encontrada. 
    Si nada de eso funciona podrás ponerla en adopción o llenarte de amor con una de ellas.</p>
    </div>

    <div class="servicios_content">
    <div class="servicios_content_cards">
        <div class="servicios_card">
        <img class="servicios_card-img" src="https://www.ecestaticos.com/imagestatic/clipping/797/767/79776773aab795837282c7d4947abaf7/por-que-nos-parece-que-los-perros-sonrien-una-historia-de-30-000-anos.jpg?mtime=1622645511" alt="">
        <div class="info">
        <h4 class="servicios_card-title">Ayudando a encontrarlos</h4>
        <p class="servicios_card-p">Mascotas perdidas.Publica aquí tu mascota perdida o busca entre las que se han reportado como perdidas.</p>
        </div>
        <button class="button">ver mascotas perdidas</button>
        </div>
        
    </div>
</div>
     </section>
     </div>

      `
    style.innerHTML=`
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Baloo+Thambi+2:wght@700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Lato&display=swap');
   .body{
     background-color:#2E8B57;
     width: 100vw;
     height:100vh;
    
   }
  
   .title{

   }
   .section_principal{
     width:100%;
     background-color:white;
     height:1200px;

   }
   @media (min-width:678px){
    .section_principal{
     display:flex;
     flex-direction: row;
     align-items: revert;
     padding: 100px;
     height:100vh;

    }
    
   .title{
     font-size:52px;
     margin:0;
     font-family: 'Baloo Thambi 2', cursive;

  }
  .parrafo_principal{
    font-family: 'Baloo Thambi 2', cursive;

  }
  }
   .section_perro{
    height:150px;
    width:100%;
   }
   .section_whoAre{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  text-align:center;
  padding:0 50px 50px;
   }
   @media (min-width:678px){
    .section_whoAre{ 
      text-align:justify;
      padding:0 50px 50px;
       }
  }
   .servicios_content{
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  
  .servicios_content_cards{
    height: 430px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
  }
   .servicios_card {
  background-color: #F5F3EE;
  width:340px;
  height: 550px;
  border-radius: 15px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin: 20px;
  transition: all 0.25s;
  text-align: center;
  position: static;
  z-index: 1;
  }
   .servicios_card:hover {
    transform: translateY(15px);
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
  }
  .info{
    width:90%;
    margin:15px auto;
    
  }
   .servicios_card-img {
    width: 100%;
    height: 250px;
  }
  .servicios_card-title {
    font-weight: 600;
    font-size:24px;
    margin: 15px 0;
    font-family: 'Baloo Thambi 2', cursive;
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
  .button:hover{
    background-color: #2c4900;

  }
  




   
    `
   
      
      
        
    this.appendChild(style)
   }
  
}
customElements.define("home-el",Home)