export type PageField = {
  id: string
  label: string
  type: "text" | "image" | "date" | "select" | "textarea"
  indexed: boolean
}

export type Page = PageField[]
