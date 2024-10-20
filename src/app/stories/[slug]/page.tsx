import { getStory } from "@/lib/db/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as React from "react";

interface StoriesSlugPageProps {
  params: {
    slug: string;
  };
}

const StoriesSlugPage: React.FC<StoriesSlugPageProps> = async ({
  params: { slug },
}) => {
  const story = await getStory(slug);

  if (!story) notFound();

  return (
    <main className="container mx-auto">
      {story.imageUrl && (
        <Image
          src={story.imageUrl}
          alt="Story Image"
          width={400}
          height={400}
        />
      )}
    </main>
  );
};

export default StoriesSlugPage;
