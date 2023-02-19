import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dataBase";

export interface IUserModel {
    firstName: string;
}

export interface ICreateUserDto extends Optional<IUserModel, "firstName"> {}
export interface IUserOut extends Required<IUserModel> {}

export class User extends Model<IUserModel, ICreateUserDto> implements IUserModel {
    firstName: string;
}

User.init(
    {
        // Здесь определяются атрибуты модели
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        // Здесь определяются другие настройки модели
        sequelize, // Экземпляр подключения (обязательно)
        modelName: "User", // Название модели (обязательно)
    },
);
