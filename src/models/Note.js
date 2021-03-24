//import { Schema, model } from "mongoose";
import mongoose from "mongoose";
//const { Schema, model } = require('mongoose');

const NoteSchema = new mongoose.Schema( //que voy a guardar
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", NoteSchema, "notes"); //pasa el nombre y el modelo 
