const express = require("express");
const demandController = require("../controller/demandController");

const router = express.Router();

router.post("/create-demand", demandController.createDemand);
router.get("/demands-by-user/:userId", demandController.getDemandsByUserId);
router.get("/resident-demand", demandController.getAllDemands);
router.put("/update-demand/:id", demandController.updateDemand);
router.delete("/delete-demand/:id", demandController.deleteDemand);

module.exports = router;
