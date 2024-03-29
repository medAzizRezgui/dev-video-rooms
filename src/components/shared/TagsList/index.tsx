import { Badge } from "@/components/ui/badge";

export function splitTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim());
}

function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} className="w-fit">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
export { TagsList };
