import express from "express";
import {
  createContact,
  getContacts,
  deleteContact
} from "../controllers/contactController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.use(auth);

router.post("/", createContact);
router.get("/", getContacts);
router.delete("/:id", deleteContact);

export default router;
