import { storyGenerationSchema } from "./lib/validation";
import { z } from "zod";

export interface storyTypeOptions {
  value: z.infer<typeof storyGenerationSchema>["storyType"];
  label: string;
  imageUrl: string;
}

export interface ageGroupOptions {
  value: z.infer<typeof storyGenerationSchema>["ageGroup"];
  label: string;
  imageUrl: string;
}

export interface imageStyleOptions {
  value: z.infer<typeof storyGenerationSchema>["imageStyle"];
  label: string;
  imageUrl: string;
}

export const menuList = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Create Story",
    href: "/create",
  },
  {
    name: "Explore Story",
    href: "/stories",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

export const selectStoryOptions: storyTypeOptions[] = [
  { value: "STORY_BOOK", label: "Story Book", imageUrl: "/assets/story.png" },

  {
    value: "BED_TIME_STORY",
    label: "Bed Time Story",
    imageUrl: "/assets/bedstory.png",
  },
  {
    value: "EDUCATIONAL",
    label: "Educational",
    imageUrl: "/assets/educational.png",
  },
];

export const selectAgeGroupOptions: ageGroupOptions[] = [
  { value: "ZERO_TO_TWO", label: "0-2", imageUrl: "/assets/02Years.png" },
  { value: "THREE_TO_FIVE", label: "3-5", imageUrl: "/assets/35Years.png" },
  { value: "SIX_TO_EIGHT", label: "6-8", imageUrl: "/assets/58Years.png" },
];

export const selectImageStyleOptions: imageStyleOptions[] = [
  { value: "CARTOON", label: "Cartoon", imageUrl: "/assets/3D.png" },

  { value: "PAPER_CUT", label: "Paper Cut", imageUrl: "/assets/paperCut.png" },

  {
    value: "WATER_COLOR",
    label: "Watercolor",
    imageUrl: "/assets/watercolor.png",
  },
];
