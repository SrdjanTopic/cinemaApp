require("dotenv").config();
import bcrypt from "bcrypt";
import { Dialect, Sequelize } from "sequelize";

export const JWT_SECRET = process.env.JWT_SECRET as string;

export const SALT = bcrypt.genSaltSync(10);

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
  dialectOptions: { useUTC: false },
  timezone: "00:00",
});

export default sequelizeConnection;
