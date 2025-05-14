import User from '../models/user.model.js'
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()

    res.status(200).json({
      success: true,
      data: users,
    })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      const error = new Error("User not found")
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, salt),
    })

    res.status(201).json({
      success: true,
      data: newUser
    })
  } catch (e) {
    next(e)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true,
        runValidators: true
      })
    if (!updateUser) {
      const error = new Error("User not found")
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      data: updateUser
    })
  } catch (e) {
    next(e)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      const error = new Error("User not found")
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (e) {
    next(e)
  }
}