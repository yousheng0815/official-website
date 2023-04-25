import styles from "./Layout.module.scss"
import cx from "classnames"
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react"
import Image from "next/image"
import logo from "../public/images/logo.png"
import Link from "next/link"
import { useRouter } from "next/router"
import { AnimatePresence, AnimationDefinition, motion } from "framer-motion"
import loadCssModules from "../utils/css-modules"

// https://github.com/vercel/next.js/issues/17464
loadCssModules()

const NAV_LINKS = [
  { href: "/", name: "" },
  { href: "/about", name: "關於我們" },
  { href: "/services", name: "服務項目" },
  { href: "/faq", name: "常見問答" },
  { href: "/blog", name: "部落格" },
]

const ANIMATION_INITIAL = { y: 60, opacity: 0 }
const ANIMATION_ANIMATE = { y: 0, opacity: 1 }
const ANIMATION_EXIT = { y: -60, opacity: 0 }

interface Props extends PropsWithChildren {}
const Layout: FC<Props> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const [isOnTop, setIsOnTop] = useState(true)

  useEffect(() => {
    if (!headerRef.current) return

    let options = {
      root: null,
      threshold: 0.5,
    }
    let observer = new IntersectionObserver((e) => {
      setIsOnTop(e[0].isIntersecting)
    }, options)
    observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false)

  const router = useRouter()
  const oldUrlRef = useRef(getUrl(""))
  const newUrlRef = useRef(getUrl(router.asPath))

  useEffect(() => {
    const handlePathChange = (url: string) => {
      setIsMobileNavExpanded(false)

      oldUrlRef.current = newUrlRef.current
      newUrlRef.current = getUrl(url)

      if (oldUrlRef.current.pathname === newUrlRef.current.pathname) {
        scrollToTarget(newUrlRef.current.hash)
      }
    }

    router.events.on("routeChangeStart", handlePathChange)
    router.events.on("hashChangeStart", handlePathChange)

    return () => {
      router.events.off("routeChangeStart", handlePathChange)
      router.events.off("hashChangeStart", handlePathChange)
    }
  }, [])

  return (
    <div className={styles.root}>
      <header className={styles.header} ref={headerRef}>
        <nav
          className={cx(styles.nav, {
            [styles.top]: isOnTop,
            [styles.expanded]: isMobileNavExpanded,
          })}
        >
          <div className={cx("container", styles.container)}>
            <Link href="/" scroll={false}>
              <a>
                <Image src={logo} alt="Logo" className={styles.logo} />
              </a>
            </Link>
            <ul className={styles.navList}>
              {NAV_LINKS.filter((link) => link.name).map((link, i) => (
                <li key={i}>
                  <Link href={link.href} scroll={false}>
                    <a className={styles.link}>{link.name}</a>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#contact" scroll={false}>
                  <a className={cx("button", "outlined")}>免費諮詢</a>
                </Link>
              </li>
            </ul>
            <button
              className={cx(styles.menuTrigger)}
              onClick={() => setIsMobileNavExpanded((x) => !x)}
            >
              <span>Menu</span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.route}
          initial={ANIMATION_INITIAL}
          animate={ANIMATION_ANIMATE}
          exit={ANIMATION_EXIT}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          onAnimationStart={(def) => {
            if (def === ANIMATION_ANIMATE) {
              scrollToTarget(newUrlRef.current.hash)
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Layout

const getUrl = (path: string) => {
  return new URL(path, "http://dummy")
}

const scrollToTarget = (hash?: string) => {
  const target = hash || "body"
  document.querySelector(target)?.scrollIntoView()
}
