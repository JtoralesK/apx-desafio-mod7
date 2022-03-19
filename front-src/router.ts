import {Router} from "@vaadin/router"

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  {path: '/', component: 'home-el'},
  {path: '/login', component: 'login-el'},
  {path: '/report', component: 'report-el'},
  {path: '/mascotas', component: 'mascotas-el'},
  {path: '/cerca', component: 'mascotascercanas-el'},
  {path: '/perfil', component: 'perfil-el'},
  {path: '/cambiar', component: 'report-cambiado-el'},
  {path: '/editarPerfil', component: 'editar-perfil-el'},







  


]);