const fs = require("fs")
const path = require("path")

const dirs = ["./components", "./pages"]

const cssList = []

while (dirs.length) {
  const dir = dirs.shift()
  const files = fs.readdirSync(dir)
  dirs.push(
    ...files.flatMap((file) => {
      return fs.statSync(path.join(dir, `./${file}`)).isDirectory()
        ? [path.join(dir, `./${file}`)]
        : []
    })
  )
  files
    .filter((file) => file.match(/.*\.scss/))
    .forEach((css) => cssList.push(path.join(dir, `./${css}`)))
}

fs.writeFile(
  "utils/css-modules.ts",
  `// Generated file

${cssList.map((css) => `import("../${css}")`).join("\n")}
export default () => {}
`,
  (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log("success")
    }
  }
)
