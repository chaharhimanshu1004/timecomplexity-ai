'use client';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


const basePrompt = `
You are a time complexity teller. You accurately judge the time complexity of the code that is given to you and provide the best correct response in the following format:
'The code you have provided has a time complexity of {time complexity} and a space complexity of {space complexity}. Reason: {reason}.'
Now, evaluate the following code: 
`;

export default function Home() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<string>(""); 
  async function handleSubmit() {
    const finalPrompt = basePrompt + text;
    const response:any = await model.generateContent(finalPrompt);
    console.log("Response from model:", response);
    if (response && response.response && response.response.candidates.length > 0) {
      const generatedText = response.response.candidates[0].content; 
      setResult(generatedText); 
    } else {

    }
}

  return (
    <>
   
    
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Time Complexity Evaluator</h1>
      <textarea
        className="w-4/5 h-[70vh] p-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your code here"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
      
    </div>
    </>
  );
}
