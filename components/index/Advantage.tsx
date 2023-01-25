import { FC, ReactNode } from "react"
import styles from "./Advantage.module.scss"

interface Props {
  title: string
  content: string
  picture: ReactNode
}

const Index: FC<Props> = ({ title, content, picture }) => {
  return (
    <div className={styles.advantage}>
      <div className={styles.picture}>{picture}</div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default Index
