"use client";
import { useRouter } from "next/navigation";

import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => router.push(`/?search=${tag}`)}
          className={cn(badgeVariants())}
          tabIndex={0}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
export { TagsList };
