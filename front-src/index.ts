import "./router"
import {state} from "./state"
import "./pages/home/home"
import "./pages/login/login"
import "./pages/reporta/reportaMascota"
import "./pages/mascotasReportadas/mascotasReportadas"
//components
import "./components/header/header"
import "./components/header2"

//state

function main(){
    state.init()
    state.getCurrentUbication()
    
    
}
main()