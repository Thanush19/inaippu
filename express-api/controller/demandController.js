const db = require("../config/db");

const createDemand = async (req, res) => {
  try {
    const {
      description,
      serviceType,
      isClosed,
      isResolved,
      user_id,
      resolvedByUserId,
    } = req.body;
    const result = await db.one(
      "INSERT INTO demands (description, serviceType, isClosed, isResolved, user_id, resolved_by_user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        description,
        serviceType,
        isClosed,
        isResolved,
        user_id,
        resolvedByUserId,
      ]
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating demand:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDemandsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await db.any("SELECT * FROM demands WHERE user_id = $1", [
      userId,
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting demands by user ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllDemands = async (req, res) => {
  try {
    const demands = await db.any(`
      SELECT demands.id, demands.description, demands.serviceType,
             demands.isClosed, demands.isResolved,
             users.id AS user_id, users.username, users.email, users.phone_number, users.address, users.gender, users.role,
             users.services, users.coordinates_lat, users.coordinates_lng
      FROM demands
      INNER JOIN users ON demands.user_id = users.id
    `);

    res.status(200).json({ demands });
  } catch (error) {
    console.error("Error fetching demands:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateDemand = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      description,
      serviceType,
      isClosed,
      isResolved,
      userId,
      resolvedByUserId,
    } = req.body;

    const result = await db.oneOrNone(
      "UPDATE demands SET description = $1, serviceType = $2, isClosed = $3, isResolved = $4, user_id = $5, resolved_by_user_id = $6 WHERE id = $7 RETURNING *",
      [
        description,
        serviceType,
        isClosed,
        isResolved,
        userId,
        resolvedByUserId,
        id,
      ]
    );

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Demand not found" });
    }
  } catch (error) {
    console.error("Error updating demand:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteDemand = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.result("DELETE FROM demands WHERE id = $1", [id]);
    if (result.rowCount === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Demand not found" });
    }
  } catch (error) {
    console.error("Error deleting demand:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createDemand,
  getDemandsByUserId,
  getAllDemands,
  updateDemand,
  deleteDemand,
};
