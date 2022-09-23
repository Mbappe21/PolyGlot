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

    const [lang1, setLang1] = useState({value: '', valid: false})
    const [lang2, setLang2] = useState({value: '', valid: false})
    const [isSuccess, setIsSuccess] = useState(false)
    const [hidden, setHidden] = useState(true)
    const [isVerifyWorldId, setIsVerifyWorldId] = useState(false)

    const worldIdError = () => {
        setIsVerifyWorldId(false)
    }

    const worldIdSuccess = () => {
        setIsVerifyWorldId(true)
    }

    const handleChange1 = (e) => {
        const value = parseInt(e.target.value)
        const valid = value ? true : false
        setLang1({value: value, valid: valid})
    }
    
    const handleChange2 = (e) => {
        const value = parseInt(e.target.value)
        const valid = value ? true : false
        setLang2({value: value, valid: valid})
    }

    const contract = useContract({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(lang1, lang2)
        if(isVerifyWorldId && lang1.valid && lang2.valid){
            contract.applyForTranslatorRole(lang1, lang2)
            .then((val) =>{
                console.log(val)
                setIsSuccess(true)
                setHidden(true)
            })
            .catch(err => {
                console.log(err)
                setIsSuccess(false)
                setHidden(false)
            })
        } 
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
                <RequestHeaderLayout title="Become translator">
                  <p className="text-gray-600 text-lg">Complete the form and apply to become translator</p>
                  <div className="text-center text-gray-500 ml-4 mt-2 font-semibold w-3/5">
                      <p >On applying, you'll receive three documents to translate for validators. If all of your translations are approved, you'll become a translator.</p>
                  </div>
                </RequestHeaderLayout>
                <div className="">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center py-6">
                            <div className="my-3 w-2/3">
                                <label htmlFor="lang1" className="text-md">Your current language</label>
                                <select name="lang1" onChange={handleChange1} className="border block w-full p-2 shadow-inner bg-white" id="">
                                    <option>select language 1</option>
                                    <option value="1">English</option>
                                    <option value="2">French</option>
                                    <option value="3">Lingala</option>
                                </select>
                                {
                                    !lang1.valid
                                    ? <span className="text-red-500 text-md mt-2 text-center">Select language</span>
                                    : ''
                                }
                            </div>
                            <div className="my-3 w-2/3">
                                <label htmlFor="lang2" className="text-md">Language applied for</label>
                                <select name="lang2" onChange={handleChange2}  className="border block w-full p-2 shadow-inner bg-white" id="">
                                    <option>select language 2</option>
                                    <option value="1">English</option>
                                    <option value="2">French</option>
                                    <option value="3">Lingala</option>
                                </select>
                                {
                                    !lang2.valid
                                    ? <span className="text-red-500 text-md mt-2 text-center">Select language</span>
                                    : ''
                                }
                            </div>
                            <div className="my-3">
                                <WorldIDWidget
                                    actionId="wid_BPZsRJANxct2cZxVRyh80SFG" 
                                    signal="my_signal"
                                    enableTelemetry
                                    onSuccess={(verificationResponse) => worldIdSuccess()}
                                    onError={(error) => worldIdError()}
                                />
                                {
                                    isVerifyWorldId 
                                    ? <span className="text-green-500 text-lg mt-2 text-center">Verify</span>
                                    : <span className="text-red-500 text-lg mt-2 text-center">You must verify with world id</span>
                                }
                            </div>
                            <div className="my-3 flex justify-between">
                                <Button type="primary" content="Apply"/>
                                <BackToDashboardButton/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default BecomeTranslator