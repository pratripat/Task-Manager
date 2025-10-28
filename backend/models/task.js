import mongoose from 'mongoose';
import Joi from 'joi';

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            minlength: 5,
            maxlength: 255,
            required: true
        },
        priority: {
            type: String,
            required: true,
            enum: ['HIGH', 'MED', 'LOW']
        },
        status: {
            type: String,
            required: true,
            enum: ['To Do', 'In Progress', 'Finished']
        },
        description: {
            type: String,
            minlength: 10,
            maxlength: 500,
        },
        dueDate: {
            type: Date,
            required: true,
            default: () => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                return tomorrow;
            }
        },
        createdDate: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
)

export const Task = mongoose.model('Task', taskSchema);

export function validateTask(task) {
    console.log(task);

    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        priority: Joi.string().required(),
        status: Joi.string().required(),
        description: Joi.string().min(10).max(500).required(),
        dueDate: Joi.date()
            .required()
            .custom((value, helpers) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Start of today

                const inputDate = new Date(value);
                inputDate.setHours(0, 0, 0, 0); // Start of input date

                if (inputDate < today) {
                    return helpers.error('date.min');
                }

                return value;
            })
            .messages({
                'date.base': 'Due date must be a valid date',
                'date.min': 'Due date cannot be in the past',
                'any.required': 'Due date is required'
            }),
        createdDate: Joi.date()
    });

    return schema.validate(task);
}