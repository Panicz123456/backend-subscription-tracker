import {Router} from 'express'

import authorize from "../middlewares/auth.middleware.js";

import {
  getUserSubscriptions,
  createSubscription,
  getAllSubscriptions,
  getAllSubscriptionsByDetails,
  updateSubscription,
  DeleteSubscription, cancelSubscription
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscriptions)

subscriptionRouter.get("/:id", authorize, getAllSubscriptionsByDetails)

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.put("/:id", authorize, updateSubscription)

subscriptionRouter.delete("/:id", authorize, DeleteSubscription)

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions)

subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription)

// TODO: Add a route to get all subscriptions that are about to renew in the next 30 days
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({title: "GET upcoming renewals"});
})

export default subscriptionRouter;