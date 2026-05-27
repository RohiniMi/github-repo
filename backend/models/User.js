import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  roll: {
    type: String,
    required: true,
    unique: true,
  },

  admission: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  sem: {
    type: String,
    required: true,
  },

  github: {
    type: String,
    required: true,
  },

  // Optional Fields
  projectRepo: {
    type: String,
    default: "",
  },

  st1Repo: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

export default User;