import { GoogleGenAI, Modality } from "@google/genai";
import { STYLE_PROMPT, CHARACTERS } from '../constants';
import { CharacterId } from '../types';

const apiKey = process.env.API_KEY || '';

const getClient = () => {
  if (!apiKey) throw new Error("API_KEY is missing");
  return new GoogleGenAI({ apiKey });
};

export const generateSceneBackground = async (description: string): Promise<string | null> => {
  if (!description) return null;
  
  try {
    const ai = getClient();
    // Enforce 16:9 cinematic aspect ratio
    const prompt = `${description}. ${STYLE_PROMPT}. No text, no characters, scenery only, cinematic lighting, 4k, highly detailed background art.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    if (part && part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (e) {
    console.error("Background Gen Error:", e);
    return null;
  }
};

export const generateCharacterSprite = async (charId: CharacterId, emotion: string): Promise<string | null> => {
  if (!charId || charId === CharacterId.NARRATOR || charId === CharacterId.UNKNOWN) return null;
  const character = CHARACTERS[charId];
  if (!character) return null;

  try {
    const ai = getClient();
    // Prompt designed for easy cutout or overlay usage. White background.
    const prompt = `Full body character design of ${character.visualPrompt}. Emotion: ${emotion}. ${STYLE_PROMPT}. Isolated on plain white background, front view, visual novel tachie style, high resolution.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];
    if (part && part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (e) {
    console.error("Character Gen Error:", e);
    return null;
  }
};

export const getSceneInsight = async (text: string, speakerName: string): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      Context: Neon Genesis Evangelion fan visual novel.
      Current Speaker: ${speakerName}
      Dialogue: "${text}"
      
      Task: Provide a MAGI System psychological analysis of the current situation. 
      Style: Scientific, mysterious, slightly ominous, using Evangelion terminology (AT Field, Hedgehog's Dilemma, synchronization ratio).
      Length: Under 50 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response needed
      }
    });

    return response.text || "MAGI SYSTEM: DATA CORRUPTED.";
  } catch (e) {
    console.error("Insight Error:", e);
    return "MAGI SYSTEM: OFFLINE.";
  }
};
