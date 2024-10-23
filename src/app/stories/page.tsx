import * as React from "react";
import { getStories } from "@/lib/db/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface StoriesPageProps {}

const StoriesPage: React.FC<StoriesPageProps> = async ({}) => {
  const stories = await getStories();

  if (!stories || stories.length === 0)
    return (
      <main className="container mx-auto text-center py-20">
        <p className="text-center text-gray-600 text-lg">No stories found.</p>
        <p className="text-center text-gray-600 text-lg">
          Be the first to create one! 🚀
        </p>
        <Link
          href="/create"
          className={cn(buttonVariants({ variant: "default" }), "mt-4")}
        >
          Create a Story
        </Link>
      </main>
    );

  return (
    <main className="container mx-auto px-4 lg:px-0 py-10">
      <h1 className="text-4xl font-bold text-center">Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {stories?.map(story => {
          return (
            <Card key={story.id}>
              <CardHeader>
                {story.imageUrl && (
                  <Image
                    src={story.imageUrl}
                    alt="Story Image"
                    width={400}
                    height={200}
                    className="rounded-t-md"
                  />
                )}
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {story.content.slice(0, 100)}...
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <p>By {story.user.name}</p>
                <Link
                  href={`/stories/${story.slug}`}
                  className="flex items-center gap-2 hover:underline transition-all"
                >
                  Read More
                  <ArrowRight size={24} />
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default StoriesPage;
