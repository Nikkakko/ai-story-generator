import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/session";
import db from "@/lib/db/db";

export async function getUser() {
  const sessionCookie = cookies().get("session");
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== "string"
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db.user.findMany({
    where: {
      id: sessionData.user.id,
      deletedAt: null,
    },
    take: 1,
  });

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getStory(slug: string) {
  try {
    const story = await db.story.findUnique({
      where: {
        slug,
      },
      include: {
        user: true,
      },
    });

    return story;
  } catch (error) {
    console.error("Error getting story", error);
    return null;
  }
}

export async function getStories() {
  try {
    const stories = await db.story.findMany({
      include: {
        user: true,
      },
    });

    return stories;
  } catch (error) {
    console.error("Error getting stories", error);
  }
}
