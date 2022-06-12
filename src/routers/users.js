import express from "express";
import checkToken from "../middlewares/checkToken.js ";
import userController from "../controllers/users.js";
const router = express.Router();

router.get('/users', userController.GET);
router.post('/login', userController.LOGIN);
router.post('/register', userController.REGISTER);

export default router;