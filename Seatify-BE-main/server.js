import express from "express";
import cors from "cors";
import connectLivereload from "connect-livereload";
import dotenv from "dotenv";
import compression from "compression";
import users from "./routes/users.js";
import cron from "node-cron";
import {
  performPaymentCheck,
  updateDocumentStatus,
} from "./routes/cronjob.controller.js";

const app = express();

let envFile = ".env";

dotenv.config({ path: envFile });

const allowedOrigins = [
  "https://app.seatifyai.com",
  "https://seatifyai.com",
];

var corsOptions = {
  // origin: "*",
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(compression());
app.use(connectLivereload());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SNS IHub." });
});

app.use("/api/routes/users", users);

const port = process.env.PORT || 3003;
app.listen(port, (err) => {
  if (err) {
    console.error("Server failed to start:", err);
  } else {
    console.log("Server listening on port", port);
  }
});

cron.schedule(
  "* * * * *",
  async () => {
    // await performPaymentCheck();
    // await updateDocumentStatus();
  },
  { timezone: "Asia/Kolkata" }
);
