import { Router } from "express";
import * as articleController from "../controller/article.controller.js";
import * as likeController from "../controller/like.controller.js";
import { validateArticle } from "../validators/article.validator.js";
import validate from "../middlewares/validate.middleware.js";
import {
  authenticate,
  optionalAuthenticate,
} from "../middlewares/auth.middleware.js";
import {authorize} from "../middlewares/authorize.middleware.js";

const router = Router();
router.get("/", optionalAuthenticate, articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);
router.post("/", authenticate, authorize('admin'), validateArticle, validate, articleController.createArticle);
router.post("/:articleId/likes", authenticate, likeController.toggleLike);
router.put("/:id", authenticate, authorize('admin'), validateArticle, validate, articleController.updateArticle);
router.delete("/:id", authenticate, authorize('admin'), articleController.deleteArticle);

export default router;