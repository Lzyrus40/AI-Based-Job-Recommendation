# 🧠 AI-Based Job Recommendation Web App

This is a full-stack job recommendation app that uses OpenAI's API to suggest jobs based on user profiles.

---

## 🚀 Tech Stack

- **Frontend:** React (Nextjs), Tailwind CSS  
- **Backend:** Node.js, Express.js, OpenAI API, Mongoose


### 📦 Install Dependencies

```bash
cd backend
npm install
node server

cd ../job-portal
npm install
npm run dev

### 🤖 How AI Job Recommendation Works
The backend receives user profile data and job listings, then crafts a prompt combining both. This prompt is sent to OpenAI's API, asking it to analyze the match between the user and available jobs. The AI responds with recommended jobs, which the backend forwards to the frontend for display.

### 🧑‍💻 Author
Made with ❤️ by Love Khandelwal
