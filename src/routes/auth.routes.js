import { Router } from "express";
import * as authController from "../controller/auth.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateRegister, validate, authController.register);
router.post("/login", validateLogin, validate, authController.login);
router.get("/me", authenticate, authController.getMe);

router.put(
  "/me",
  authenticate,
  //validateAccountUpdate,
  //validate,
  authController.updateMe,
);

//router.delete("/me", authenticate, authController.deleteAccount);
router.delete("/me", authenticate, authController.deleteMe);
export default router;
