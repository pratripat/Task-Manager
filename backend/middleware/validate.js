export function validate(validator) {
    return (req, res, next) => {
        const { error } = validator(req.body);
        if (error) {
            console.log('Validation error', error.details[0].message)
            return res.status(400).json(error.details[0].message);
        }
        next();
    }
}