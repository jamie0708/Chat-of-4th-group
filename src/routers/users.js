import express from "express";
import userController from "../controllers/users.js";
import checkToken from "../middlewares/checkToken.js";
const router = express.Router();

router.get('/users', checkToken, userController.GET);
router.post('/login', userController.LOGIN)
// router.get('/register', (req, res) => {
//     res.send('OK')
// })

export default router;