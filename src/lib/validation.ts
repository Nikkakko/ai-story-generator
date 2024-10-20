import { AgeGroup, ImageStyle, StoryType } from "@prisma/client";
import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const storyGenerationSchema = z.object({
  content: z.string().min(10),
  storyType: z.nativeEnum(StoryType),
  ageGroup: z.nativeEnum(AgeGroup),
  imageStyle: z.nativeEnum(ImageStyle),
});
