import { Page, PageSchema } from "../../../schema"

const schema = [
  { label: "Title", id: "title", type: "text", indexed: true },
  { label: "Content", id: "content", type: "richtext" },
] as const

// To inforce the schema is of type PageSchema
const _: PageSchema = schema

export default schema

export type About = Page<typeof schema>
