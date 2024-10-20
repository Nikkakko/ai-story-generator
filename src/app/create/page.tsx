import CreateStoryForm from "@/components/CreateStoryForm";
import * as React from "react";

interface CreateStoryPageProps {}

const CreateStoryPage: React.FC<CreateStoryPageProps> = ({}) => {
  return (
    <main className="container mx-auto py-20">
      <div className="flex flex-col gap-2 text-center items-center max-w-fit mx-auto">
        <h1 className="text-5xl font-bold text-primary uppercase  ">
          create your story
        </h1>
        <p className="text-center text-lg text-foreground max-w-md text-violet-300 ">
          Unlock your creativity with AI: Craft stories like never before! let
          your imagination run wild and create stories that are unique to you.
        </p>
      </div>
      <section className="mt-10">
        <CreateStoryForm />
      </section>
    </main>
  );
};

export default CreateStoryPage;
