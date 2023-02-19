import { gql } from "@apollo/client"
import { ContentQuery, ContentQueryVariables } from "../gql/graphql"
import client from "./apollo-client"
import { BlogManifest, BlogData, AboutPage, FaqManifest } from "./types"

const ABOUT_PAGE_PATH = "pages/about"
const BLOG_PAGE_PATH = "pages/blog"
const FAQ_PAGE_PATH = "pages/faq"
const DATA_FOLDER_NAME = "data"
const MANIFEST_FILE_NAME = "manifest.json"
const INDEX_FILE_NAME = "default.json"

export async function getContent<T>(path: string) {
  const query = await client.query<ContentQuery, ContentQueryVariables>({
    query: gql`
      query Content($owner: String!, $name: String!, $expression: String) {
        repository(owner: $owner, name: $name) {
          id
          object(expression: $expression) {
            id
            ... on Blob {
              text
            }
          }
        }
      }
    `,
    variables: {
      owner: process.env.REPO_OWNER!,
      name: process.env.REPO_NAME!,
      expression: `master:${path}`,
    },
  })
  if (query.data.repository?.object?.__typename !== "Blob") throw new Error()
  return JSON.parse(query.data.repository.object.text!) as T
}

export async function getAbout() {
  return getContent<AboutPage>(
    `${ABOUT_PAGE_PATH}/${DATA_FOLDER_NAME}/${INDEX_FILE_NAME}`
  )
}

export async function getBlogManifest() {
  return getContent<BlogManifest>(`${BLOG_PAGE_PATH}/${MANIFEST_FILE_NAME}`)
}

export async function getFaqManifest() {
  return getContent<FaqManifest>(`${FAQ_PAGE_PATH}/${MANIFEST_FILE_NAME}`)
}

export async function getBlogPost(path: string) {
  return getContent<BlogData>(
    `${BLOG_PAGE_PATH}/${DATA_FOLDER_NAME}/${path}.json`
  )!
}
