import Link from "next/link"
import { useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"
import Button from "./button"
import IPFSUploadFile from "./ipfsUploadField"


const ModalSubmitTranslation = (props) => {

    const {data: signer} = useSigner()
  
    const contract = useContract({
      addressOrName: ContractAddress,
      contractInterface: contractABI,
      signerOrProvider: signer
    })

    const handleTranslationSubmit = (e) => {
        e.preventDefault()
        console.log("try to submit", props.cid, props.currentRequestId)
        if(props.cid && props.currentRequestId){
            contract.submitTranslation(props.currentRequestId, props.cid)
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
                <h5 className=" font-semibold text-lg text-center">Request details</h5>
                <form onSubmit={handleTranslationSubmit}>
                    <div className="flex flex-col">
                    <IPFSUploadFile setCID={props.setCID} cid={props.cid} label="Document translate" />
                    <Button type="primary" content="Submit my work" />
                    </div>
                </form>
            </div>
            <div className="flex justify-center mt-4">
                <Link href={`https://${props.currentRequestIPFS}.ipfs.w3s.link`}>
                <span>
                    <Button content="Download client document" type="primary" />
                </span>
                </Link>
            </div>
        </div>
    )
}

export default ModalSubmitTranslation