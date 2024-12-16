import express from "express"
import { addPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getAllPosts)
router.get("/:id", getPost)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.patch("/:id", updatePost)
export default router