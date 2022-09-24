import { useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"
import Button from "./button"


const ModalCollectFunds = (props) => {

    const {data: signer} = useSigner()
  
    const contract = useContract({
      addressOrName: ContractAddress,
      contractInterface: contractABI,
      signerOrProvider: signer
    })

    const collectFunds = (e) => {
        e.preventDefault()
        if(props.currentRequestId){
            contract.getPaidTranslator(props.currentRequestId)
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
                    {props.approvals > 2
                        ? (
                            <span onClick={collectFunds}>
                                <Button type="success" content="Collect funds"/>
                            </span>
                        )
                        : ''
                    }
                </div>
            </div>
            <div className="text-center text-lg text-gray-600 mt-2">
                {props.approvals > 2
                    ? "Collect your funds"
                    : "You may collect your funds after to approvals"
                }
            </div>
        </div>
    )
}

export default ModalCollectFunds