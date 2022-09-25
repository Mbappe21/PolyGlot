import Link from "next/link"
import { useState } from "react"
import { useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import { convertToLang } from "../../utils/functions"
import Button from "../button"
import Card from "../card"
import Modal from "../modal"
import ModalCard from "./ModalCard"



const ApproveTranslationButton = () =>{

    const [hidden, setHidden] = useState(true)
    const [value, setValue] = useState('')
    const [request, setRequest] = useState()

    const { data: signer } = useSigner()
    const contract = useContract({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer
    })

    const searchTranslation = () =>{
      contract.findRequest(value)
      .then(val => setRequest(val))
      .catch(err => console.log(err))
    }

    const handleInput = (e) =>{
        setValue(e.target.value)
    }

    const approveTranslation = (e) => {
      e.preventDefault()
      contract.approveTranslation(parseInt(request.requestId))
      .then(val => {
          console.log(val)
      }) .catch(err => {
          console.log(err)
      })
    }
    const denyTranslation = (e) => {
      e.preventDefault()
      contract.denyTranslation(parseInt(request.requestId))
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
                      <input className="border-black rounded-md h-8 border-2" name="vote" value={value} onInput={handleInput}/>
                      <span onClick={searchTranslation}>
                        <Button type="primary" content="Search" />
                      </span>
                    </div>
                    {
                      request ? (
                      <div className="flex flex-col w-2/3 items-center h-[500px] justify-center">
                        <p className="text-xl font-bold mb-3">Vote for a translation</p>
                        <div className="text-center">
                          <p>Client: {request.client}</p>
                          <p>Translator: {request.translator}</p>
                          <p>Document Language: {convertToLang(request.docLang)}</p>
                          <p>Target Language: {convertToLang(request.langNeeded)}</p>
                          <p>Denials: {parseInt(request.denials)}</p>
                          <p>Approvals: {parseInt(request.approvals)}</p>
                          <p>Stage: {parseInt(request.stage)}</p>
                        </div>
                          <div className="text-center text-lg text-gray-600">
                              <div className="flex justify-center mt-4">
                                  <Link href={`https://${request.description}.ipfs.w3s.link`}>
                                  <span>
                                      <Button content="Download file translate" type="primary" />
                                  </span>
                                  </Link>
                              </div>
                          </div>
                        <div className="p-3 text-start">
                            <div className="text-center">
                                <span onClick={approveTranslation}>
                                    <Button type="success" content="Approve"/>
                                </span>
                                <span onClick={denyTranslation}>
                                    <Button type="" content="Reject"/>
                                </span>
                            </div>
                        </div>
                        </div>
                      ):'No request found'
                    }

                  </div>
                </div>
              </ModalCard>
            </Modal>
          )
        }

            <span onClick={() => setHidden(false)}>
                <Card cardTitle="Approve translation">
                    <p> Vote if translation is correct or not </p>
                </Card>
            </span>
        </div>
    )
}

export default ApproveTranslationButton