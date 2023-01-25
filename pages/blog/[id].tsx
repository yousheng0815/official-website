import Head from "next/head"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import styles from "./index.module.scss"
import cx from "classnames"
import { BlogData, BlogManifest } from "../../utils/types"
import { getBlogManifest, getBlogPost } from "../../utils/utils"
import Sidebar from "../../components/blog/Sidebar"
import Image from "next/image"
import Link from "next/link"

type GetStaticPropsResult = { post?: BlogData; manifest: BlogManifest }

export const getStaticPaths: GetStaticPaths = async () => {
  const blogManifest = await getBlogManifest()
  return {
    paths: blogManifest
      ? Object.entries(blogManifest).map(([path]) => ({
          params: {
            id: path,
          },
        }))
      : [],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult,
  { id: string }
> = async ({ params }) => {
  const manifest = await getBlogManifest()

  if (!params) {
    return {
      props: {
        manifest,
      },
    }
  }

  return {
    props: {
      manifest,
      post: await getBlogPost(params.id),
    },
  }
}

const Blog: NextPage<GetStaticPropsResult> = ({ post, manifest }) => {
  if (!post) return null

  const { cover, title, date, category, tags, content } = post
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main className={styles.main}>
        <div className={cx("container", styles.noBanner)}>
          <section className={styles.contentLayout}>
            <div className={styles.content}>
              <div className={cx(styles.imageContainer)}>
                <Image layout="fill" src={cover} objectFit="cover" priority />
              </div>
              <h1>{title}</h1>
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
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <Sidebar manifest={manifest} />
          </section>
        </div>
      </main>
    </>
  )
}

export default Blog
