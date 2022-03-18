import { Model,DataTypes} from "sequelize"
import {sequelize} from"../db/connection"
export class Report extends Model {}
Report.init({
  petName: DataTypes.STRING,
  location:DataTypes.STRING,
  lat: DataTypes.FLOAT,
  lng: DataTypes.FLOAT,
  url:DataTypes.STRING,
  user_id: DataTypes.INTEGER

  

}, { sequelize, modelName: 'report' });

