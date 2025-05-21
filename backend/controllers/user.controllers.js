import User from '../models/user.models.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrationUser = async (req, res) => {
    let success = false;

    // Validate input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const {
        name,
        email,
        password,
        location,
        yearsOfExperience,
        skills,
        preferredJobType
    } = req.body;

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success, error: "A user with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            location,
            yearsOfExperience,
            skills: Array.isArray(skills) ? skills : [skills], // Ensure skills is array
            preferredJobType
        });

        // Create JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret');

        success = true;
        res.set("auth-token", authtoken);
        res.status(201).json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

export const loginUser = async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.set("auth-token", authtoken);
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};