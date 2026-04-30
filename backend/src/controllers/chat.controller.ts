import { Request, Response } from "express";
import axios from "axios";

export async function userchat(req: Request, res: Response) {
  try {
    const { role, content } = req.body;

    type messagetype = {
      role: string;
      content: string;
    };
    
    type payloadtype = {
      model: string;
      messages: messagetype[];
    };

    const payload: payloadtype = {
      model: "stepfun/step-3.5-flash",
      messages: [
        {
          role: "system",
          content: `Always format responses using Markdown:
- Use headings
- Use bullet points
- Use numbered lists
- Use tables for comparisons
- Use code blocks for commands
- Keep paragraphs short`,
        },
        {
          role,
          content,
        },
      ],
    };

    const start = Date.now();
    
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", payload, {
      headers: {
        Authorization: `Bearer ${process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY}`,
      },
    });

    const diff = ((Date.now() - start) / 1000).toFixed(1);
    const timeinms = diff + "s";
    const apiresponse = {
      model: response.data.model.split(":free")[0],
      timetaken: timeinms,
      content: response.data.choices[0].message.content,
    };
    
    res.status(200).json({
      success: true,
      data: apiresponse,
    });
  } catch (error: any) {
    console.error("Error calling OpenRouter API:", error?.response?.data || error);
    res.status(502).json({
      success: false,
      message: error?.response?.data?.error?.message || error?.message || "Something went wrong, please try again.",
    });
  }
}
