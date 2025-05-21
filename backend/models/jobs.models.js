import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  skills: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'At least one skill is required.',
    },
  },
  type: {
    type: String,
    enum: ['remote', 'onsite', 'any'],
    required: true,
    lowercase: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d+$/.test(v),
      message: 'Experience should be a number in string format.',
    },
  },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
