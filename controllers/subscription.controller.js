import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    })

    res.status(201).json({
      success: true,
      data: subscription
    });
  } catch (error) {
    next(error)
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You don't have permission to use this action");
      error.status = 401
      throw error;
    }

    const subscriptions = await Subscription.find({user: req.params.id})

    res.status(200).json({
      success: true,
      data: subscriptions
    })
  } catch (e) {
    next(e);
  }
}

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({
      success: true,
      data: subscriptions
    })
  } catch (e) {
    next(e);
  }
}

export const getAllSubscriptionsByDetails = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("You don't have permission to use this action");
      error.status = 401
      throw error;
    }

    res.status(200).json({
      success: true,
      data: subscription
    });
  } catch (e) {
    next(e);
  }
}

export const updateSubscription = async (req, res, next) => {
  try {
    const updateSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!updateSubscription) {
      const error = new Error("Subscription not found")
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      data: updateSubscription
    })
  } catch (e) {
    next(e)
  }
}

export const DeleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found")
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      data: subscription
    })
  } catch (e) {
    next(e)
  }
}

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found")
      error.statusCode = 404
      throw error
    }

    subscription.status = "cancelled";
    await subscription.save();

    res.status(200).json({
      success: true,
      data: subscription
    })
  } catch (e) {
    next(e)
  }
}