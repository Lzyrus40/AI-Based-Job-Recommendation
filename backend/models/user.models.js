import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
        min: 0,
    },
    skills: {
        type: [String], 
        required: true,
    },
    preferredJobType: {
        type: String,
        enum: ['remote', 'onsite', 'any'],
        default: 'any',
        required: true,
    },
}, {
    timestamps: true,
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
