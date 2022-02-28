import { Auth } from "./auth";
import { User } from "./user";
import {Report} from"./report"
User.hasMany(Report);
Report.belongsTo(User)


export {User, Report,Auth}