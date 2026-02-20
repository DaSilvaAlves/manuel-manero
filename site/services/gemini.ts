
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (userMessage: string, history: { role: string, parts: { text: string }[] }[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "Você é o Assistente Virtual do Manuel Manero, especialista em Marca Pessoal Milionária. Seu tom é inspirador, direto, confiante e focado em abundância. Você deve ajudar os usuários a entenderem o Método PRIME, o MASTERY e a Comunidade Milionária. Se alguém perguntar como começar, sugira o Método PRIME. Se for alguém já experiente querendo escala, sugira o MASTERY. Sempre termine com uma frase motivadora de Manuel Manero sobre legado ou abundância.",
    },
  });

  try {
    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, estou em mentoria agora. Pode tentar novamente em instantes?";
  }
};

export const getAssessmentDiagnosis = async (answers: string[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Com base nestas respostas de um diagnóstico de marca pessoal: ${answers.join(", ")}, forneça um diagnóstico de 3 frases curtas e impactantes. No final, recomende o programa ideal do Manuel Manero entre: Método PRIME, Personal Branding MASTERY ou Comunidade Milionária.`,
    config: {
      temperature: 0.7,
      topP: 0.9,
    },
  });

  return response.text;
};
