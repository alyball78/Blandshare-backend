import AppErrors from "../errors/AppError.js";
import * as UserModel from "../models/user.model.js";
import bcrypt from "bcrypt"; 
import jwt from "../jsonwebtoken";

export const registerUser = async ({ email, password, pseudo, consentGiven }) => {
    const existing = await UserModel.findByEmail(email);
    if (existing) {
        throw new AppError('Email déjà utilisé', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashedPassword, pseudo, consentGiven });

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
    );

    return token;
};

export const loginUser = async ({ email, password }) => {
    const user = await UserModel.findByEmail(email);
    if (!user) {
        throw new AppError('Email ou mot de passe incorrect', 401);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new AppError('Email ou mot de passe incorrect', 401);
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
    );

    return token;
};