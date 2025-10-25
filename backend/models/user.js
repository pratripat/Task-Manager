import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true }, // Lucia needs this as the user ID
        email: {
            type: String,
            minlength: 5,
            maxlength: 255,
            unique: true,
            required: true
        },
        password: {
            type: String,
            minlength: 5,
            maxlength: 1024,
            required: true
        }
    },
    { _id: false } // very important! Lucia uses string IDs, not ObjectIDs
);

export const User = mongoose.model('User', userSchema);

export function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

