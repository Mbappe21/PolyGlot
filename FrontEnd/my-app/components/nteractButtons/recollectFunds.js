import { useState } from "react"
import { useAccount, useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import { convertToLang } from "../../utils/functions"
import Button from "../button"
import Card from "../card"
import Modal from "../modal"
import ModalCard from "./ModalCard"



const RecollectFundsButton = () =>{

    const [hidden, setHidden] = useState(true)
    const [value, setValue] = useState('')
    const [request, setRequest] = useState()


    const { data: signer } = useSigner()
    const { address } = useAccount()
    const contract = useContract({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer
    })

    const handleInput = (e) =>{
        setValue(e.target.value)
    }

    const searchTranslation = () =>{
      contract.findRequest(value)
      .then(val => setRequest(val))
      .catch(err => console.log(err))
    }

    const collectFunds = (e) => {
      e.preventDefault()
        contract.recollectFunds(parseInt(request.requestId))
        .then(val => {
            console.log(val)
        }) .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>

{
          hidden
          ? ''
          : (
            <Modal setHidden={setHidden}>
               <ModalCard>
                <div>
                  <div className="flex justify-between">
                    <div className="flex justify-center items-center border-black h-[500px]  flex-col w-1/3 broder">
                    <label>Request id</label>
                      <input className="border-black rounded-md h-8 border-2" type="number" name="vote" value={value} onInput={handleInput}/>
                    <span onClick={searchTranslation}>
                      <Button type="primary" content="Search" />
                    </span>
                    </div>
                    {
                      request && address === request.client  ? (
                        <div className="flex flex-col w-2/3 items-center h-[500px] justify-center">
                          <p className="text-xl font-bold mb-3">Collect your request</p>
                        <div className="text-center">
                          <p>Client: {request.client}</p>
                          <p>Translator: {request.translator}</p>
                          <p>Document Language: {convertToLang(request.docLang)}</p>
                          <p>Target Language: {convertToLang(request.langNeeded)}</p>
                          <p>Denials: {parseInt(request.denials)}</p>
                          <p>Approvals: {parseInt(request.approvals)}</p>
                          <p>Stage: {parseInt(request.stage)}</p>
                        </div>
                        <div>
                          <span onClick={collectFunds}>
                            <Button type="success" content="Collect funds"/>
                          </span>
                        </div>
                        </div>
                      ):"You're not the client of this request"
                    }

                    </div>
                </div>
                </ModalCard>              
            </Modal>
          )
        }

            <span onClick={() => setHidden(false)}>
                <Card cardTitle="Recolleect Funds">
                    <p>If your transaltion is not correct, recollect your funds</p>
                </Card>
            </span>
        </div>
    )
}

export default RecollectFundsButton