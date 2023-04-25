import { NextPage } from "next"
import { Router, useRouter } from "next/router"
import { useEffect, useState } from "react"
import About from "./about"
import Blog from "./blog/[id]"
import Faq from "./faq"

const Preview: NextPage = () => {
  const [page, setPage] = useState<string>()
  const [values, setValues] = useState<any>()
  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.origin !== process.env.NEXT_PUBLIC_CMS_HOSTNAME) {
        console.error(
          `invalid origin: ${e.origin} (only allow ${process.env.NEXT_PUBLIC_CMS_HOSTNAME}`
        )
        return
      }
      setPage(e.data.page)
      setValues(e.data.values)
    }
    window.addEventListener("message", listener)
    return () => window.removeEventListener("message", listener)
  }, [])

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = () => {
      router.events.emit("routeChangeError")
      throw `routeChange aborted. This error can be safely ignored - https://github.com/zeit/next.js/issues/2476.`
    }
    router.events.on("routeChangeStart", handleRouteChange)

    return () => {
      router.events.off("routeChangeStart", handleRouteChange)
    }
  })

  switch (page) {
    case "about":
      return <About about={values} />
    case "faq":
      return <Faq manifest={{ _: values }} />
    case "blog":
      return <Blog post={values} manifest={[]} />
  }

  return null
}

export default Preview
