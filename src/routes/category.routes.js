import { Router } from "express";
import * as categoryController from "../controller/category.controller.js";
import { validateCategory } from "../validators/category.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = Router();
router.get("/",  categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", authenticate, authorize("admin"), validateCategory, validate, categoryController.createCategory);
router.put("/:id", authenticate, authorize("admin"), validateCategory, validate, categoryController.updateCategory);
router.delete("/:id", authenticate, authorize("admin"),  categoryController.deleteCategory);
export default router;