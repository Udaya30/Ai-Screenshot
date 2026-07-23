const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

type ResultType = {
  explanation: string;
  issue: string;
  solution: string;
};

export const analyzeImage = async (image: File): Promise<ResultType> => {
  try {
    const base64 = await fileToBase64(image);
    const api = import.meta.env.VITE_API_URL;
    const res = await fetch(api, {
      method: "POST",
      headers: {
        ...(OPENROUTER_API_KEY
          ? { Authorization: `Bearer ${OPENROUTER_API_KEY}` }
          : {}),
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", // optional
        "X-Title": "AI Image Analyzer"
      },
      body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Return ONLY JSON:
        {
          "explanation": "...",
          "issue": "...",
          "solution": "..."
        }`
        },
        {
          type: "image_url",
          image_url: {
            url: `data:${image.type};base64,${base64}`
          }
        }
      ]
    }
  ]
})
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Analyze request failed");
    }

    if (data?.explanation && data?.issue && data?.solution) {
      return {
        explanation: data.explanation,
        issue: data.issue,
        solution: data.solution,
      };
    }

    const text = data?.reply ?? data?.choices?.[0]?.message?.content;

    const cleaned = text
      ?.replace(/```json/g, "")
      ?.replace(/```/g, "")
      ?.trim();

    return JSON.parse(cleaned || "{}");

  } catch (err) {
    console.error("API ERROR:", err);

    return {
      explanation: "Error analyzing image",
      issue: "API failed",
      solution: "Check console"
    };
  }
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
  });