import { Manifest, Page, PageSchema } from "../../../schema"

const schema = [
  { label: "Question", id: "question", type: "text", indexed: true },
  { label: "Answer", id: "answer", type: "textarea", indexed: true },
] as const

// To inforce the schema is of type PageSchema
const _: PageSchema = schema

export default schema

export type Faq = Page<typeof schema>

export type FaqManifest = Manifest<typeof schema>
