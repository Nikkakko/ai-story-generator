"use server";

import OpenAI from "openai";
import { storyGenerationSchema } from "@/lib/validation";
import * as z from "zod";
import db from "@/lib/db/db";
import { getUser } from "../db/queries";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

import { slugify } from "../utils";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemContent = `You are a creative storyteller capable of crafting engaging tales for various age groups and in different styles. Your task is to generate a story based on the given prompt, considering the following aspects:

1. Story Type: Adapt your narrative style to match the requested genre (e.g., story book, bed time story, educational).
2. Age Group: Ensure the content and complexity are appropriate for the specified audience.
3. Image Style: Incorporate descriptive elements that would complement the given illustration style.

Your story should be coherent, imaginative, and tailored to the provided parameters. Include vivid descriptions, engaging dialogue, and a clear narrative arc with a beginning, middle, and end.`;

export async function generateStory(
  values: z.infer<typeof storyGenerationSchema>
) {
  try {
    const validValues = storyGenerationSchema.safeParse(values);
    if (!validValues.success) {
      console.error("Validation error:", validValues.error);
      return { error: "Invalid input values" };
    }

    const currentUser = await getUser();
    if (!currentUser) {
      return { error: "User not authenticated" };
    }

    const prompt = generatePrompt(validValues.data);

    const [completion, imageResponse] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: prompt },
        ],
        max_tokens: 1000,
        temperature: 0.6,
      }),
      openai.images.generate({
        model: "dall-e-2",
        prompt: `A ${validValues.data.imageStyle} illustration for a ${validValues.data.storyType} story about ${validValues.data.content} suitable for ${validValues.data.ageGroup} children.`,
        n: 1,
        size: "512x512",
      }),
    ]);

    const chatResponse = completion.choices[0].message.content;
    const image_url = imageResponse.data[0].url;

    if (!image_url || !chatResponse) {
      return {
        error: "An error occurred while generating the story",
      };
    }

    const storySlug = slugify(
      `${validValues.data.storyType}-${validValues.data.ageGroup}-${
        validValues.data.imageStyle
      }-${Date.now()}`
    );

    const uploadedFile = await utapi.uploadFilesFromUrl(image_url);

    if (!uploadedFile) {
      return {
        error: "An error occurred while uploading the image",
      };
    }

    await db.story.create({
      data: {
        content: chatResponse,
        userId: currentUser.id,
        imageUrl: uploadedFile.data?.url,
        ageGroup: validValues.data.ageGroup,
        storyType: validValues.data.storyType,
        imageStyle: validValues.data.imageStyle,
        slug: storySlug,
      },
    });

    return {
      success: "Story generated successfully",
      slug: storySlug,
    };
  } catch (error) {
    console.error("Error generating story:", error);
    return { error: "An error occurred while generating the story" };
  }
}

function generatePrompt(values: z.infer<typeof storyGenerationSchema>) {
  return `Write a ${values.storyType} story for ${values.ageGroup} about ${values.content}. The story should be written in a style that complements ${values.imageStyle} illustrations.`;
}
