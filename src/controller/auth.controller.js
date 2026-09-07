import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
    const { email, password, pseudo, consentGiven} = req.body;
    const token = await authService.registerUser(email, password, pseudo, consentGiven);
    res.status(201).json({ token });

}

export const login = async (req, res) =>{
const {email, password} = req.body;
const token = await authService.loginUser(email, password);
    res.json({ token }); 

}

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const { pseudo, email } = req.body;

    const updatedUser = await authService.updateUser(
      req.user.id,
      pseudo,
      email,
    );

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};
export const deleteMe = async(req, res) => {
    const id = req.user.id 
    await authService.deleteAccount(id);
    res.status(204).send();
};
