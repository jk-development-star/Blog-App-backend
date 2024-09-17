import Users from "../models/users.js";
import createHttpError from 'http-errors';
import { validationError, emailConflictError } from '../middleware/errorHandler.js';
import axios from 'axios';

export const register = async (req, res, next) => {
    try {
        await Users.create(req.body)
            .then(async (user) => {
                if (user) {
                    const data = {
                        "user_id": user._id,
                        "user_name": user.user_name,
                        "email": user.email,
                        "password": user.password,
                        "user_type": user.user_type
                    }
                    await axios.post('http://localhost:3002/api/v1.0/blogsite/', data)
                }
                res.status(201).json({ message: "User registered successfully!!" })
            })
            .catch((error) => {
                if (error.name === 'ValidationError') {
                    res.status(400).json(validationError(error));
                }
                if (error.code === 11000) {
                    res.status(409).json(emailConflictError(error));
                }
            });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        await Users.find({}, { __v: 0 })
            .then((users) => res.status(200).json(users))
            .catch((error) =>
                res.status(404).json(createHttpError(error.message))
            );
    } catch (error) {
        next(error);
    }
};

// get user detail by id
export const getUserByAuthorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Users.findOne({ _id: id }, { __v: 0, password: 0, email: 0, user_type: 0, createdAt: 0, createdAt: 0 })
            .then((user) => res.status(200).json(user))
            .catch((error) =>
                res.status(404).json(createHttpError(error.message))
            );
    } catch (error) {
        next(error);
    }
};