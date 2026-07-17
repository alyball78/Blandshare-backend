import * as authService from "../services/auth.service.js";

export const register = async (req, res) =>{
    const { email, password, pseudo, consentGiven} = req.body;
const token =  await authService.registerUser(email, password);
    res.status(201).json({ token });

export const login = async (req, res) =>{
const {email, password} = req.body;
const token = await authService.loginUser(email, password);
    res.json({ token }); 

}

}