import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import { BlogManifest } from "../../utils/types"
import styles from "./Sidebar.module.scss"

interface Props {
  manifest: BlogManifest
}

const Sidebar: FC<Props> = ({ manifest }) => {
  const [search, setSearch] = useState("")
  const router = useRouter()

  return (
    <section className={styles.sidebar}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(
            {
              pathname: "/blog",
              query: { title: search },
            },
            undefined,
            { scroll: false }
          )
        }}
      >
        <input
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜尋標題"
        />
      </form>
      <h3 className={"subtitle"}>文章分類</h3>
      <div className={"line"}></div>
      <div className={styles.categoryContainer}>
        {Object.entries(
          Object.entries(manifest).reduce<{ [p: string]: number }>(
            (prev, [path, values]) => ({
              ...prev,
              [values.category]: (prev[values.category] ?? 0) + 1,
            }),
            {}
          )
        ).map(([category, count]) => (
          <Link
            key={category}
            href={{
              pathname: "/blog",
              query: { category },
            }}
            scroll={false}
          >
            <a>
              {category} ({count})
            </a>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Sidebar
