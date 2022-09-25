import MainLayout from "./mainLayout"

import { useAccount } from "wagmi"
import { useRouter } from "next/router"


const DashboardLayout = (props) => {

  const { isConnected } = useAccount()
  const router = useRouter()

  return ( 
        <div className="bg-blue-900 px-8 mb-3">
          <MainLayout>
            <div className="bg-white">
              {props.children}
            </div>
          </MainLayout>
        </div>
  )
}

export default DashboardLayout