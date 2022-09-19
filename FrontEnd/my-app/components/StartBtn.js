import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import Button from "./button"


const StartBtn = (props) => {

    const { isConnected } = useAccount()
    const { openConnectModal } = useConnectModal();
    const router = useRouter()

    const handleClick = (e) => {
        console.log("something")
        if(isConnected){
            router.push("/dashboard")
        } else {
          openConnectModal()
        }
    }

    return (
        <span onClick={handleClick}>
          <Button content="Start experience" type="secondary" />
        </span>
    )
}

export default StartBtn