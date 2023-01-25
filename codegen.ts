import type { CodegenConfig } from "@graphql-codegen/cli"
import dotenv from "dotenv"

dotenv.config({ path: "./.env.local" })

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        Authorization: `Bearer ${process.env.REPO_TOKEN}`,
      },
    },
  },
  documents: "utils/utils.ts",
  generates: {
    gql: {
      preset: "client",
      plugins: [],
    },
  },
}

export default config
