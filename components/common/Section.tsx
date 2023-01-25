import { FC, PropsWithChildren, ReactNode } from "react"
import styles from "./Section.module.scss"
import cx from "classnames"

interface Props extends PropsWithChildren {
  headless?: boolean
  className?: string
  containerClassName?: string
}

const Section: FC<Props> = ({
  headless,
  className,
  containerClassName,
  children,
}) => {
  return (
    <section
      className={cx(className, styles.section, {
        [styles.paddingTop]: !headless,
      })}
    >
      <div className={cx("container", containerClassName)}>{children}</div>
    </section>
  )
}

export default Section
