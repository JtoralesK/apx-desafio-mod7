import "./router"
import {state} from "./state"
import "./pages/home/home"
import "./pages/login/login"
import "./pages/reporta/reportaMascota"
import "./pages/mascotasReportadas/mascotasReportadas"
import "./pages/mascotasCerca/cercaMascota"
import "./pages/perfil/perfil"
import "./pages/editar-eleminar/index"
import "./pages/editar-perfil/index"
import "./pages/ubi/preHome"
import "./pages/cambiarPassword/password"
//components
import "./components/header2"

//state

function main(){
    state.init()
    
    
}
main()