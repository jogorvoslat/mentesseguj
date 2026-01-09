import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequest {
  message: string;
  prompt_id?: string;
  user_id?: string;
}

async function getSystemPrompt(user_id: string, prompt_id: string): Promise<string | null> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("system_prompts")
      .select("content")
      .eq("id", prompt_id)
      .eq("user_id", user_id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching system prompt:", error);
      return null;
    }

    return data?.content || null;
  } catch (error) {
    console.error("Error in getSystemPrompt:", error);
    return null;
  }
}

async function callGeminiAPI(message: string, systemPrompt?: string, retryCount = 0): Promise<string> {
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  const model = "gemini-3-flash-preview";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const contents = [];

  if (systemPrompt) {
    contents.push({
      role: "user",
      parts: [
        {
          text: systemPrompt,
        },
      ],
    });
    contents.push({
      role: "model",
      parts: [
        {
          text: "I understand. I'll follow these instructions.",
        },
      ],
    });
  }

  contents.push({
    role: "user",
    parts: [
      {
        text: message,
      },
    ],
  });

  const requestBody = {
    contents,
    generationConfig: {
      thinkingConfig: {
        thinkingLevel: "HIGH",
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error (${response.status}):`, errorText);

      if (response.status === 502 && retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return callGeminiAPI(message, systemPrompt, retryCount + 1);
      }

      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts) {
      let fullResponse = "";
      for (const part of data.candidates[0].content.parts) {
        if (part.text) {
          fullResponse += part.text;
        }
      }
      return fullResponse;
    }

    throw new Error("Unexpected API response format");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { message, prompt_id, user_id }: ChatRequest = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid input: message is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    let systemPrompt: string | undefined;
    if (prompt_id && user_id) {
      const fetchedPrompt = await getSystemPrompt(user_id, prompt_id);
      if (fetchedPrompt) {
        systemPrompt = fetchedPrompt;
      }
    }

    const response = await callGeminiAPI(message, systemPrompt);

    return new Response(JSON.stringify({ output: response }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
