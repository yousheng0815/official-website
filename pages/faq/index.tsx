import Head from "next/head"
import { GetStaticProps, NextPage } from "next"
import styles from "./index.module.scss"
import { BlogManifest, FaqManifest } from "../../utils/types"
import { getBlogManifest, getFaqManifest } from "../../utils/utils"
import Section from "../../components/common/Section"
import { useRef, useState } from "react"
import cx from "classnames"

export const getStaticProps: GetStaticProps = async () => {
  const manifest = await getFaqManifest()
  return {
    props: {
      manifest,
    },
  }
}

const Blog: NextPage<{ manifest: FaqManifest }> = ({ manifest }) => {
  const [expandedIdx, setExpandedIdx] = useState<number>()
  const itemsRef = useRef<(HTMLHeadingElement | null)[]>([])
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main className={styles.main}>
        <section className="banner">
          <div className="container">
            <div className="subtitle">FAQ</div>
            <h1>常見問答</h1>
          </div>
        </section>
        <Section headless>
          <div className={styles.contentLayout}>
            <section>
              <div className={styles.container}>
                {Object.entries(manifest).map(([_, faq], i) => {
                  const isExpanded = expandedIdx === i
                  return (
                    <div
                      key={i}
                      className={cx(styles.item, {
                        [styles.expanded]: isExpanded,
                      })}
                    >
                      <h2
                        className={styles.question}
                        onClick={() =>
                          setExpandedIdx((x) => (x === i ? undefined : i))
                        }
                      >
                        <span className={styles.triangle} />
                        {faq.question}
                      </h2>
                      <h2
                        className={styles.answer}
                        ref={(e) => (itemsRef.current[i] = e)}
                        style={{
                          height: isExpanded
                            ? itemsRef.current[i]?.scrollHeight
                            : undefined,
                        }}
                      >
                        {faq.answer}
                      </h2>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </Section>
      </main>
    </>
  )
}

export default Blog
