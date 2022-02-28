import {Sequelize} from "sequelize"

export const sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.USERNAME_SEQUALIZE,
    password: process.env.PASSWORD_SEQUELIZE,
    database: "d4liiqmqa0iq1n",
    port: 5432,
    host: "ec2-52-70-205-234.compute-1.amazonaws.com",
    ssl: true,
    // esto es necesario para que corra correctamente
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

  sequelize.authenticate();