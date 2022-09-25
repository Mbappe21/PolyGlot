import { useState } from "react"
import { useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import Button from "../button"
import Card from "../card"
import IPFSUploadFile from "../ipfsUploadField"
import Modal from "../modal"
import ModalCard from "./ModalCard"



const SubmitTranslationButton = () =>{

    const [hidden, setHidden] = useState(true)
    const [value, setValue] = useState('')
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

    const submitTranslation = (e) => {
      e.preventDefault()
      contract.submitTranslation(value, cid)
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
                    </div>
                    <div className="flex flex-col w-2/3 items-center h-[500px] justify-center">
                      <IPFSUploadFile setCID={setCID} cid={cid} label="Document to translate"/>
                      <span onClick={submitTranslation}>
                        <Button type="primary" content="Submit translation" />
                      </span>
                    </div>
                  </div>
                </div>
              </ModalCard>
            </Modal>
          )
        }

            <span onClick={() => setHidden(false)}>
                <Card cardTitle="Submit a translation" href="/requests/becometranslator">
                    <p> Have you work on translation, submit it </p>
                </Card>
            </span>
        </div>
    )
}

export default SubmitTranslationButton