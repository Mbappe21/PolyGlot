import Link from "next/link"
import { useContext, useState } from "react"
import { useAccount, useContract, useContractRead, useSigner } from "wagmi"
import { DataContext } from "../contexts/dataContext"
import { contractABI, ContractAddress } from "../datas/constDatas"
import { get20Request } from "../datas/get20Requests"
import { convertToLang, displayAddr, isNullAddr } from "../utils/functions"
import Button from "./button"
import Modal from "./modal"

const TableGetTranslation = (props) => {
  const [pendingTrans, setPendingTrans] = useState({ is: false, check: false})

  const {data: signer} = useSigner()
  const { address } = useAccount()

  const contract = useContract({
    addressOrName: ContractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  })

  const requests =  props.requests.filter(ele => ele?.client === address)
  .map(ele => 
    { return ele === undefined 
      ? {content: [], }
      : {content: 
        [convertToLang(ele?.docLang), convertToLang(ele?.langNeeded), displayAddr(ele?.translator), parseInt(ele?.stage)], 
        client: ele?.client, 
        id: `${ele?.requestId}-${ele?.client}`, 
        ipfs: ele?.description, 
        approvals: ele?.approvals, 
        stage: ele?.stage}
      })



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
  
  return (
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
                  requests?.map((line, index) => 
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