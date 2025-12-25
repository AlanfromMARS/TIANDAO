
export const getDeepSeekResponse = async (history: { role: string; content: string }[]) => {
  const apiKey = process.env.API_KEY;
  const baseUrl = "https://api.deepseek.com/chat/completions";

  if (!apiKey) {
    throw new Error("API Key not found in environment variable 'API_KEY'.");
  }

  const systemMessage = {
    role: "system",
    content: `You are the "Grand Strategist of Tao" (道家战略架构师) & Risk Control Expert. 
    Your role is to guide the user through a multi-phase life strategy simulation using the "Dialectical-Flow" framework.
    CORE PHILOSOPHY: Way of Man (损不足奉有余) vs Way of Heaven (损有余补不足).
    Always start your response with " >_ [人生战略推演] | [DeepSeek-Flow] | [v2.0] ".`
  };

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [systemMessage, ...history],
      stream: false
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `DeepSeek API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
