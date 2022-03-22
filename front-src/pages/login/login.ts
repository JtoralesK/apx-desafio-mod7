import {Router} from"@vaadin/router"
import {state} from"../../state"
type Mode="iniciado" | "registrado"
class Login extends HTMLElement{
    mode:Mode
    connectedCallback(){
      this.render()
      document.querySelector(".btn__iniciar-sesion").addEventListener("click", iniciarSesion);
      document.querySelector(".btn__registrarse").addEventListener("click", register);
      window.addEventListener("resize", ()=>{
        if (window.innerWidth > 850){
          caja_trasera_register.style.display = "block";
          caja_trasera_login.style.display = "block";
      }else{
          caja_trasera_register.style.display = "block";
          caja_trasera_register.style.opacity = "1";
          caja_trasera_login.style.display = "none";
          formulario_login.style.display = "block";
          contenedor_login_register.style.left = "0px";
          formulario_register.style.display = "none";   
      }
      });

//Declarando variables
const formulario_login:HTMLElement = document.querySelector(".formulario__login");
const formulario_register:HTMLElement  = document.querySelector(".formulario__register");
const contenedor_login_register:HTMLElement  = document.querySelector(".contenedor__login-register");
const caja_trasera_login:HTMLElement  = document.querySelector(".caja__trasera-login");
const caja_trasera_register:HTMLElement  = document.querySelector(".caja__trasera-register");
const errorUsuario:HTMLElement= document.querySelector(".errorUsuarioExistente")


    //FUNCIONES



    function iniciarSesion(){
        errorUsuario.style.display="none"
        if (window.innerWidth > 850){
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "10px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.opacity = "0";
        }else{
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "none";
        }
    }

    function register(){
        console.log(2412)
        if (window.innerWidth > 850){
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "410px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.opacity = "0";
            caja_trasera_login.style.opacity = "1";
        }else{
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.display = "none";
            caja_trasera_login.style.display = "block";
            caja_trasera_login.style.opacity = "1";
        }
}
   //relacion con el state

   const formRegistrarse = document.querySelector(".formulario__register")
   formRegistrarse.addEventListener("submit",(e)=>{
     e.preventDefault()
     const target:any = e.target
     const fullname = target.nombreCompleto.value
     const email = target.correoElectronico.value
     const password = target.contraseña.value
    state.dataRegistroMiUser(fullname,email,password)

     
     
   })
   
   const formIniciarSecion = document.querySelector(".formulario__login")
   
   formIniciarSecion.addEventListener("submit",(e)=>{
   e.preventDefault()
     const target:any = e.target
     const email = target.email.value
     const password = target.password.value

     state.dataInicioSecion(email,password)
     
   })

   //suscribe

   state.subscribe(()=>{
       const cs = state.getState()
       this.mode=cs.dataRegistro.mode       
       this.userUbication()
   
    
   })
    
   }
   userUbication(){
    console.log(this.mode);
    const cs = state.getState()
    const typePage = cs.me.page
    if(cs.dataRegistro.mode == "registrado"){
        console.log("registrado");
        state.setModeRegistoUser(()=>{
            state.pushDataRegisto(()=>{
                const verificadorUsuario = cs.error.usuarioCreado
                console.log(verificadorUsuario);
                if(verificadorUsuario==false){
                    state.obtieneToken(()=>{
                        state.meLocalstorage()
                       state.obtieneMiData(()=>{
                           if(typePage=="/mascotas"){
                               state.obtieneMisReportes(()=>{
                                   Router.go("/mascotas")
                                 })
                           }if(typePage=="/report"){
                               Router.go("/report")
   
                           }if(typePage=="/cerca"){
                               state.reportesCerca(()=>{
                                   Router.go("/cerca")
                       
                                  })
   
                           }if(typePage=="/perfil"){
                               Router.go("/perfil")
   
                           }
                       })
                   })
                }else{
                    console.error("no")
                    const errorUsuario:HTMLElement= document.querySelector(".errorUsuarioExistente")
                    errorUsuario.style.display="initial"
                    state.setErrorUserCreado()
                }
               
                       })            
        })
    }
    if(cs.dataRegistro.mode == "iniciado"){
        console.log("iniciado");
        state.setModeRegistoUser(()=>{
                 state.obtieneToken(()=>{
                    state.meLocalstorage()
                    state.obtieneMiData(()=>{
                            const verificador = cs.error.usuario
                            console.log(verificador);
                            
                            if(verificador=="error"){
                                const error:HTMLElement= document.querySelector(".error")
                                error.style.display="initial"
                                state.setError()
                            }else{
                                if(typePage=="/mascotas"){
                                    state.obtieneMisReportes(()=>{
                                        Router.go("/mascotas")
                                      })
                                }if(typePage=="/report"){
                                    Router.go("/report")

                                }if(typePage=="/cerca"){
                                    state.reportesCerca(()=>{
                                        Router.go("/cerca")
                                       })
                                }if(typePage=="/perfil"){
                                    Router.go("/perfil")
                                    

                                }
                        

                            }


                    })

                })
                                 
        })

    }
   }
   render(){
   
       const style = document.createElement("style")
    
      this.innerHTML=`
      
      
    <div class="contenedor__todo">
    <div class="caja__trasera">
        <div class="caja__trasera-login">
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Inicia sesión para entrar en la página</p>
            <button class="btn__iniciar-sesion">Iniciar Sesión</button>
        </div>
        <div class="caja__trasera-register">
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas iniciar sesión</p>
            <button class="btn__registrarse">Regístrarse</button>
        </div>
    </div>

    <div class="contenedor__login-register">
        
        <form class="formulario__login">
            <h2>Iniciar Sesión</h2>
            <h3 class="error">Contraseña o correo incorrecto</h3>
            <input type="text" placeholder="Correo Electronico" name="email">
            <input class="input_password" type="password" placeholder="Contraseña" name="password">
            <button>Entrar</button>
        </form>

        <form  class="formulario__register">
            <h2>Regístrarse</h2>
            <input type="text" placeholder="Nombre completo" name="nombreCompleto">
            <input type="text" placeholder="Correo Electronico" name="correoElectronico">
            <input type="password" placeholder="Contraseña" name="contraseña">
            <button>Regístrarse</button>
        </form>
        <h2 class="errorUsuarioExistente">Este usuario ya exite</h2>

    </div>

</div>
      `
    style.innerHTML=`
    body{
      background-image: url("https://imagefinder.co/storage/w1000/images/2019/05/pixabay_flatcoated-retriever-4219324_960_720.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-attachment: fixed;
  }
  .error{
      color:red;
      display:none;
  }
  .errorUsuarioExistente{
    display:none;
    color:red;
    position:absolute;
    margin-top:240px;
    text-align:center;
    margin-left:20px;
  }
  .input_password{
    margin-bottom:10px;
  }
  
  .main{
      width: 100%;
      padding: 20px;
      margin: auto;
     
  }
  
  .contenedor__todo{
      width: 100%;
      max-width: 800px;
      margin: auto;
    
  }
  
  .caja__trasera{
      width: 100%;
      padding: 50px 20px;
      display: flex;
      justify-content: center;
      backdrop-filter: blur(3.2px);
      background-color: rgb(90 94 98 / 50%)
  
  }
  
  .caja__trasera div{
      margin: 100px 40px;
      color: white;
      transition: all 500ms;
  }
  
  
  .caja__trasera div p,
  .caja__trasera button{
      margin-top: 30px;
  }
  
  .caja__trasera div h3{
      font-weight: 400;
      font-size: 26px;
  }
  
  .caja__trasera div p{
      font-size: 16px;
      font-weight: 300;
  }
  
  .caja__trasera button{
      padding: 10px 40px;
      border: 2px solid #fff;
      font-size: 14px;
      background: transparent;
      font-weight: 600;
      cursor: pointer;
      color: white;
      outline: none;
      transition: all 300ms;
  }
  
  .caja__trasera button:hover{
      background: #fff;
      color: #2e8b57;
  }
  
  /*Formularios*/
  
  .contenedor__login-register{
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 380px;
      position: relative;
      top: -185px;
      left: 10px;
  
      /*La transicion va despues del codigo JS*/
      transition: left 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275);
  }
  
  .contenedor__login-register form{
      width: 100%;
      padding: 80px 20px;
      background: white;
      position: absolute;
      border-radius: 20px;
  }
  
  .contenedor__login-register form h2{
      font-size: 30px;
      text-align: center;
      margin-bottom: 20px;
      color:#2e8b57;
  }
  
  .contenedor__login-register form input{
      width: 100%;
      margin-top: 20px;
      padding: 10px;
      border: none;
      background: #F2F2F2;
      font-size: 16px;
      outline: none;
  }
  
  .contenedor__login-register form button{
      padding: 10px 40px;
      margin-top: 40px;
      border: none;
      font-size: 14px;
      background: #2e8b57;
      font-weight: 600;
      cursor: pointer;
      color: white;
      outline: none;
  }
  
  
  
  
  .formulario__login{
      opacity: 1;
      display: block;
  }
  .formulario__register{
      display: none;
  }
  
  
  
  @media screen and (max-width: 850px){
  
      main{
          margin-top: 50px;
      }
  
      .caja__trasera{
          max-width: 350px;
          height: 300px;
          flex-direction: column;
          margin: auto;
      }
  
      .caja__trasera div{
          margin: 0px;
          position: absolute;
      }
  
  
      /*Formularios*/
  
      .contenedor__login-register{
          top: -10px;
          left: -5px;
          margin: auto;
      }
  
      .contenedor__login-register form{
          position: relative;
      }
      .caja__trasera-login{
        display: none;
    }
  }
   
  

   
    `
   
      
      
        
    this.appendChild(style)
   }
  
}
customElements.define("login-el",Login)