import { body } from "express-validator";

export const validateCategory = [
body("name")
.notEmpty().withMessage("Le nom est obligatoire")
.isLength({ min: 2, max: 100 })
.withMessage("Le nom doit comporter entre 2 et 100 caractères"),
];