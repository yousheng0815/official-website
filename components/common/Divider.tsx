import { FC, ReactNode } from "react"
import styles from "./Divider.module.scss"
import cx from "classnames"

interface Props {
  vertical?: boolean
}

const Divider: FC<Props> = ({ vertical }) => {
  return (
    <div
      className={cx({
        [styles.divider]: !vertical,
        [styles.dividerVertical]: !!vertical,
      })}
    />
  )
}

export default Divider
