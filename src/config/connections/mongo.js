import mongoose from "mongoose";
import { log, error } from "../../utils/logger.js";
import "dotenv/config";

let isConnected = false;

export const connectToMongo = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(process.env.MONGO_KEY, {
      dbName: "DB-Glamour",
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: "majority",
    });
    isConnected = db.connections[0].readyState === 1;
    log("Conexión a la base de datos exitosa");
  } catch (err) {
    error("Error al conectarse a la base de datos", err.message);
    throw err;
  }
};
