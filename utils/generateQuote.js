import OpenAI from "openai";
import { createCanvas, loadImage } from "canvas"; // Ensure you have canvas installed
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate an image based on the blog title
export const generateImage = async (title) => {
  try {
    const prompt = `
      A hyper-realistic, high-resolution photograph capturing the scene titled "${title}". 
      The photo should include natural lighting with shadows and reflections, sharp focus on key elements, 
      and depth-of-field that blurs the background for added realism. The image should look as if taken by 
      a professional DSLR camera, with attention to textures, lighting effects, and lifelike details that make 
      the environment feel tangible and authentic. The setting should include environmental details based on the scene, 
      such as the time of day, specific weather conditions, and ambient background elements like people, vehicles, or landscapes.
    `;
    const imageResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    return imageResponse.data[0].url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate an image.");
  }
};
// Generate blog title, subtitle, and content based on the user-provided title
export const generateBlogTitleSubtitleAndContent = async (userTitle) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `
            You are an AI blogging assistant. Generate a blog with the following structure:
            1. A catchy blog title based on the user-provided title: "${userTitle}".
            2. A relevant and engaging subtitle.
            3. A detailed, engaging blog message that includes an introduction, multiple sections in the body, and a conclusion.
            Make sure the content is informative and structured well.
            Ensure the blog content is relevant to the provided title: "${userTitle}".
            Provide the result in a structured format with sections for "Title", "Subtitle", and "Message".
          `,
        },
      ],
    });

    // Extract content from the completion
    const responseText = completion.choices[0].message.content;

    // Use regex or string parsing to separate the title, subtitle, and message from the response
    const titleMatch = responseText.match(/Title:\s*(.*)/);
    const subtitleMatch = responseText.match(/Subtitle:\s*(.*)/);
    const messageMatch = responseText.match(/Message:\s*([\s\S]*)/);

    // Extract the matched content
    const blogData = {
      title: titleMatch ? titleMatch[1].trim() : "No Title Found",
      subtitle: subtitleMatch ? subtitleMatch[1].trim() : "No Subtitle Found",
      message: messageMatch ? messageMatch[1].trim() : "No Message Found",
    };

    console.log("Generated Blog:", blogData);

    return blogData;
  } catch (error) {
    console.error("Error generating blog content:", error);
    throw new Error("Failed to generate blog content.");
  }
};
