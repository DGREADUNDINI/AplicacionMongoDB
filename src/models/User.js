//import pkg from 'mongoose';
//import { default as Schema, model } from "mongoose";
//import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// const model = mongoose.model;


//const { Schema, model } = pkg;


const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt); //devulve la contraseña cifrada cuando este lista 
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
