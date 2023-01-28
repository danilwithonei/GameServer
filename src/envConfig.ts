import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.MODE}` });

export const expressPort = process.env.VITE_EXPRESS_PORT;
export const socketPort = process.env.VITE_SOCKET_PORT;
export const host = process.env.VITE_HOST;
export const mode = process.env.VITE_MODE;