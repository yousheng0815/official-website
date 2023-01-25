import { FC } from "react"
import styles from "./Section.module.scss"
import cx from "classnames"

interface Props {
  subtitle: string
  title: string
  align?: "left" | "center" | "right"
}

const Title: FC<Props> = ({ subtitle, title, align = "center" }) => {
  return (
    <div className={cx(styles.headerContainer, styles[align])}>
      <h3 className="subtitle">{subtitle}</h3>
      <h2 className="title">{title}</h2>
      <div className={cx("line", styles.line)} />
    </div>
  )
}

export default Title
