import { FC, ReactNode } from "react"
import Divider from "../common/Divider"
import styles from "./FreeItem.module.scss"

interface Props {
  title: string
  subtitle: string
  icon: ReactNode
}

const FreeItem: FC<Props> = ({ title, subtitle, icon }) => {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  )
}

export default FreeItem
