// This file should ultimately go to a stand alone package and be shared by different projects

type StringType = "text" | "image" | "date" | "textarea" | "richtext"
type OptionType = "select"

export type PageField =
  | {
      id: string
      label: string
      indexed?: boolean
      repeat?: readonly [number] | readonly [number | undefined, number]
    } & (
      | {
          type: StringType
        }
      | {
          type: OptionType
          optionId: string
        }
    )

export type PageSchema = readonly PageField[]

// TODO: fields having repeated property should be of type string[] instead of string
export type Page<T extends PageSchema> = {
  [i in keyof T as T[i] extends PageField ? T[i]["id"] : never]: string
}

// TODO: fields having repeated property should be of type string[] instead of string
export type Manifest<T extends PageSchema> = ({
  [i in keyof T as T[i] extends PageField & { indexed: true }
    ? T[i]["id"]
    : never]: string
} & { id: string })[]

// TODO: this shouldn't be needed
export type ManuallyCorrectRepeatedFields<
  T,
  F extends string
> = T extends Array<infer U>
  ? (Omit<U, F> & {
      [i in F]: string[]
    })[]
  : Omit<T, F> & {
      [i in F]: string[]
    }
