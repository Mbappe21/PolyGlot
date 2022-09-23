import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import { useUser } from "../hooks/useUser"
import Button from "./button"


const StartBtn = (props) => {

  const { user } = useUser()
    const { isConnected } = useAccount()
    const { openConnectModal } = useConnectModal();
    const router = useRouter()

    const handleClick = (e) => {
        console.log(user)
        if(isConnected && user?.isLoggedIn){
          router.push("/dashboard/")
        } else if(!isConnected){
          openConnectModal()
        } else {
            router.push("/api/login")
        }
    }

    return (
        <span onClick={handleClick}>
          <Button content="Start experience" type="secondary" />
        </span>
    )
}

export default StartBtn