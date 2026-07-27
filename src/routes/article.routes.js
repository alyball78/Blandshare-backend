import { Router } from "express";
import { ValidationHalt } from "express-validator/lib/base.js";
import * as articleController from "../controller/article.controller.js";
import { validateArticle } from "../validators/article.validator.js";
import validate from "../middlewares/validate.middleware.js";
import {authenticate } from "../middlewares/auth.middleware.js";
import {authorize} from "../middlewares/authorize.middleware.js";

const router = Router();
router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);
router.post("/", authenticate, authorize('admin'), validateArticle, validate, articleController.createArticle);
router.put("/:id", authenticate, authorize('admin'), validateArticle, validate, articleController.updateArticle);
router.delete("/:id", authenticate, authorize('admin'), validateArticle, validate, articleController.deleteArticle);

export default router;