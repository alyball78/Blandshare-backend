import { Router } from "express";
import * as  authController from "../controller/auth.controller.js";
import {validateAuth} from "../validators/auth.validator.js";
import { validate }from "../middlewares/validate.middleware.js";

const router = Router();
router.post("/register", validateAuth, validate, authController.register);
router.post("/login", validateAuth, validate, authController.login);

export default router;