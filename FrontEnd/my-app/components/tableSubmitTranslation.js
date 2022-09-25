import Link from "next/link"
import { useState } from "react"
import { useAccount, useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"
import { convertToLang, displayAddr, isNullAddr } from "../utils/functions"
import Button from "./button"
import Modal from "./modal"
import ModalCollectFunds from "./modalCollectFunds"
import ModalSubmitTranslation from "./modalSubmitTranslation"

const TableSubmitTranslation = (props) => {

  const [hidden, setHidden] = useState(true)
  const [cid, setCID] = useState()
  const [requestList, setRequestList] = useState({rList: [], fetchL: true})
  const [myRequest, setMyRequest] = useState([])
  const [currentRequestId, setCurrentRequestId] = useState()
  const [currentRequestIPFS, setCurrentRequestIPFS] = useState()
  const [approvals, setApprovals] = useState(0)
  const [denials, setDenials] = useState(0)
  const [stage, setStage] = useState(0)

  const {data: signer} = useSigner()
  const { address } = useAccount()

  const contract = useContract({
    addressOrName: ContractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  })

  const requests = props.requests.filter(ele => ele?.translator === address)
  .map(ele => { 
    return ele === undefined 
    ? {content: [], }
    : {content: [convertToLang(ele?.docLang), convertToLang(ele?.langNeeded), 
    displayAddr(ele?.client), parseInt(ele?.stage)], 
    id: `${ele?.requestId}-${ele?.client}`, 
    ipfs: ele?.description, 
    approvals: ele?.approvals, 
    denials:ele?.denials, 
    stage:ele?.stage, 
    client:isNullAddr(ele?.client), 
    requestId:ele?.requestId}
  })
    

  // const getRequests = (contract, i, arr=[]) => {
  //   contract.findRequest(i)
  //   .then(val => {
  //     console.log('another test',myRequest)
  //     if(isNullAddr(val[0]["_hex"]) && requestList.fetchL){
  //       console.log("pendinggg", val)
  //         setRequestList({rList: arr, fetchL: false})
  //         setMyRequest(arr.filter(ele => ele.translator === address)
  //         .map(ele => { return {content: [convertToLang(ele.docLang), convertToLang(ele.langNeeded), 
  //           displayAddr(ele.translator), parseInt(ele.stage)], id: `${ele.requestId}-${ele.client}`, 
  //           ipfs: ele.description, approvals: ele.approvals, denials:ele.denials, stage:ele.stage}})
  //           )
  //     } else {
  //         let nextI = i + 1
  //         arr.push(val)
  //         return getRequests(contract, nextI, arr)
  //     }
  //   }).catch(error =>{
  //     console.log('test',error)
  //     return
  //   })
  // }
  // getRequests(contract, 1)


  const handleSubmit = (e) => {
    e.preventDefault()
    openModal()
    const datas = new FormData(e.target)
    for(var entrie of datas.entries()){
      if(entrie[0]=="nRequest"){
        console.log(entrie[0],entrie[1])
        setCurrentRequestId(parseInt(entrie[1]))
      }
      if(entrie[0]=="clientCidr"){
        setCurrentRequestIPFS(entrie[1])
      }
      if(entrie[0]=="approvals"){
        setApprovals(entrie[1])
      }
      if(entrie[0]=="denials"){
        setDenials(entrie[1])
      }
      if(entrie[0]=="stage"){
        setStage(entrie[1])
      }
    }
  }

  const openModal = () => {
    setHidden(false)
  }

    return (
      
      <div>

        {
          hidden
          ? ''
          : (
            <Modal setHidden={setHidden}>
              {
                stage >= 3 
                ? <ModalCollectFunds setCID={setCID} approvals={approvals} denials={denials}  />
                : <ModalSubmitTranslation setCID={setCID} cid={cid} currentRequestIPFS={currentRequestIPFS} currentRequestId={currentRequestId} />
              }
              
            </Modal>
          )
        }

        <div className='mb-10'>
          <h2 className="text-2xl">{props.title}</h2>
          
          <table className='table-auto w-full text-gray-600'>
              <thead className='bg-gray-100'>
                <tr className="border">
                  <th className="p-2">Doc Language</th>
                  <th className="p-2">Target Language</th>
                  <th className="p-2">Client</th>
                  <th className="p-2">Stage</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className="border">
                  {
                    requests?.map((line, index) => 
                      <tr className={`hover:bg-slate-50 text-center hover:cursor-pointer border-t-2`} title="click to view more" key={index} onClick={openModal}>
                        {
                          line.content.map(col =>
                            <td className="p-2" key={`${line.id}-${col}`}>{col}</td>
                          )
                        }
                        <td className="p-2">
                          <form onSubmit={handleSubmit}>
                            <input type="hidden" name="nRequest" value={line.requestId}/>
                            <input type="hidden" name="clientCidr" value={line.ipfs}/>
                            <input type="hidden" name="approvals" value={line.approvals}/>
                            <input type="hidden" name="denials" value={line.denials}/>
                            <input type="hidden" name="stage" value={line.stage}/>
                            <span>
                              <Button content="Detail" type="primary" />
                            </span>
                          </form>
                        </td>
                      </tr>
                    )
                  }
              </tbody>
          </table>
        </div>   
      </div>
    )
}

export default TableSubmitTranslation