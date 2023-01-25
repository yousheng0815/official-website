import styles from "./Layout.module.scss"
import cx from "classnames"
import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import Image from "next/image"
import logo from "../public/images/logo.png"
import Link from "next/link"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import transition from "styles/downwardTransition.module.scss"
import { useRouter } from "next/router"
import leftDec from "/public/images/slider-left-dec.jpg"

import loadCssModules from "../utils/css-modules"
loadCssModules()

export const PAGE_TRANSITION_TIMEOUT = 300

const NAV_LINKS = [
  { href: "/", name: "" },
  { href: "/about", name: "關於我們" },
  { href: "/services", name: "服務項目" },
  { href: "/faq", name: "常見問答" },
  { href: "/blog", name: "部落格" },
]

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

  const router = useRouter()
  const nodeRef = useRef<HTMLDivElement>(null)
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false)

  const [transitionKey, setTransitionKey] = useState<string>("")
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setIsMobileNavExpanded(false)
      setTransitionKey(`${Date.now()}-${url}`)
    }
    const handleHashChange = (url: string) => {
      setIsMobileNavExpanded(false)
      document
        .querySelector(new URL(url, window.location.origin).hash || "body")
        ?.scrollIntoView()
    }

    router.events.on("routeChangeStart", handleRouteChange)
    router.events.on("hashChangeStart", handleHashChange)

    return () => {
      router.events.off("routeChangeStart", handleRouteChange)
      router.events.off("hashChangeStart", handleRouteChange)
    }
  }, [])

  return (
    <>
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

      <div className={styles.SwitchTransition}>
        <SwitchTransition>
          <CSSTransition
            key={transitionKey}
            timeout={PAGE_TRANSITION_TIMEOUT}
            onEnter={() => {
              document
                .querySelector(window.location.hash || "body")
                ?.scrollIntoView()
            }}
            classNames={{ ...transition }}
            nodeRef={nodeRef}
          >
            <div
              ref={nodeRef}
              className={styles.nodeRef}
              style={{ transitionDuration: `${PAGE_TRANSITION_TIMEOUT}ms` }}
            >
              <div className={styles.leftDec}>
                <Image src={leftDec} alt="" />
              </div>
              {children}
              <footer className={styles.footer}></footer>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  )
}

export default Layout
