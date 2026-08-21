import express from "express";
import AuthService from "../services/AuthService.js";

const authRouter = express.Router()
const authService = new AuthService();

authRouter.post("/signup", async (req, res, next) => {
    try {
        res.status(201).json(authService.signUp(req.body))
    } catch (error) {
        next(error)
    }
})

authRouter.post("/login", async (req, res, next) => {
    try {
        res.status(200).json
    } catch (error) {
        next(error)
    }
})

export default authRouter