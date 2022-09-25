import { useState } from "react"
import { useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import { convertToLang } from "../../utils/functions"
import Button from "../button"
import Card from "../card"
import IPFSUploadFile from "../ipfsUploadField"
import Modal from "../modal"
import ModalCard from "./ModalCard"



const GiveTestTranslationButton = () =>{

    const [hidden, setHidden] = useState(true)
    const [value, setValue] = useState('')
    const [pendingTranslator, setPendingTranslator] = useState()
    const [cid, setCID] = useState()


    const { data: signer } = useSigner()
    const contract = useContract({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer
    })

    const handleInput = (e) =>{
        setValue(e.target.value)
    }

    const searchTranslator = (userAddr) =>{
        contract.findPendingTranslator(userAddr)
        .then(val => setPendingTranslator(val))
        .catch(err => console.log(err))
    }

    const submitTest = (e) => {
      e.preventDefault()
      contract.giveTestTranslation(pendingTranslator.translator, cid, pendingTranslator.lang1, pendingTranslator.lang2)
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
                    <label>Pending translator address</label>
                      <input className="border-black rounded-md h-8 border-2" name="vote" value={value} onInput={handleInput}/>
                      <span onClick={()=>searchTranslator(value)}>
                        <Button type="primary" content="Search" />
                      </span>
                    </div>
                    <div className="flex flex-col w-2/3 items-center h-[500px] justify-center">
                      <p className="text-xl font-bold mb-3">Pending Translator</p>
                    {
                      pendingTranslator ? (
                        <div className="text-center">
                          <p className="font-bold">{pendingTranslator.translator}</p>
                          <p>Approvals: {parseInt(pendingTranslator.approvals)}</p>
                          <p>Denials: {parseInt(pendingTranslator.denials)}</p>
                          <p>Rejected: {(pendingTranslator.rejected) ? "Yes" : "No"}</p>
                          <p>Number of request: {parseInt(pendingTranslator.nOfRequests)}</p>
                          <p>Langue 1: {convertToLang(pendingTranslator.lang1)}</p>
                          <p>Langue 2: {convertToLang(pendingTranslator.lang2)}</p>
                          {(!pendingTranslator.rejected)
                            ?(
                              <div>
                                <IPFSUploadFile setCID={setCID} cid={cid} label="Document to translate"/>
                                <span onClick={submitTest}>
                                  <Button type="primary" content="Test" />
                                </span>
                              </div>
                            ):''
                          }
                          
                        </div>
                      ):"This member is not pending translator"
                    }
                    </div>
                  </div>
                </div>
              </ModalCard>
            </Modal>
          )
        }

            <span onClick={() => setHidden(false)}>
                <Card cardTitle="Give a test" href="/requests/becometranslator">
                    <p>Submit test translation to a pending translator</p>
                </Card>
            </span>
        </div>
    )
}

export default GiveTestTranslationButton