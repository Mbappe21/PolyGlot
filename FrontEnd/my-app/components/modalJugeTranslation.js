import Link from "next/link"
import { useState } from "react"
import { useAccount, useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"
import Button from "./button"


const ModalJugeTranslation = (props) => {

    const [hasApproved, setHasApproved] = useState(false)
    const [hasDenied, setHasDenied] = useState(false)

    const {data: signer} = useSigner()
    const { address } = useAccount()
  
    const contract = useContract({
      addressOrName: ContractAddress,
      contractInterface: contractABI,
      signerOrProvider: signer
    })
 

    const approveTranslation = () => {
        if(props.currentRequestId){
            contract.ApproveTranslation(props.currentRequestId)
            .then(val => {
                console.log(val)
            }) .catch(err => {
                console.log(err)
            })
        }
    }

    contract.hasApproved(address, props.currentRequestId)
    .then(val => setHasApproved(true))
    .catch(err => console.log(err))

    console.log('approved',hasApproved)

    contract.hasDenied(address, props.currentRequestId)
    .then(val => setHasDenied(true))
    .catch(err => console.log(err))

    const getPaidAfterApproval = () => {
        contract.getPaidAfterApproval(props.currentRequestId)
        .then(val => console.log(val))
        .catch(err => console.log(err))
    }

    const getPaidAfterDenial = () => {
        contract.getPaidAfterApproval(props.currentRequestId)
        .then(val => console.log(val))
        .catch(err => console.log(err))
    }

    const denyTranslation = () => {
        if(props.currentRequestId){
            contract.denyTranslation(props.currentRequestId)
            .then(val => {
                console.log(val)
            }) .catch(err => {
                console.log(err)
            })
        }
    }

    return(
        <div className="hover:bg-slate-50 hover:cursor-pointer drop-shadow text-center border w-full p-3 rounded-md bg-white">
            {

                props.stage !== 5 && props.stage !== 4 && !hasDenied && !hasApproved
                ?(
                    <>
                        <div className="border-b-4 p-3 text-start">
                            <h5 className=" font-semibold text-lg text-center">Juge the work</h5>
                            <div className="text-center">
                                <span onClick={approveTranslation}>
                                    <Button type="success" content="Approve"/>
                                </span>
                                <span onClick={denyTranslation}>
                                    <Button type="" content="Reject"/>
                                </span>
                            </div>
                        </div>
                        <div className="text-center text-lg text-gray-600 mt-2">
                            <div className="flex justify-center mt-4">
                                <Link href={`https://${props.currentRequestIPFS}.ipfs.w3s.link`}>
                                <span>
                                    <Button content="Download file translate" type="primary" />
                                </span>
                                </Link>
                            </div>
                        </div>
                    </>
                )
                : props.stage === 5 && hasApproved
                ?(
                    <div className="border-b-4 p-3 text-start">
                        <h5 className=" font-semibold text-lg text-center">Good Job</h5>
                        <div className="text-center">
                            <span onClick={getPaidAfterApproval}>
                                <Button type="success" content="Get your reward"/>
                            </span>
                        </div>
                    </div>
                )
                : props.stage === 5 && hasDenied
                ?(
                    <div className="border-b-4 p-3 text-start">
                        <h5 className=" font-semibold text-lg text-center">Good Job</h5>
                        <div className="text-center">
                            <span onClick={getPaidAfterDenial}>
                                <Button type="success" content="Get your reward"/>
                            </span>
                        </div>
                    </div>
                )
                : hasApproved || hasDenied
                ? (
                    <div className="text-center text-lg text-gray-600 mt-2">
                        You already vote
                    </div>
                )
                : (
                    <div className="text-center text-lg text-gray-600 mt-2">
                        The request is closed
                    </div>
                )
            }
        </div>
    )
}

export default ModalJugeTranslation