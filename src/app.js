import express from "express";
import cookieParser from "cookie-parser";
import path from "node:path";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import apiRouter from "./routes/index.js";
import { swaggerSpec } from "./docs/swagger.js";
import { errorHandler } from "./middlewares/errorHandler/errorHandler.js";
import { __dirname } from "./utils/utils.js";
import { log } from "./utils/logger.js";
import { connectToMongo } from "./config/connections/mongo.js";
import "./config/passportJWT/jwt.config.js";

const app = express();
const environment = process.env.NODE_ENV || "development";
log(`Ejecutando en modo: ${environment}`);

if (environment === "development") {
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  );
}

const allowedOrigins =
  environment === "development"
    ? ["http://localhost:5173", "http://localhost:4173"]
    : [
        "https://glamour-frontend.vercel.app",
        /^https:\/\/glamour-frontend-[a-z0-9-]+\.lucas-figueroas-projects\.vercel\.app$/,
      ];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman o server-to-server

    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });

    if (!isAllowed) {
      return callback(
        new Error(`CORS bloqueado: ${origin} no está permitido`),
        false,
      );
    }

    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", apiRouter);
app.use(errorHandler);

connectToMongo();

export default app;
