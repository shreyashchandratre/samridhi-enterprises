import express from "express";
import rateLimit from "express-rate-limit";
import { upload, validateImageSignature } from "../middleware/multer.js";
import {
  addPart,
  getAllParts,
  getPartById,
  updatePart,
  deletePart,
  createOrUpdateReview,
  deleteReview,
  getSimilarParts,
} from "../controllers/partsControllers.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/Admin.js";
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later."
});
const partRouter = express.Router();

partRouter.post("/add", adminLimiter, upload.array("images", 5), validateImageSignature, auth, admin, addPart);
partRouter.get("/get", getAllParts);
partRouter.get("/get/:id", getPartById);
partRouter.get("/get/:id/similar", getSimilarParts);
partRouter.put("/update/:id", adminLimiter, upload.array("images", 5), validateImageSignature, auth, admin, updatePart);
partRouter.delete("/delete/:id", auth, admin, deletePart);
partRouter.post("/review/:id", auth, createOrUpdateReview);
partRouter.delete("/review/:id", auth, deleteReview);

export default partRouter;
