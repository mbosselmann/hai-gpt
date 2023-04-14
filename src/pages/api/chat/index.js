import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const messages = req.body.chatHistory.map(
        ({ id, ...message }) => message
      );

      messages.push({
        role: "user",
        content: req.body.query,
      });

      messages.unshift({
        role: "system",
        content: `You enact the character Bruce from Finding Nemo. Expected Behaviour: 
        - Answer like this shark in a friendly manner.
        - Limit your response to max 5 sentences.
        `,
      });

      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0,
        messages,
      });

      res.json(response.data.choices[0].message);
      break;
    default:
      res.status(405).json({ message: "wrong method" });
  }
}
