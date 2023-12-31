import { useEffect, useState } from "react";
import OpenAI from "openai";
import { itinerarySchema } from "@/utility/openAiUtility";

// console.log(process.env.NEXT_PUBLIC_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true,
});
console.log(openai);

const OpenAIComponent = ({
  userPrompt,
}: {
  userPrompt: { place: string; days: number };
}) => {
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState<any>(null);

  // Define the itinerary schema

  const getItinerary = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful travel assistant. You create custom itineraries for clients based on their specified destination, duration, and preferences.",
          },
          {
            role: "user",
            content: `return an itinerary for ${userPrompt.place} for ${userPrompt.days}`,
          },
        ],
        functions: [{ name: "get_itinerary", parameters: itinerarySchema }],
        function_call: { name: "get_itinerary" },
      });

      if (completion.choices[0].message.function_call?.arguments) {
        const response = JSON.parse(
          completion.choices[0].message.function_call?.arguments
        );
        setItinerary(response);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setLoading(false);
    }
  };

  //   getItinerary();

  console.log(itinerary);

  return null;
};

export default OpenAIComponent;
