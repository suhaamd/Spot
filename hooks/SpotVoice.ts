import { useState } from 'react';
import * as Speech from 'expo-speech';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

const SPOT_SYSTEM_PROMPT = `You are Spot, an AI gym buddy built into a smart fitness band. You talk like a knowledgeable friend who actually lifts — casual, direct, no corporate tone. You know the user's current workout, their form scores, and their history. You hype them up when they're doing well and call them out when their form slips. Keep responses short — the user is mid workout. Never say more than 3 sentences unless they ask a detailed question. If they ask random stuff just answer like a normal person would. No emojis, no bullet points, just talk.`;

interface SessionContext {
  exercise: string;
  formScore: string;
  setNumber: number;
  totalSets: number;
  calories: number;
  duration: string;
}

export function useSpotVoice(context?: SessionContext) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  async function askSpot(userMessage: string = "How am I doing?") {
    setIsThinking(true);

    let contextMessage = '';
    if (context && typeof context === 'object') {
      contextMessage = `Current session context: Exercise: ${context.exercise ?? 'Unknown'}, Form: ${context.formScore ?? 'Unknown'}, Set: ${context.setNumber ?? 1} of ${context.totalSets ?? 3}, Calories burned: ${context.calories ?? 0}, Duration: ${context.duration ?? '00:00:00'}. `;
    }

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SPOT_SYSTEM_PROMPT },
            { role: 'user', content: contextMessage + userMessage },
          ],
          max_tokens: 150,
          temperature: 0.8,
        }),
      });

      const data = await response.json();

      if (!data.choices || !data.choices[0]) {
        setIsThinking(false);
        return null;
      }

      const spotReply = data.choices[0].message.content;

      setIsThinking(false);
      setIsSpeaking(true);

      Speech.speak(spotReply, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.95,
        onDone: () => setIsSpeaking(false),
      });

      return spotReply;

    } catch (error) {
      setIsThinking(false);
      console.error('Spot voice error:', error);
      return null;
    }
  }

  function stopSpeaking() {
    Speech.stop();
    setIsSpeaking(false);
  }

  return { askSpot, isSpeaking, isThinking, stopSpeaking };
}