import { FC, ReactNode } from "react"
import Divider from "../common/Divider"
import styles from "./AnnualFee.module.scss"

interface Props {
  year: number
  fee: number
}

const AnnualFee: FC<Props> = ({ year, fee }) => {
  return (
    <div className={styles.annualFee}>
      <div className={styles.year}>{year} 年</div>
      <div className={styles.feeContainer}>
        <div className={styles.fee}>${fee.toLocaleString("en-US")}</div>
        <div className={styles.averageFee}>每年平均費用</div>
      </div>
    </div>
  )
}

export default AnnualFee
