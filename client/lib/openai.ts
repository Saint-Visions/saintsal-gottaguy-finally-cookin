import OpenAI from "openai";

// Client-side OpenAI instance
let openai: OpenAI | null = null;

export const getOpenAI = () => {
  if (!openai) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";
    if (!apiKey) {
      throw new Error("OpenAI API key not found");
    }
    openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true, // Client-side support
    });
  }
  return openai;
};

export default getOpenAI;
