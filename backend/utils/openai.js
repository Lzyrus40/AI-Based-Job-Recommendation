import { OpenAI } from "openai";
import dotenv from 'dotenv';
dotenv.config();

export const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY, 
});
