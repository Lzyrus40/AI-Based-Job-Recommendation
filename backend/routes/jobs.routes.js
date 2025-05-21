import express from 'express';
import { getAllJobs, recommendedjobs } from '../controllers/jobs.controllers.js';
import {fetchuser} from '../middlewares/fetchuser.js'
const jobRouter = express.Router();

jobRouter.get('/alljobs', getAllJobs);
jobRouter.get('/recommendedjobs', fetchuser, recommendedjobs);

export default jobRouter;