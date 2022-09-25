import { useState } from "react"
import { useAccount, useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import { convertToLang } from "../../utils/functions"
import Button from "../button"
import Card from "../card"
import Modal from "../modal"
import ModalCard from "./ModalCard"



const PaidTranslatorButton = () =>{

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

    const searchTranslation= () =>{
      contract.findRequest(value)
      .then(val => setRequest(val))
      .catch(err => console.log(err))
    }

    const handleInput = (e) =>{
        setValue(e.target.value)
    }

    const getPaidTranslator = (e) => {
      e.preventDefault()
        contract.getPaidTranslator(parseInt(value))
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
                    <div className="flex flex-col w-2/3 items-center h-[500px] justify-center">
                    {
                        request && address === request.translator ? (
                        <div>
                           <p className="text-xl text-center font-bold mb-3">Get your paid for translation done</p>
                          <div className="text-center">
                            <p>Client: {request.client}</p>
                            <p>Translator: {request.translator}</p>
                            <p>Document Language: {convertToLang(request.docLang)}</p>
                            <p>Target Language: {convertToLang(request.langNeeded)}</p>
                            <p>Denials: {parseInt(request.denials)}</p>
                            <p>Approvals: {parseInt(request.approvals)}</p>
                            <p>Stage: {parseInt(request.stage)}</p>
                          </div>
                          <div className="text-center">
                            <span onClick={getPaidTranslator}>
                              <Button type="primary" content="Get paid"/>
                            </span>
                          </div>
                        </div>
                      ):"You have not work for this translation"
                    }
                    </div>
                  </div>
                </div>
                </ModalCard>
              
            </Modal>
          )
        }

            <span onClick={() => setHidden(false)}>
                <Card cardTitle="Get Pay">
                    <p>If you have work on traduction, get your paid </p>
                </Card>
            </span>
        </div>
    )
}

export default PaidTranslatorButton