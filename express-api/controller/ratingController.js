const db = require("../config/db");

const rateUser = async (req, res) => {
  const { user_id, rating, rated_by_user_id } = req.body;

  try {
    // Check if the user_id and rated_by_user_id exist in the users table
    const userExistQuery = "SELECT 1 FROM users WHERE id = $1 OR id = $2";
    const userExistValues = [user_id, rated_by_user_id];
    const userExistResult = await db.query(userExistQuery, userExistValues);

    if (userExistResult.rows && userExistResult.rows.length !== 2) {
      return res.status(404).json({ error: "User not found" });
    }

    // Insert the rating into the ratings table
    const insertRatingQuery = `
      INSERT INTO ratings (user_id, rating, rated_by_user_id)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, rated_by_user_id) DO UPDATE
      SET rating = EXCLUDED.rating, updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    const insertRatingValues = [user_id, rating, rated_by_user_id];
    const result = await db.query(insertRatingQuery, insertRatingValues);

    if (result.rowCount > 0) {
      // Rows were affected, meaning a new rating was inserted or an existing one updated
      res.json(result.rows[0]);
    } else {
      // No rows were affected, meaning the row already exists
      const existingRowQuery = `
        SELECT * FROM ratings
        WHERE user_id = $1 AND rated_by_user_id = $2
      `;
      const existingRowValues = [user_id, rated_by_user_id];
      const existingRowResult = await db.query(
        existingRowQuery,
        existingRowValues
      );

      if (existingRowResult.rows && existingRowResult.rows.length > 0) {
        res.json(existingRowResult.rows[0]);
      } else {
        console.error("No rows returned from the database query.");
        res.status(500).json({
          error: "Internal Server Error",
          details: "No rows returned from the database query",
        });
      }
    }
  } catch (error) {
    console.error("Error rating user:", error);
  }
};

// Example usage in your route
// app.post('/api/rateUser', rateUser);

const editRating = async (req, res) => {
  const { ratingId } = req.params;
  const { rating } = req.body;

  try {
    const result = await db.query(
      "UPDATE ratings SET rating = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [rating, ratingId]
    );

    res.json(result.rows[0]);
    z;
  } catch (error) {
    console.error("Error rating user:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      stack: error.stack,
    });
  }
};
const deleteRating = async (req, res) => {
  const { ratingId } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM ratings WHERE id = $1 RETURNING *",
      [ratingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Rating not found" });
    }

    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAverageRating = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await db.query(
      "SELECT COALESCE(AVG(rating), 0) as average_rating FROM ratings WHERE user_id = $1",
      [userId]
    );

    if (result.rows.length > 0) {
      res.json({ averageRating: result.rows[0].average_rating });
    } else {
      res.json({ averageRating: 0 }); // Return a default value or handle the absence of ratings
    }
  } catch (error) {
    console.error("Error getting average rating:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      stack: error.stack,
      errorDetails: error,
    });
  }
};

const addFeedback = async (req, res) => {
  const { userId } = req.params;
  const { feedbackText, givenByUserId } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO feedback (user_id, feedback_text, given_by_user_id) VALUES ($1, $2, $3) RETURNING *",
      [userId, feedbackText, givenByUserId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const editFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const { feedbackText } = req.body;

  try {
    const result = await db.query(
      "UPDATE feedback SET feedback_text = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [feedbackText, feedbackId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error editing feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM feedback WHERE id = $1 RETURNING *",
      [feedbackId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  rateUser,
  editRating,
  deleteRating,
  getAverageRating,
  addFeedback,
  editFeedback,
  deleteFeedback,
};
