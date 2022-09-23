import RequestHeaderLayout from "../../components/requestHeader"
import DashboardLayout from "../../components/dashboardLayout"
import Button from "../../components/button"
import Card from "../../components/card"
import { chainId, useContract, useContractRead, useNetwork, useProvider, useSigner, useSwitchNetwork } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import { useEffect, useState } from "react"


const List = (props) => {

  const {data: signer} = useSigner()

  const contract = useContract({
    addressOrName: ContractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  })

  useEffect(() => {
    contract.pendingRequests(0).then(val => console.log(val)).catch(err => console.log(err))
  }, [])

  // const { data: signer } = useSigner()
  // const { chains, isError,pendingChainId, switchNetworkAsync } =
  //   useSwitchNetwork()

  // const [currentChain, setCurrentChain] = useState(null)

  // const contract = useContract({
  //   addressOrName: ContractAddress,
  //   contractInterface: contractABI,
  //   signerOrProvider: signer
  // })

  // const [userRole, setUserRole] = useState({
  //   translator: false,
  //   validator: false,
  // })

  // const isNullAddr = (addr) => {
  //   return parseInt(addr.slice(2)) === 0 ? true : false
  // }

  // const isTranslator = (addr) => {
  //   contract.findTranslator(addr)
  //   .then(response =>{
  //     if(!isNullAddr(response[0])){
  //       setUserRole({
  //         translator: true,
  //         validator: response.validator
  //       })
  //     }
  //   }).catch(error =>{
  //     console.log(error)
  //   })
  // }

  //   useEffect(()=>{
  //     isTranslator(signer._address)
  //     console.log(userRole)
  //   }, [])


  return (
    <DashboardLayout>
        <div className="w-full h-full text-black p-5 overflow-auto">
          <RequestHeaderLayout title="Client Request">
            See latests clients requests
          </RequestHeaderLayout>
          <div className="grid grid-cols-4 gap-2 px-32">
            <Card cardTitle="Protect Earth">
              <p>Current language: Spanish</p>
              <p>Target language: German</p>
              <p>Amount Proposed: 1 ETH</p>
              <p>Since: 3 days</p>
              <p>Period: 20 days</p>
              <div className="flex justify-center">
                <Button content="Detail" type="primary"/>
              </div>
            </Card>
            <Card cardTitle="Protect Earth">
              <p>Current language: Spanish</p>
              <p>Target language: German</p>
              <p>Amount Proposed: 1 ETH</p>
              <p>Since: 3 days</p>
              <p>Period: 20 days</p>
              <div className="flex justify-center">
                <span>

                  <Button content="Detail" type="primary"/>
                </span>
              </div>
            </Card>
          </div>
        </div>
    </DashboardLayout>
  )
}


// export async function getServerSideProps() {

//   return {

//   }
// }

export default List