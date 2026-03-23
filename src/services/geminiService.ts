/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { InjuryAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeInjury(base64Image: string): Promise<InjuryAnalysis> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `Analyze this image of a minor injury (cut, burn, bruise, swelling). 
  Provide the following in JSON format:
  - type: The type of injury.
  - severity: 'low', 'medium', or 'high'.
  - guidance: Basic first aid instructions.
  - warning: A warning message if the injury looks serious (e.g., "Consult a doctor immediately").
  
  If the injury is severe, set severity to 'high' and provide a strong warning.
  Always include "Consult a doctor if pain persists or worsens." in the guidance.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { text: prompt },
        { inlineData: { mimeType: "image/jpeg", data: base64Image } }
      ]
    },
    config: {
      responseMimeType: "application/json",
    }
  });

  try {
    return JSON.parse(response.text || "{}") as InjuryAnalysis;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return {
      type: "Unknown",
      severity: "medium",
      guidance: "Clean the area and monitor for changes. Consult a doctor if unsure.",
      warning: "Consult a doctor for accurate diagnosis."
    };
  }
}

export async function getDailyHealthTip(): Promise<{ title: string; content: string }> {
  const model = "gemini-3-flash-preview";
  const prompt = "Provide a short, daily health tip for a mobile app. Return as JSON with 'title' and 'content'.";
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return {
      title: "Stay Hydrated",
      content: "Drink at least 8 glasses of water a day to keep your body functioning optimally."
    };
  }
}
