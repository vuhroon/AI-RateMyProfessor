"use client";
import reviews from "../../reviews.json";
import { Box, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

//gemini embedding model
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see our Getting Started tutorial)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Rate My Professor AI Chatbot!",
    },
  ]);

  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    console.log("messages: ", messages);
    setMessage("");

    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: false,
        });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });

        return reader.read().then(processText);
      });
    });
  };

  return (
    <div>
      <div className="flex w-full max-w-lg m-auto flex-col">

        <div className="flex w-full flex-col mt-12 overflow-scroll h-[80vh]">
          {messages.map((message, index) => {
            
            if(message.role === 'assistant'){
              return(
                <div className="flex w-full justify-start mb-5">
                    <div className="p-5 bg-green-200 max-w-[50%] text-black">
                      {message.content}
                    </div>
                </div>
              )
            }else if(message.role === 'user'){
              return(
                <div className="flex w-full justify-end mb-5">
                  <div className="p-5 bg-blue-200 max-w-[50%] text-black">
                    {message.content}
                  </div>
                </div>
              )
            }
        })}
        </div>
        <Input
            name="rmp-textarea"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            placeholder="SEARCH "
          />
          <Button
            onClick={() => {
              sendMessage();
            }}
            type="submit"
          >
            Submit
          </Button>
      </div>
    </div>
  );
}
