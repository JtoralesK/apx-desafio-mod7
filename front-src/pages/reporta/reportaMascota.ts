import {Router} from"@vaadin/router"
import {state} from"../../state"
import {Dropzone} from"dropzone"
import * as mapboxgl from "mapbox-gl";
const MapboxClient = require("mapbox");
const mapboxClient = new MapboxClient(process.env.MAPBOX_TOKEN);
class Report extends HTMLElement{
    connectedCallback(){
      this.render()
        //dropzone
      let imgDataUrl;
      const myDropzone = new Dropzone(".img-div", {
          url: "/falsa",
          autoProcessQueue: false,
        });
        myDropzone.on("thumbnail", function (file) {
          imgDataUrl=file.dataURL
        });
  
        const reportarMascotas:HTMLElement = document.querySelector(".form")
        const marcarLugar:HTMLElement = document.querySelector(".marcarLugar")
        marcarLugar.addEventListener("click",(e)=>{
          e.preventDefault()
        })
       
        const cs = state.getState()
   
          reportarMascotas.addEventListener("submit",(e)=>{
            e.preventDefault()
            const error:HTMLElement = document.querySelector(".error")
            error.style.display="none"
            const target:any = e.target
            const petName = target.name.value
            const loca = target.busqueda.value

            
            const eje:HTMLElement = document.querySelector(".ejemplo")
                eje.style.color="green"
            state.dataParaCloudinary(petName,imgDataUrl,loca,()=>{
              state.makeToReport(()=>{
                console.log(cs.error.confirmarUbicacion);
                
                if(cs.error.confirmarUbicacion==false){
                  const error:HTMLElement = document.querySelector(".error")
                  error.style.display="initial"
                  
                  state.setErrorUbi()

                }
              })
 
            })
        })

   }

   render(){
    

       const style = document.createElement("style")

      this.innerHTML=`
      <script src="//api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js"></script>
      <script src="//unpkg.com/mapbox@1.0.0-beta9/dist/mapbox-sdk.min.js"></script>

      <form class="form">
      <div class="form_container">
      <h1 class="ejemplo">Mi reporte</h1>
      <label >
          <h2>Nombre de la mascota</h2>
          <input type="text" class="input inputName" name="name" required  placeholder="michi">
      </label>
      <div class="img-div">
          <img class="prrofile-img">
          <br>
          <h2>Arrastra tu imagen</h2>            
      </div>
   
      <div class="mapa">
      <input class="busqueda" name="busqueda" type="search" required />
      <div id="map" style="width: 250px; height: 200px"></div>
      <button class="marcarLugar">Confirmar Ubicación</button>
        </div> 
        <h3 class="error">Falta confirmar ubicacion o subir imagen</h3>
        <button class="guardar" >Reportar</button>
    </form>

     
      `
    style.innerHTML=`
    *{
      box-sizing: border-box;
      margin:0;

  }
  .mapboxgl-control-container {
    display: none;
}
.mapboxgl-control-attrib-inner {
    display: none;
}
  .img-div{
      border: 1px solid rgba(255, 0, 0, 0.446);
  }
  
   .form{
     padding-top:50px;
   
   }
   .mapa{
    display: flex;
    flex-direction: column;
   }
 
   .form_container{
     width:330px;
     margin:0 auto;
     background-color: rgb(90 94 98 / 50%);
    border:solid 5px rgb(218, 118, 118);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:10px;
   }
   .guardar{
     width:90%;
     text-align: center;
     align-items: center;
     justify-content: center;
     margin-top:20px;
     color:green;

   }
  .inputName{
    margin-left: 29.2px;
  
  }
  .error{
    color:red;
    text-align:center;
    display:none;
  }
    `
   
    
function initMap() {
  mapboxgl.accessToken =process.env.MAPBOX_TOKEN
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
  });
}


function initSearchForm(callback) {
  const marcarLugar:HTMLElement = document.querySelector(".marcarLugar")
  const busqueda:any = document.querySelector(".busqueda")

  marcarLugar.addEventListener("click",(e)=>{
    e.preventDefault()
    mapboxClient.geocodeForward(
      busqueda.value,
      {
        country: "ar",
        autocomplete: true,
        language: "es",
      },
      function (err, data, res) {
        if (!err) callback(data.features);
      }
    );
  })

}
let lng;
let lat;
(function () {
  const map = initMap();
  initSearchForm(function (results) {
    const firstResult = results[0];
    const marker = new mapboxgl.Marker()
      .setLngLat(firstResult.geometry.coordinates)
      .addTo(map);
    map.setCenter(firstResult.geometry.coordinates);
    map.setZoom(14);
    const [longitud , latitude ] = firstResult.geometry.coordinates
    lng=longitud
    lat=latitude
    state.setReportLocation(lng,lat)

    // fetch("/comercios-cerca-de?lat=" + lat +"&lng="+lng).then((res)=>{return res.json()}).then((results)=>{
    //   for (const comercio of results) {
    //     const {lat, lng} = comercio._geoloc
    //     const marker = new mapboxgl.Marker()
    //   .setLngLat([lng, lat])
    //   .addTo(map);
    //   }
    //  })
  });
})();  
      

    this.appendChild(style)
   }
  
}
customElements.define("report-el",Report)