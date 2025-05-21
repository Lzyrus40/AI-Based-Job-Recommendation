import Job from "../models/jobs.models.js";
import User from "../models/user.models.js";
import { openai } from "../utils/openai.js";

export const getAllJobs = async (req, res) => {
    // Get all jobs from the database with pagination
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const jobs = await Job.find().skip(skip).limit(limit);
        const totalJobs = await Job.countDocuments();
        res.status(200).json({
            success: true,
            jobs,
            totalJobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: page
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

export const recommendedjobs = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const jobposts = await Job.find();

        const prompt = `
        USER PROFILE:
        - Experience: ${user.yearsOfExperience} years
        - Preferred job type: ${user.preferredJobType}
        - Skills: ${user.skills.join(", ")}
        
        JOB LISTINGS:
        ${JSON.stringify(jobposts, null, 2)}

        TASK:
        1. Filter jobs where:
           - Experience is between ${user.yearsOfExperience - 2} and ${user.yearsOfExperience + 2} years
           - Job type is "${user.preferredJobType}" OR "any"
        2. Sort by:
           - Highest skill overlap with user
           - Closest experience match
           - Type preference match
        3. Select top 3 matches
        4. Return EXACTLY 3 jobs in this format:
        {
          "recommendations": [
            {/* full original job object 1 */},
            {/* full original job object 2 */},
            {/* full original job object 3 */}
          ]
        }`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: `You are a job matching engine. Return PRECISE JSON containing 3 job objects from the provided list. 
                    Maintain EXACT field names and structure from the original jobs. Never modify any values.`
                },
                { role: "user", content: prompt }
            ],
        });

        const result = JSON.parse(completion.choices[0].message.content);
        // const recommendations = result.recommendations.slice(0, 3);
        console.log(result.recommendations);
        const transformed = result.recommendations.map(job => ({
            title: job.title,
            skills: job.skills,
            type: job.type,
            location: job.location,
            experience: job.experience
        }));

        console.log("Recommendations generated successfully");
        res.json(transformed);

    } catch (error) {
        console.error('Recommendation error:', error);
        res.status(500).json({ message: 'Failed to generate recommendations' });
    }
};