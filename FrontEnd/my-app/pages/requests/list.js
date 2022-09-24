import RequestHeaderLayout from "../../components/requestHeader"
import DashboardLayout from "../../components/dashboardLayout"
import { useContract, useContractRead, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import { useEffect, useState } from "react"
import Card from "../../components/card"
import Button from "../../components/button"


const List = (props) => {

  const langs = {
    1: "English",
    2: "French",
    3: "Lingala",
  }
  const [requestList, setRequestList] = useState({rList: [], fetchL: true})

  const {data: signer} = useSigner()

  const contract = useContract({
    addressOrName: ContractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  })

  const isNullAddr = (addr) => {
    return parseInt(addr.slice(2)) === 0 ? true : false
  }

  const getRequests = (contract, i, arr=[]) => {
    contract.findRequest(i)
    .then(val => {
      if(isNullAddr(val[0]["_hex"]) && requestList.fetchL){
        let tab = arr.filter(val => val.accepted === false)
        setRequestList({rList: tab, fetchL: false})
          return arr
      } else {
          let nextI = i + 1
          arr.push(val)
          return getRequests(contract, nextI, arr)
      }
    }).catch(error =>{
      console.log('test',error)
      return
    })
  }

  getRequests(contract, 1)

  const handleSubmit = (e) =>{
    e.preventDefault()
    const data = new FormData(e.target)
    let value 
    for (let val of data.values()){
      value = val
    }

    contract.acceptTranslation(value)
    .then(val => {
      console.log(val)
    }).catch(err => {
      console.log(err)
    })
  }
  

  return (
    <DashboardLayout>
        <div className="w-full h-full text-black p-5 overflow-auto">
          <RequestHeaderLayout title="Client Request">
            See latests clients requests
          </RequestHeaderLayout>
          <div className="grid grid-cols-4 gap-2 px-32" id="card-container">
            {
              requestList.rList.map(val => (
                <Card cardTitle={val.client} key={val.requestId}>
                  <p>Document language: {langs[parseInt(val.docLang)]}</p>
                  <p>Target language: {langs[parseInt(val.langNeeded)]}</p>
                  <div className="flex justify-center">
                    <form onSubmit={handleSubmit}>
                      <input type="hidden" value={val.requestId} name={`r-${val.requestId}`} />
                      <Button content="Accept" type="primary"/>
                    </form>
                  </div>
                </Card>                 
              ))
            }
          </div>
        </div>
        <scrip>
          
        </scrip>
    </DashboardLayout>
  )
}

export default List