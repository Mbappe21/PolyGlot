import Link from "next/link"
import { useState } from "react"
import { useAccount, useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"
import { isNullAddr } from "../utils/functions"
import Button from "./button"
import Modal from "./modal"
import ModalCollectFunds from "./modalCollectFunds"
import ModalJugeTranslation from "./modalJugeTranslation"
import ModalSubmitTranslation from "./modalSubmitTranslation"

const TableJugeTranslation = (props) => {

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


  const getRequests = (contract, i, arr=[]) => {
    contract.findRequest(i)
    .then(val => {
      if(isNullAddr(val[0]["_hex"]) && requestList.fetchL){
        if(arr.length > 0){
          setRequestList({rList: arr, fetchL: false})
          setMyRequest(arr.filter(ele => ele.stage === 3)
          .map(ele => { return {content: [convertToLang(ele.docLang), convertToLang(ele.langNeeded), 
            displayAddr(ele.translator), parseInt(ele.stage)], id: `${ele.requestId}-${ele.client}`, 
            ipfs: ele.description, approvals: parseInt(ele.approvals), denials: parseInt(ele.denials), stage: parseInt(ele.stage), source: isNullAddr(ele.client)}})
            )
        } else {
          setMyRequest([])
        }
        console.log('another test',myRequest)
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

    return (myRequest &&
      <div>

        {
          hidden
          ? ''
          : (
            <Modal setHidden={setHidden}>
              <ModalJugeTranslation setCID={setCID} cid={cid} currentRequestIPFS={currentRequestIPFS} currentRequestId={currentRequestId} />
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
                  <th className="p-2">Accepted by</th>
                  <th className="p-2">Stage</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className="border">
                  {
                    myRequest.map((line, index) => 
                      <tr className={"hover:bg-slate-50 text-center hover:cursor-pointer border-t-2"+line.source===0 ? "bg-amber-200":""} title="click to view more" key={index} onClick={openModal}>
                        {
                          line.content.map(col =>
                            <td className="p-2" key={`${line.id}-${col}`}>{col}</td>
                          )
                        }
                        <td className="p-2">
                          {
                            line.stage === 4
                            ?(
                              <Button content="Request closed" type="" disabled={true} />
                            )
                            :(
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
                            )
                          }
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

export default TableJugeTranslation