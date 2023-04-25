export type BlogManifest = BlogEntry[]

export type BlogEntry = {
  id: string
  cover: string
  title: string
  date: string
  category: string
  tags: string[]
  abstract: string
}

export type BlogData = {
  cover: string
  title: string
  date: string
  category: string
  tags: string[]
  content: string
}

export type FaqManifest = { [path: string]: FaqEntry }

export type FaqEntry = {
  question: string
  answer: string
}

export type AboutPage = {
  title: string
  content: string
}

type Field = FieldType & {
  label: string
  id: string
  repeat?: [number] | [number, number]
  indexed?: boolean
}

type FieldType =
  | {
      type: "boolean"
      defaultValue?: boolean
    }
  | {
      type: "number"
      defaultValue?: number
    }
  | {
      type: "text" | "textarea" | "richtext" | "date" | "image"
      defaultValue?: string
    }
  | {
      type: "select"
      defaultValue?: number
      optionId: string
    }
