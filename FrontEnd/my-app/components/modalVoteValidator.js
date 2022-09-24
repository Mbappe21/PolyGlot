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

    const voteValidator = (vote) => {
        if(props.pendingTranslator){
            contract.voteValidator(props.voteId, vote)
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
                <h5 className=" font-semibold text-lg text-center">Your vote</h5>
                <div className="text-center">
                    <span onClick={() => voteValidator(true)}>
                        <Button type="success" content="Approve"/>
                    </span>
                    <span onClick={() => voteValidator(false)}>
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