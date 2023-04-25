import "../styles/globals.scss"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import Preview from "./_preview"

declare global {
  interface Window {
    fbAsyncInit: any
  }
  const FB: any
}

function MyApp({ Component, pageProps }: AppProps) {
  if (Component === Preview) return <Component {...pageProps} />

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
