"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { storyGenerationSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ageGroupOptions,
  imageStyleOptions,
  selectAgeGroupOptions,
  selectImageStyleOptions,
  selectStoryOptions,
  storyTypeOptions,
} from "@/siteData";
import Image from "next/image";
import { generateStory } from "@/lib/actions/generate-story";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CreateStoryFormProps {}

const CreateStoryForm: React.FC<CreateStoryFormProps> = () => {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof storyGenerationSchema>>({
    resolver: zodResolver(storyGenerationSchema),
    defaultValues: {
      content: "",
      ageGroup: undefined,
      storyType: undefined,
      imageStyle: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof storyGenerationSchema>) {
    startTransition(async () => {
      const newStory = await generateStory(values);
      if (newStory.error) {
        toast({
          title: "Error",
          description: newStory.error,
        });
      }
      router.push(`/stories/${newStory.slug}`);
    });
  }

  const isDisabled = isPending || form.formState.isSubmitting;

  type RadioGroupWithImagesProps = {
    options: storyTypeOptions[] | ageGroupOptions[] | imageStyleOptions[];
  } & React.ComponentProps<typeof RadioGroup>;

  const RadioGroupWithImages = ({
    options,
    ...props
  }: RadioGroupWithImagesProps) => (
    <RadioGroup
      {...props}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
    >
      {options.map(option => (
        <FormItem key={option.value}>
          <FormLabel className="[&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div>img]:filter-none">
            <FormControl>
              <RadioGroupItem value={option.value} className="sr-only" />
            </FormControl>
            <div className="relative rounded-md border-2 border-muted p-2 hover:border-accent cursor-pointer">
              <Image
                src={option.imageUrl}
                alt={option.label}
                width={268}
                height={268}
                className="aspect-square object-cover rounded-md mb-2 w-full hover:opacity-80 grayscale transition-all duration-200"
                quality={100}
              />
              <span className="block w-full text-center text-sm font-medium">
                {option.label}
              </span>
            </div>
          </FormLabel>
        </FormItem>
      ))}
    </RadioGroup>
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-4xl w-full mx-auto"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Subject of the story <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us your story..."
                  rows={8}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storyType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Story Type <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroupWithImages
                  options={selectStoryOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ageGroup"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Age Group <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroupWithImages
                  options={selectAgeGroupOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageStyle"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Image Style <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroupWithImages
                  options={selectImageStyleOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isDisabled}>
          {isPending ? "Creating..." : "Create Story"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateStoryForm;
