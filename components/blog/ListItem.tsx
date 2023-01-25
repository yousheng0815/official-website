import Image from "next/image"
import { FC, PropsWithChildren, ReactNode } from "react"
import { BlogEntry } from "../../utils/types"
import styles from "./ListItem.module.scss"
import cx from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"

interface Props extends BlogEntry {
  path: string
}

const ListItem: FC<Props> = ({
  cover,
  title,
  date,
  category,
  tags,
  abstract,
  path,
}) => {
  const router = useRouter()
  const categoryQuery = router.query.category
  const urlCategory =
    categoryQuery instanceof Array ? categoryQuery[0] : categoryQuery

  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.imageContainer)}>
        <Link href={`/blog/${path}`} scroll={false}>
          <a>
            <Image layout="fill" src={cover} objectFit="cover" />
          </a>
        </Link>
      </div>
      <div className={styles.textContainer}>
        <Link href={`/blog/${path}`} scroll={false}>
          <a>
            <h3 className={styles.title}>{title}</h3>
          </a>
        </Link>
        <div className={cx(styles.subtitle)}>
          <Link
            key={category}
            href={{
              pathname: "/blog",
              query: { category },
            }}
            scroll={false}
          >
            <a className={styles.category}>{category}</a>
          </Link>
          <span className={styles.date}>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className={styles.tagContainer}>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={{
                pathname: "/blog",
                query: { tag },
              }}
              scroll={false}
            >
              <a className={styles.tag}>{tag}</a>
            </Link>
          ))}
        </div>
        <Link href={`/blog/${path}`} scroll={false}>
          <a>
            <p className={styles.preview}>{abstract}</p>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default ListItem
