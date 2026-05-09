import { allThoughts, type Thought } from "contentlayer/generated";

export type { Thought };

export function getAllThoughts(): Thought[] {
  return allThoughts
    .filter((t) => !t.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
