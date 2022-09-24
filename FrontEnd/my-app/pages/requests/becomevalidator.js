import DashboardLayout from "../../components/dashboardLayout"
import RequestHeaderLayout from "../../components/requestHeader"
import Button from "../../components/button"
import BackToDashboardButton from "../../components/backDashboard"
import Modal from "../../components/modal"

import dynamic from 'next/dynamic';
import { useContract, useSigner } from "wagmi";
import { contractABI, ContractAddress } from "../../datas/constDatas";
import { useState } from "react";
import Card from "../../components/card"

const WorldIDWidget = dynamic(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);

const BecomeTranslator = (props) => {

    const { data: signer} = useSigner()

    const [hidden, setHidden] = useState(true)    

    const contract = useContract({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        contract.applyForValidatorRole()
        .then((val) => console.log(val))
        .catch(err => console.log(err))
    }

    return (
        <DashboardLayout>
            {
                !hidden
                ? (
                    <Modal setHidden={setHidden}>
                        <Card>
                        {
                            isSuccess
                            ? (
                                <span>
                                    <p className="text-green-500 text-lg mt-2 text-center">
                                        Your apply is registered 
                                    </p>
                                    <BackToDashboardButton/>
                                </span>
                            )
                            : (
                                <span>
                                    <p className="text-red-500 text-lg mt-2 text-center">
                                        An error occured 
                                    </p>
                                </span>
                            )
                        }
                        </Card>
                    </Modal>
                )
                : ''
            }
            <div className="w-full h-full text-black p-5 overflow-auto">
                <RequestHeaderLayout title="Become Validator">
                  <p className="text-gray-600 text-lg">Apply to become validator</p>
                </RequestHeaderLayout>
                <p></p>
                <div className="">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center py-6">
                            <button className="hover:scale-105 active:scale-95 text-5xl text-white px-6 py-3 bg-blue-900 rounded-full drop-shadow-md">BECOME VALIDATOR</button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default BecomeTranslator