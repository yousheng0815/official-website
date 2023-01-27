import "../styles/globals.scss"
import type { AppProps } from "next/app"
import Layout, { PAGE_TRANSITION_TIMEOUT } from "../components/Layout"
import Script from "next/script"
import Preview from "./_preview"

// https://github.com/vercel/next.js/issues/17464

declare global {
  interface Window {
    fbAsyncInit: any
  }
  const FB: any
}

function MyApp({ Component, pageProps }: AppProps) {
  if (Component === Preview) return <Component {...pageProps} />

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
