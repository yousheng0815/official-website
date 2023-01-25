import { Html, Head, Main, NextScript } from "next/document"
import Divider from "../components/common/Divider"
import FbLiveChat from "../components/common/FbLiveChat"

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <FbLiveChat pageId="102756695984997" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
