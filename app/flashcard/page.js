"use client";
import { useState } from "react";
import React from "react";
import CardList, { skeleton, skeletonLoad } from "@/components/ui/CardList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const isToggled = false;

function flip(backofcard) {
  alert(backofcard);
}

export default function flashcard() {
  const [loading, setloading] = useState(false);
  const [topic, setTopic] = useState("");
  const [ai_result, set_ai_result] = useState([]);
  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "generate concise information for display on flashcards. Total of 5 flash cards",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  async function run() {
    console.log("run triggered");
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
    setloading(true);
    const result = await chatSession.sendMessage(`${topic}`);
    set_ai_result(
      JSON.parse(result.response.candidates[0].content.parts[0].text)
    );
    setloading(false);
  }

  // run();
  // console.log({ topic });

  return (
    <div>
      <div>
        {loading ? (
          <Skeleton className="w-full h-[500px] " />
        ) : (
          <CardList data={ai_result} />
        )}
      </div>
      <div className="flex w-full max-w-sm m-auto ">
        <Input
          type="email"
          placeholder="Choose a Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button onClick={run} type="submit">
          Generate
        </Button>
      </div>
    </div>
  );
}
