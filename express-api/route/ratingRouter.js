const express = require("express");
const router = express.Router();
const ratingController = require("../controller/ratingController");

router.post("/rateUser", ratingController.rateUser);

router.put("/editRating/:ratingId", ratingController.editRating);

router.get("/getAverageRating/:userId", ratingController.getAverageRating);

router.post("/addFeedback/:userId", ratingController.addFeedback);

router.put("/editFeedback/:feedbackId", ratingController.editFeedback);

router.delete("/deleteFeedback/:feedbackId", ratingController.deleteFeedback);

module.exports = router;
