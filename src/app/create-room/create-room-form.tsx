"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CreateRoomAction } from "./actions";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(1).max(250),
  tags: z.string().min(1).max(50),
  githubRepository: z.string().min(1).max(50),
});
export default function CreateRoomForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepository: "",
      tags: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    /**
     *TODO: invoke a server action to store the data in our database.
     * ! SERVER ACTION :D
     */
    CreateRoomAction(values).then(() => {
      router.push("/");
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>This is your public room name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Please describe your room.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Language Field */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="typescript, nextjs, tailwind" {...field} />
              </FormControl>
              <FormDescription>
                List your programming languages,frameworks...
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* GithubRepo Field */}
        <FormField
          control={form.control}
          name="githubRepository"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://github.com/medAzizRezgui/dev-video-rooms"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
