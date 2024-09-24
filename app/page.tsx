'use client'
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
}  from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const prompt = "Write a story about a magic backpack.";


export default function Home() {
  return (
    <div>
      Hello
    </div>
  );
}
