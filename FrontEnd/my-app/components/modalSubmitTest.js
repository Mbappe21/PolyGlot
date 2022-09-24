import { useState } from "react"
import { useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"
import Button from "./button"
import IPFSUploadFile from "./ipfsUploadField"


const ModalSubmitTest = (props) => {

    const [cid, setCID] = useState('')
    const {data: signer} = useSigner()
  
    const contract = useContract({
      addressOrName: ContractAddress,
      contractInterface: contractABI,
      signerOrProvider: signer
    })
     
    const handleTranslationSubmit = (e) => {
        e.preventDefault()
        if(cid && props.pendingTranslator){
            console.log(props.pendingTranslator)
            contract.giveTestTranslation(props.pendingTranslator, cid, props.docLang, props.langNeeded)
            .then(val => {
                console.log(val)
                setCID('')
            }) .catch(err => {
                console.log(err)
            })
        }
    }

    return(
        <div className="hover:bg-slate-50 hover:cursor-pointer drop-shadow text-center border w-full p-3 rounded-md bg-white">
            <div className="border-b-4 p-3 text-start">
                <h5 className=" font-semibold text-lg text-center">Give a test</h5>
                <form onSubmit={handleTranslationSubmit}>
                    <div className="flex flex-col">
                    <IPFSUploadFile setCID={setCID} cid={cid} label="Document to translate" />
                    <Button type="primary" content="Test traductor" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalSubmitTest