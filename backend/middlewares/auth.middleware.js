import { body} from 'express-validator';
export const validateRegistration = [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters and include a number and a capital letter')
        .isLength({ min: 8 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    body('location', 'Location is required').notEmpty(),
    body('yearsOfExperience', 'Years of experience must be a number').isInt({ min: 0 }),
    body('skills', 'Skills must be an array of strings').isArray({ min: 1 }),
    body('preferredJobType', 'Invalid job type').isIn(['remote', 'onsite', 'any']),
];

export const validateLogin = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
];