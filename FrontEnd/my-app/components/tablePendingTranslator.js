import Link from "next/link"
import { useState } from "react"
import { useAccount, useContract, useContractEvent, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"
import { convertToLang, isNullAddr } from "../utils/functions"
import Button from "./button"
import Modal from "./modal"
import ModalCollectFunds from "./modalCollectFunds"
import ModalSubmitTest from "./modalSubmitTest"
import ModalSubmitTranslation from "./modalSubmitTranslation"
import ModalVote from "./modalVote"

const TablePendingTranslator = (props) => {


  const [hidden, setHidden] = useState(true)
  const [approvals, setApprovals] = useState(0)
  const [denials, setDenials] = useState(0)
  const [pendingTrans, setPendingTrans] = useState({pList: [], fetchL: true})
  const [nOfRequest, setNOfRequest] = useState()
  const [pendingTranslator, setPendingTranslator] = useState( )
  const [docLang, setDocLang] = useState()
  const [langNeeded, setLangNeeded] = useState()

  const {data: signer} = useSigner()
  const { address } = useAccount()
  console.log(address)
  const contract = useContract({
    addressOrName: ContractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  })


  contract.findPendingTranslator(address)
  .then(val => {
    const arr = [val]
    if(pendingTrans.fetchL){
      setPendingTrans({
        pList: arr.filter(val => val.rejected===false).map(val =>
          { 
            return {
              content: [val.translator, convertToLang(val.lang1), convertToLang(val.lang2), parseInt(val.nOfRequests)], 
              pendingTranslator: val.translator, 
              docLang: parseInt(val.lang1), 
              langNeeded: parseInt(val.lang2)
            }
          }
        ), 
        fetchL: false
      })
      setNOfRequest(parseInt(val.nOfRequest))
    }
  }).catch(err => {
    console.log(err)
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    openModal()
    const datas = new FormData(e.target)
    for(var entrie of datas.entries()){
      if(entrie[0]=="pendingTranslator"){
        setPendingTranslator(entrie[1])
      }
      if(entrie[0]=="docLang"){
        setDocLang(entrie[1])
      }
      if(entrie[0]=="langNeeded"){
        setLangNeeded(entrie[1])
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
                nOfRequest > 3
                ? <ModalVote pendingTranslator={pendingTranslator} approvals={approvals} denials={denials}  />
                : <ModalSubmitTest pendingTranslator={pendingTranslator} docLang={docLang} langNeeded={langNeeded} />
              }
              
            </Modal>
          )
        }

        <div className='mb-10'>
          <h2 className="text-2xl">{props.title}</h2>
          
          <table className='table-auto w-full text-gray-600'>
              <thead className='bg-gray-100'>
                <tr className="border">
                  <th className="p-2">Translator</th>
                  <th className="p-2">Lang 1</th>
                  <th className="p-2">Lang 2</th>
                  <th className="p-2">Num test get</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className="border">
                  {
                    pendingTrans.pList.map((line, index) => 
                      <tr className="hover:bg-slate-50 text-center hover:cursor-pointer border-t-2" title="click to view more" key={index} onClick={openModal}>
                        {
                          line.content.map(col =>
                            <td className="p-2" key={`${line.id}-${col}`}>{col}</td>
                          )
                        }
                        <td className="p-2">
                          <form onSubmit={handleSubmit}>
                            <input type="hidden" name="pendingTranslator" value={line.pendingTranslator}/>
                            <input type="hidden" name="docLang" value={line.docLang}/>
                            <input type="hidden" name="langNeeded" value={line.langNeeded}/>
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

export default TablePendingTranslator