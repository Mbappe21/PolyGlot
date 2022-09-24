import Link from "next/link"
import { useState } from "react"
import { useAccount, useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"
import { convertToLang, displayAddr, isNullAddr } from "../utils/functions"
import Button from "./button"
import Modal from "./modal"

const TableGetTranslation = (props) => {
  const [requestList, setRequestList] = useState({rList: [], fetchL: true})
  const [myRequest, setMyRequest] = useState([])
  const [pendingTrans, setPendingTrans] = useState({ is: false, check: false})

  const {data: signer} = useSigner()
  const { address } = useAccount()

  const contract = useContract({
    addressOrName: ContractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  })

  if(!pendingTrans.check){
    contract.findPendingTranslator(address)
    .then(val => {
      if(isNullAddr(val[0])){
        setPendingTrans({ is: false, check: false})
      } else {
        setPendingTrans({ is: true, check: true, nOfRequest: val.nOfRequest})
      }
    }).catch(err =>{
      console.log(err)
    })

  }

  const getRequests = (contract, i, arr=[]) => {
    contract.findRequest(i)
    .then(val => {
      if(isNullAddr(val[0]["_hex"]) && requestList.fetchL){
        setRequestList({rList: arr, fetchL: false})
        setMyRequest(arr.filter(ele => ele.client === address)
        .map(ele => { return {content: [convertToLang(ele.docLang), convertToLang(ele.langNeeded), 
          displayAddr(ele.translator), parseInt(ele.stage)], client: ele.client, id: `${ele.requestId}-${ele.client}`, ipfs: ele.description, approvals: ele.approvals, stage: ele.stage}})
        )
        console.log(arr)
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

  const recollectFunds = (requestId) =>{
    contract.recollectFunds(requestId)
    .then(val => {
      console.log(val)
    }).catch(err => {
      console.log(err)
    })
  }

  const collectRequest = (requestId) => {
    contract.collectRequest(requestId)
    .then(val => {
      console.log(val)
    }).catch(err => {
      console.log(err)
    })
  }

  return (myRequest &&
    <div>
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
                    <tr className="hover:bg-slate-50 text-center hover:cursor-pointer border-t-2" key={`${line.requestId}-${index}`}>
                      {
                        line.content.map(col =>
                          <td className="p-2" key={`${line.requestId}-${col}`}>{col}</td>
                        )
                      }
                      <td className="p-1">
                        {
                          isNullAddr(line.client) && line.approvals > 2 && pendingTrans.is
                          ?(
                            <span onClick={() => collectRequest(line.requestId)}>
                              <Button type="primary" content="Collect Request" />
                            </span>
                          )
                          : line.stage === 5
                          ?(
                            <span onClick={() => recollectFunds(line.requestId)}>
                              <Button type="danger" content="Recolt my funds" />
                            </span>
                          )
                          :(
                            <Link href={line.stage==4 ?`https://${line.ipfs}.ipfs.w3s.link` : ''}>
                              <span>
                                <Button content="Download" disabled={line.approvals!==4 ? true : false} type={line.approvals>1 ? 'success' : ''} />
                              </span>
                            </Link>
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

export default TableGetTranslation