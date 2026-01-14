
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateProductDescription(productName: string, category: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escreva uma descrição atraente e curta (máximo 150 caracteres) para uma loja online em Moçambique. O produto é: ${productName} na categoria ${category}. Use gírias locais leves se for roupa, ou foco em benefício se for eletrodoméstico.`,
    });
    return response.text?.trim() || "Descrição não disponível.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Descrição gerada automaticamente com qualidade.";
  }
}
