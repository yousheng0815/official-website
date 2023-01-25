import Head from "next/head"
import { GetStaticProps, NextPage } from "next"
import styles from "./index.module.scss"
import cx from "classnames"
import Link from "next/link"
import { BlogManifest } from "../../utils/types"
import { getBlogManifest } from "../../utils/utils"
import { useRef, useState } from "react"
import Sidebar from "../../components/blog/Sidebar"
import ListItem from "../../components/blog/ListItem"
import { useRouter } from "next/router"
import Section from "../../components/common/Section"

export const getStaticProps: GetStaticProps = async () => {
  const manifest = await getBlogManifest()
  return {
    props: {
      manifest,
    },
  }
}

const Blog: NextPage<{ manifest: BlogManifest }> = ({ manifest }) => {
  const router = useRouter()

  const categoryQuery = router.query.category
  const [category] = useState(
    categoryQuery instanceof Array ? categoryQuery[0] : categoryQuery ?? ""
  )
  const tagQuery = router.query.tag
  const [tag] = useState(
    tagQuery instanceof Array ? tagQuery[0] : tagQuery ?? ""
  )
  const titleQuery = router.query.title
  const [title] = useState(
    titleQuery instanceof Array ? titleQuery[0] : titleQuery ?? ""
  )

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main className={styles.main}>
        <section className="banner">
          <div className="container">
            <div className="subtitle">部落格</div>
            <h1>{category || tag || title || "最新文章"}</h1>
          </div>
        </section>
        <Section headless>
          <div className={styles.contentLayout}>
            <section>
              <div className={styles.listContainer}>
                {Object.entries(manifest)
                  .filter(
                    ([path, post]) => !category || post.category === category
                  )
                  .filter(([path, post]) => !tag || post.tags.includes(tag))
                  .filter(
                    ([path, post]) =>
                      !title ||
                      post.title
                        .toLocaleLowerCase()
                        .includes(title.toLocaleLowerCase())
                  )
                  .sort(
                    (x, y) =>
                      new Date(y[1].date).getTime() -
                      new Date(x[1].date).getTime()
                  )
                  .map(([path, post]) => (
                    <ListItem key={path} path={path} {...post} />
                  ))}
              </div>
            </section>
            <Sidebar manifest={manifest} />
          </div>
        </Section>
      </main>
    </>
  )
}

export default Blog
