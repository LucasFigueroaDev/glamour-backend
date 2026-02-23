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
let allowedOrigins;
if (environment === "development") {
  allowedOrigins = ["http://localhost:5173", "http://localhost:4173"];
  // OpenAPI docs.
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  );
} else {
  allowedOrigins = [
    "https://glamour-frontend.vercel.app",
    "https://glamour-frontend-a2w1j9lfz-lucas-figueroas-projects.vercel.app",
  ];
}
if (environment === "development") {
  // CORS config for development.
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    }),
  );
}
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // requests without origin, e.g. Postman
    if (
      allowedOrigins.includes(origin) ||
      /^https:\/\/glamour-frontend-[a-z0-9-]+\.lucas-figueroas-projects\.vercel\.app$/.test(
        origin,
      )
    ) {
      return callback(
        new Error(`CORS bloqueado: ${origin} no esta permitido`),
        false,
      );
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsers and cookies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files.
app.use(express.static(path.join(__dirname, "..", "public")));

// Main API router.
app.use("/api", apiRouter);

// Error handler.
app.use(errorHandler);

// DB connection.
connectToMongo();

export default app;
