import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import User from "./models/User.js";

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB Connection */
connectDb();

/* CREATE */
app.post("/students", async (req, res) => {
  try {
    const student = new User({
      id: Date.now(),
      ...req.body,
    });

    await student.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
});

/* READ */
app.get("/students", async (req, res) => {
  try {
    const students = await User.find();

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students",
      error: error.message,
    });
  }
});

/* UPDATE */
/* UPDATE */
app.put("/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const updatedStudent = await User.findOneAndUpdate(
      { id: id },
      req.body,
      { returnDocument: "after" }
    );

    res.json({
      message: "Updated",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating student",
      error: error.message,
    });
  }
});

/* DELETE */
app.delete("/students/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await User.findOneAndDelete({ id: id });

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting student",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});