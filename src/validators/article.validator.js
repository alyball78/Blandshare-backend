import { body } from "express-validator";

export const validateArticle = [
    body("title")
        .notEmpty().withMessage("Le titre est obligatoire")
        .isLength({min: 2, max: 200}).withMessage("Le titre doit comporter entre 2 et 200 caractère"),
    body("content")
        .notEmpty().withMessage("Le champ ne doit pas être vide"),
    body("excerpt")
        .isLength({max: 300}).withMessage("Le champ ne doit pas dépasser 300 caractères"),
    body("cover_image_url")
        .isURL().withMessage("Le champ doit êztre une url"), ,
    body("category_id")
        .isInt().withMessage("Le champ être un nombre entier positif"),
    body("status").isIn(['draft', 'published']).withMessage("Le champ est soit draft soit published"),
] 