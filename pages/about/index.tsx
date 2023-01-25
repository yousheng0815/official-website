import Head from "next/head"
import { GetStaticProps, NextPage } from "next"
import styles from "./index.module.scss"
import { AboutPage } from "../../utils/types"
import { getAbout } from "../../utils/utils"
import Section from "../../components/common/Section"

export const getStaticProps: GetStaticProps = async () => {
  const about = await getAbout()
  return {
    props: {
      about,
    },
  }
}

const Blog: NextPage<{ about: AboutPage }> = ({ about }) => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <main className={styles.main}>
        <section className="banner">
          <div className="container">
            <div className="subtitle">關於我們</div>
            <h1>{about.title}</h1>
          </div>
        </section>
        <Section headless>
          <div className="container">
            <div
              className={styles.listContainer}
              dangerouslySetInnerHTML={{ __html: about.content }}
            />
          </div>
        </Section>
      </main>
    </>
  )
}

export default Blog
