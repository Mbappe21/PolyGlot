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

  const [requestList, setRequestList] = useState({rList: [], fetchL: true})
  const [myRequest, setMyRequest] = useState([])
  const [voteId, setVoteId] = useState()

  const {data: signer} = useSigner()
  const { address } = useAccount()
  console.log(address)

  const contract = useContract({
    addressOrName: ContractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  })


  const getVotes = (contract, i, arr=[]) => {
    contract.findVote(i)
    .then(val => {
      if(isNullAddr(val[0]["_hex"]) && requestList.fetchL){
        setRequestList({rList: arr, fetchL: false})
        setMyRequest(arr.filter(ele => ele.rejected !== true)
        .map(ele => { 
          return {content: 
            [ displayAddr(ele.translator.translator)], id: `${ele.requestId}-${ele.client}`, voteId: parseInt(ele.voteId)}})
        )
      } else {
          let nextI = i + 1
          arr.push(val)
          return getVotes(contract, nextI, arr)
      }
    }).catch(error =>{
      console.log('test',error)
      return
    })
  }
  getVotes(contract, 1)


  const handleSubmit = (e) => {
    e.preventDefault()
    openModal()
    const datas = new FormData(e.target)
    for(var entrie of datas.entries()){
      if(entrie[0]=="voteId"){
        setVoteId(entrie[1])
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
                <ModalVote voteId={voteId} />              
            </Modal>
          )
        }

        <div className='mb-10'>
          <h2 className="text-2xl">{props.title}</h2>
          
          <table className='table-auto w-full text-gray-600'>
              <thead className='bg-gray-100'>
                <tr className="border">
                  <th className="p-2">Translator</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody className="border">
                  {
                    myRequest.map((line, index) => 
                      <tr className="hover:bg-slate-50 text-center hover:cursor-pointer border-t-2" title="click to view more" key={index} onClick={openModal}>
                        {
                          line.content.map(col =>
                            <td className="p-2" key={`${line.id}-${col}`}>{col}</td>
                          )
                        }
                        <td className="p-2">
                          {
                            line.rejected 
                            ? (
                              <Button content="Vote already rejected" type="" />
                            )
                            : line.yes > 2
                            ? (
                              <Button content="Vote already approved" type="success" />
                            )
                            : (
                              <form onSubmit={handleSubmit}>
                                <input type="hidden" name="voteId" value={line.voteId} />
                                <span>
                                  <Button content="Vote" type="primary" />
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

export default TablePendingTranslator