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
import Service from "../../components/services/Service"
import Section from "../../components/common/Section"
import AnnualFee from "../../components/services/AnnualFee"
import Title from "../../components/common/Title"
import FreeItem from "../../components/services/FreeItem"
import Settings from "/public/icons/settings.svg"
import GoogleAnalytics from "/public/icons/google-analytics.svg"
import Facebook from "/public/icons/facebook.svg"
import Messenger from "/public/icons/messenger.svg"
import Tls from "/public/icons/tls.svg"

const Blog: NextPage<{ manifest: BlogManifest }> = ({ manifest }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main className={styles.main}>
        <section className="banner">
          <div className="container">
            <div className="subtitle">服務項目</div>
            <h1>SEO網頁設計</h1>
          </div>
        </section>
        <Section headless className={styles.servier}>
          <div className={styles.serviceContainer}>
            <Service
              name="企業官網"
              price={12800}
              description="展現品牌價值，提供服務資訊。"
              features={[
                "專業視覺設計",
                "RWD 響應式網站",
                "SEO 搜尋引擎最佳化",
                "免費提供 SSL 憑證",
                "無限頁面部落格系統",
                "Google Analytics 設定",
                "完整後台管理系統",
              ]}
            />
            <Service
              name="客製化網站"
              price={32800}
              description=""
              features={[]}
            />
            <Service
              name="電商網站"
              price={52800}
              description=""
              features={[]}
            />
          </div>
        </Section>
        <Section className={styles.host}>
          <Title subtitle="網站維護" title="主機費用" />
          <div className={styles.annualFeeContainer}>
            <AnnualFee year={1} fee={8800} />
            <AnnualFee year={2} fee={7800} />
            <AnnualFee year={3} fee={6800} />
            <AnnualFee year={5} fee={5800} />
          </div>
        </Section>
        <Section className={styles.freeItem}>
          <Title subtitle="所有方案" title="免費提供" />
          <div className={styles.freeItemContainer}>
            <FreeItem
              icon={<GoogleAnalytics />}
              title="流量分析器設定"
              subtitle="Google Analytics"
            />
            <FreeItem
              icon={<Facebook />}
              title="社群功能串接"
              subtitle="Facebook"
            />
            <FreeItem
              icon={<Messenger />}
              title="即時洽談外掛"
              subtitle="Messenger"
            />
            <FreeItem
              icon={<Tls className={styles.tls} />}
              title="SSL / TLS 憑證"
              subtitle="HTTPS"
            />
          </div>
        </Section>
      </main>
    </>
  )
}

export default Blog
