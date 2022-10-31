import express, { json } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import globalErrHandler from "./src/controllers/errorController.js";
//ngrok.exe http -host-header=rewrite localhost:5000
// Routes
import {fileURLToPath} from 'url';

import path from "path";

import indexRoutes from "./src/routes/indexRoutes.js";



const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);




const app = express();


// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API
const limiter = rateLimit({
  max: 150000,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request from this IP, please try again in an hour",
});

app.use("/api", limiter);

app.use(express.static(path.join(__dirname, 'productimages')));

// Body parser, reading data from body into req.body
app.use(
  json({
    limit: "25MB",
  })
);



// Data sanitization against No sql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use("/api", indexRoutes);
app.use(globalErrHandler);

export default app;
