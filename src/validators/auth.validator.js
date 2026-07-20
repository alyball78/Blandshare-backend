import { body } from "express-validator";

export const validateRegister=[
body("email")
.notEmpty().withMessage("L'email est obligatoire")
.isEmail().withMessage("l'email n'est pas au bon format"),
body("password")
.notEmpty().withMessage("Le mot de passe est obligatoire")
.isLength({ min : 6}).withMessage("Le mot de passe doit contenir au minimum 6 caractères"),
    body("pseudo")
        .notEmpty({ min: 2 }).withMessage("Le pseudo doit contenir au minimum 2 caractères"),
    body("consentGiven")
        .custom((value) => value === true).withMessage('Le consentement est requis pour créer un compte'),
] 

export const validateLogin  = [
    body("email")
        .notEmpty().withMessage("L'email est obligatoire")
        .isEmail().withMessage("l'email n'est pas au bon format"),
    body("password")
        .notEmpty().withMessage("Le mot de passe est obligatoire")
 
]