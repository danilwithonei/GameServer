import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("db", "user", "password", {
    host: "postgres",
    dialect: "postgres",
});
