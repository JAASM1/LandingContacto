import express from "express";
import rateLimit from "express-rate-limit";
import {
  validateContact,
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactControllers.js";
import { verifyCaptcha } from "../middleware/verifyCaptcha.js";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 mins
  max: 5,
  message: { error: "Ups. Demasiadas solicitudes. Intenta en 15 minutos." },
});

router.post("/contact", limiter, verifyCaptcha, validateContact, createContact);
router.get("/contacts", getContacts);
router.patch("/contact/:id/read", markAsRead);
router.delete("/contact/:id/delete", deleteContact);

export default router;
