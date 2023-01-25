import { FC, ReactNode } from "react"
import styles from "./Feature.module.scss"

interface Props {
  title: string
  content: string
  icon: ReactNode
}

const Feature: FC<Props> = ({ title, content, icon }) => {
  return (
    <div className={styles.feature}>
      <div className={styles.iconContainer}>{icon}</div>
      <h4 className={styles.header}>{title}</h4>
      <p className={styles.content}>{content}</p>
    </div>
  )
}

export default Feature
