import { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
import cx from "classnames"
import styles from "./ContactForm.module.scss"
import Script from "next/script"
import Check from "../../public/icons/check.svg"

declare global {
  interface Window {
    grecaptcha: any
    onRecaptchaLoadCallback: () => void
  }
}

const ContactForm: FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const grecaptchaContainerRef = useRef<HTMLDivElement | null>(null)
  const rendered = useRef(false)
  const [status, setStatus] = useState<"ready" | "loading" | "sent">("loading")
  useEffect(() => {
    const render = () => {
      if (rendered.current) return
      window.grecaptcha.render(grecaptchaContainerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        callback: async () => {
          if (!formRef.current) return
          setStatus("loading")
          const formData = new FormData(formRef.current)
          const formDataObj = Object.fromEntries(formData.entries())
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_HOSTNAME}/form/yousheng0815/official-website-content`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(formDataObj),
            }
          )
          if (res.ok) {
            setStatus("sent")
          } else {
            const errorMsg = await res.text()
            alert(errorMsg)
            setStatus("ready")
            window.grecaptcha.reset()
          }
        },
      })
      setStatus("ready")
      rendered.current = true
    }
    if (window?.grecaptcha?.render) {
      render()
      return
    }
    window.onRecaptchaLoadCallback = render
  }, [])

  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoadCallback&render=explicit" />
      <form
        ref={formRef}
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault()
          window.grecaptcha.execute()
        }}
      >
        <h4>Get In Touch Now</h4>
        <label>
          姓名*
          <input name="name" type="text" placeholder="placeholder" required />
        </label>
        <label>
          電話
          <input name="phone" type="tel" placeholder="placeholder" />
        </label>
        <label className={styles.oneLine}>
          Email*
          <input name="email" type="email" placeholder="placeholder" required />
        </label>
        <label className={styles.oneLine}>
          內容*
          <textarea name="content" placeholder="placeholder" required />
        </label>

        <div
          ref={grecaptchaContainerRef}
          data-size="invisible"
          data-badge="bottomleft"
        />

        <button
          className={cx("button", styles.button, {
            [styles.sent]: status === "sent",
          })}
          disabled={status !== "ready"}
        >
          {status === "ready" ? (
            "免費諮詢"
          ) : status === "loading" ? (
            <div className={styles.spinner} />
          ) : (
            <Check className={styles.check} />
          )}
        </button>
      </form>
    </>
  )
}

export default ContactForm
