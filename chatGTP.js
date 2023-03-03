const { Configuration, OpenAIApi } = require("openai");
const Common = require("./lib/common");

async function createCompletionChatGTP({ message, api_key }) {
  api_key = await Common.decrypt(api_key);
  let configuration = new Configuration({
    apiKey: api_key,
  });
  let openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 2048,
    temperature: 0,
  });
  
  return response;
}

module.exports = { createCompletionChatGTP };
