import express from "express";
import { getAllUsers, register, getUserByAuthorId } from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/getall", verifyToken, getAllUsers);
router.post("/register", register);
router.get('/:id', verifyToken, getUserByAuthorId)


export default router;