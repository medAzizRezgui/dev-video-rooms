"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
  search: z.string().min(0).max(50),
});
export function SearchBar() {
  const router = useRouter();
  const query = useSearchParams();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: query.get("search") ?? "",
    },
  });

  const search = query.get("search");
  useEffect(() => {
    form.setValue("search", search ?? "");
  }, [search, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push(`/browse?search=${values.search}`);
    } else {
      router.push("/browse");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-x-8 w-full"
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-[400px]"
                  placeholder="Filter rooms by keywords,such as typescript, python..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon className="mr-2" />
          Search
        </Button>
        {query.get("search") && (
          <Button
            onClick={() => {
              form.setValue("search", "");
              router.push("/browse");
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
}
