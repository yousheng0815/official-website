import { Page, PageSchema } from "./schema"

const schema: PageSchema = [
  { label: "Title", id: "title", type: "text", indexed: true },
  { label: "Cover", id: "cover", type: "image", indexed: true },
  { label: "Date", id: "date", type: "date", indexed: true },
  {
    label: "Category",
    id: "category",
    type: "select",
    optionId: "category",
    indexed: true,
  },
  {
    label: "Tags",
    id: "tags",
    type: "select",
    optionId: "tag",
    repeat: [0],
    indexed: true,
  },
  {
    label: "Abstract",
    id: "abstract",
    type: "textarea",
    indexed: true,
  },
  { label: "Content", id: "content", type: "richtext" },
] as const
export default schema

export type Blog = Page<typeof schema>
