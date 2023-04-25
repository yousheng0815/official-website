import { FC, PropsWithChildren, ReactNode } from "react"
import styles from "./Section.module.scss"
import cx from "classnames"

interface Props {
  id?: string
  headless?: boolean
  className?: string
  containerClassName?: string
}

const Section: FC<PropsWithChildren<Props>> = ({
  id,
  headless,
  className,
  containerClassName,
  children,
}) => {
  return (
    <section
      id={id}
      className={cx(className, styles.section, {
        [styles.paddingTop]: !headless,
      })}
    >
      <div className={cx("container", containerClassName)}>{children}</div>
    </section>
  )
}

export default Section
