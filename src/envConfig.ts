import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.MODE}` });

export const expressPort = process.env.VITE_EXPRESS_PORT;
export const socketPort = process.env.VITE_SOCKET_PORT;
