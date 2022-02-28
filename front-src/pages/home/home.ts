import {Router} from"@vaadin/router"
import {state} from"../../state"

class Home extends HTMLElement{
    connectedCallback(){
      this.render()
      const huella:HTMLElement = document.querySelector(".huella")
      const page_home:HTMLElement = document.querySelector(".page_home")
      const body:HTMLElement = document.querySelector(".body")


   }

   render(){
   
       const style = document.createElement("style")

      this.innerHTML=`
     
     <section class="section_principal">
    <div class="section_whoAre">
    <h1>¿Quienés somos?<h1>
    <p>Somos rescatistas que queremos facilitar la búsqueda de una mascota perdida o la de los humanos de la mascota encontrada. 
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
   .contenedor_huella{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
   }
   .huella{
     width:100px;
   }
   .page_home{
     display:none;
   }
   .section_principal{
     width:100%;
     height:1200px;
     background-color:white;
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
  padding:50px;
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
  




   
    `
   
      
      
        
    this.appendChild(style)
   }
  
}
customElements.define("home-el",Home)