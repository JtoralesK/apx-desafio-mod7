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
       
        const cs = state.getState()
   
          reportarMascotas.addEventListener("submit",(e)=>{
            e.preventDefault()
            const target:any = e.target
            const petName = target.name.value
            const desciption = target.bio.value
            const loca = target.busqueda.value
       
            state.dataParaCloudinary(petName,desciption,imgDataUrl,()=>{
              state.makeToReport()
 
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
      <h1>Mi reporte</h1>
      <label >
          <h2>Nombre de la mascota</h2>
          <input type="text" class="input inputName" name="name">
      </label>
      <label >
          <h2>Describilo</h2>
          <textarea name="bio" class="bio" ></textarea>
      </label>
      <div class="img-div">
          <img class="prrofile-img">
          <br>
          <h2>Arrastra tu imagen</h2>            
      </div>
   
      <div class="mapa">
      <input name="busqueda" type="search" required />
      <div id="map" style="width: 250px; height: 200px"></div>
      <button class="guardar">Reportar</button>
        </div> 
    </form>

     
      `
    style.innerHTML=`
    *{
      box-sizing: border-box;
      margin:0;

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
     width:90%;
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

   }
  .inputName{
    text-align:center;
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
  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const target:any = e.target

    mapboxClient.geocodeForward(
      target.busqueda.value,
      {
        country: "ar",
        autocomplete: true,
        language: "es",
      },
      function (err, data, res) {
        if (!err) callback(data.features);
      }
    );
  });
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