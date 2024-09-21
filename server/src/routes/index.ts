import { Router } from "express"
import AuthController from "../controllers/AuthController.js"
import authMiddleware from "../middleware/AuthMiddleware.js"
import {destory, index, show, store, update} from "../controllers/ChatGroupController.js"
const router = Router()

router.post("/auth/login", AuthController.login)
router.post("/chat-group", authMiddleware, store)
router.get("/chat-group/:id", authMiddleware, show)   
router.get("/chat-group", authMiddleware, index)
router.delete("/chat-group/:id", authMiddleware, destory)
router.put("/chat-group/:id", authMiddleware, update);


export default  router