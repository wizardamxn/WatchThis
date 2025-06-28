import OpenAI from 'openai';

const OPEN_AI_KEY = import.meta.env.VITE_OPENAI_GPT_KEY

const openai = new OpenAI({
  apiKey: OPEN_AI_KEY, // This is the default and can be omitted
  dangerouslyAllowBrowser: true
});


export default openai