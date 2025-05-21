import { createUserService, deleteUserService, updateUserService, getAllUsersService, getUserByIdService } from "../models/userModel.js";

//standard response funtion
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
    
};

export const createUser = async(req, res, next) => {
    const {name, email} = req.body;
    try{
        const newUser = await createUserService(name, email);
        handleResponse(res, 201, "User successfully created", newUser);
    } catch(err){
        next(err);
    }
};

export const getAllUser = async(req, res, next) => {
    try{
        const users = await getAllUsersService();
        handleResponse(res, 200, "Users successfully fetched", users);
    } catch(err){
        next(err);
    }
};

export const getUserById = async(req, res, next) => {
    const id = req.params.id;
    try{
        const user = await getUserByIdService(id);
        if(!user) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "User successfully fetched", user);
    } catch(err){
        next(err);
    }
};

export const updateUser = async(req, res, next) => {
    const {name, email} = req.body;
    try{
        const updatedUser = await updateUserService(req.params.id, name, email);
        if(!updatedUser) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "User successfully updated", updatedUser);
    } catch(err){
        next(err);
    }
};

export const deleteUser = async(req, res, next) => {
    try{
        const deletedUser = await deleteUserService(req.params.id);
        if(!deletedUser) return handleResponse(res, 404, "User not found");
        handleResponse(res, 200, "User successfully deleted", deletedUser);
    } catch(err){
        next(err);
    }
};