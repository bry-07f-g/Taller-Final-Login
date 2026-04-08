//Aqui capturamos los valores

import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

//y luego exportamos estos mismos

export default model("User", userSchema);