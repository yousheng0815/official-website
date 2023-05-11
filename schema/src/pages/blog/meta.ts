import {
  Manifest,
  ManuallyCorrectRepeatedFields,
  Page as Data,
  PageField,
  PageSchema,
} from "../../../schema"

const schema = [
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

// To inforce the schema is of type PageSchema
const _: PageSchema = schema

export default schema

export type Blog = ManuallyCorrectRepeatedFields<Data<typeof schema>, "tags">

export type BlogManifest = ManuallyCorrectRepeatedFields<
  Manifest<typeof schema>,
  "tags"
>
