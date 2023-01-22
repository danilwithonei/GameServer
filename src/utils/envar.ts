import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.MODE}` });

export const EXPRESS_PORT = process.env.EXPRESS_PORT;
export const SOCKET_PORT = process.env.SOCKET_PORT;
export const SOCKET_URL = process.env.SOCKET_URL;
