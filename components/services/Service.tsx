import { FC, ReactNode } from "react"
import Divider from "../common/Divider"
import styles from "./Service.module.scss"

interface Props {
  name: string
  price: number
  description: string
  features: string[]
}

const Service: FC<Props> = ({ name, price, description, features }) => {
  return (
    <div className={styles.service}>
      <h2>{name}</h2>
      <div className={styles.price}>${price.toLocaleString("en-US")}</div>
      <div>{description}</div>
      <Divider />
      <ul>
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}

export default Service
