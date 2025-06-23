import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/contactRoutes.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: process.env.FRONT_URL || "http://localhost:5173", 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


app.use("/api", router);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada" });
});


export default app;
