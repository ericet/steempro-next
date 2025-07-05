import React from "react";
import STag from "./ui/STag";

export default function TagsListCard({
  tags = [],
  isDisabled,
}: {
  tags: string[];
  isDisabled?: boolean;
}) {
  return (
    <div className="flex gap-2 overscroll-x-contain flex-wrap shrink-0">
      {tags
        ?.filter((tag) => !!tag)
        ?.map((tag, index) => {
          return <STag isDisabled={isDisabled} key={`${tag}-${index}`} tag={tag} />;
          // <Chip isDisabled={isDisabled} as={SLink} href={`/trending/${tag}`} key={tag}>{tag}</Chip>
        })}
    </div>
  );
}
