import { useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"
import Button from "./button"


const ModalVote = (props) => {

    const {data: signer} = useSigner()
  
    const contract = useContract({
      addressOrName: ContractAddress,
      contractInterface: contractABI,
      signerOrProvider: signer
    })

    const voteTranslator = (vote) => {
        console.log(props.pendingTranslator)
        if(props.pendingTranslator){
            contract.voteTranslator(props.pendingTranslator, vote)
            .then(val => {
                console.log(val)
            }) .catch(err => {
                console.log(err)
            })
        }
    }

    return(
        <div className="hover:bg-slate-50 hover:cursor-pointer drop-shadow text-center border w-full p-3 rounded-md bg-white">
            <div className="border-b-4 p-3 text-start">
                <h5 className=" font-semibold text-lg text-center">Request details</h5>
                <div className="flex justify-between">
                    <div className="mx-16 text-3xl font-semibold text-green-500 flex flex-col items-center">
                        <h5 className="">Approvals</h5>
                        <p>{props.approvals}</p>
                    </div> 
                    <div className="mx-16 text-3xl font-semibold text-red-500 flex flex-col items-center">
                        <h5 className="">Denials</h5>
                        <p>{props.denials}</p>
                    </div> 
                </div>
                <div className="text-center">
                    <span onClick={() => voteTranslator(true)}>
                        <Button type="success" content="Approve"/>
                    </span>
                    <span onClick={() => voteTranslator(false)}>
                        <Button type="" content="Reject"/>
                    </span>
                </div>
            </div>
            <div className="text-center text-lg text-gray-600 mt-2">
                Approve or deny
            </div>
        </div>
    )
}

export default ModalVote