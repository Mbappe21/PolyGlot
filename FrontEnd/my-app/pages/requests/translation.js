import DashboardLayout from "../../components/dashboardLayout"
import RequestHeaderLayout from "../../components/requestHeader"
import Button from "../../components/button"
import BackToDashboardButton from "../../components/backDashboard"
import Modal from "../../components/modal"

import { useContract, useSigner } from "wagmi";
import { contractABI, ContractAddress } from "../../datas/constDatas";
import { useState } from "react";
import Card from "../../components/card"

import { ethers } from "ethers"
import IPFSUploadFile from "../../components/ipfsUploadField"


async function retrieve (cid) {
    const client = makeStorageClient()
    const res = await client.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
        throw new Error(`failed to get ${cid}`)
    } else {
        const files = await res.files(); 
        for (const file of files) {
        console.log(file);
        }
    }

}


const Translation = (props) => {

    const { data: signer } = useSigner()

    const [lang1, setLang1] = useState({value: '', valid: false})
    const [lang2, setLang2] = useState({value: '', valid: false})
    const [cid, setCID] = useState()
    const [isSuccess, setIsSuccess] = useState(false)
    const [hidden, setHidden] = useState(true)


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
        console.log(signer)
        console.log(contract)
        if(lang1.valid && lang2.valid && cid){
            contract.requestTranslation(cid, lang1.value, lang2.value, {value: ethers.utils.parseEther("0.02")})
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
                <RequestHeaderLayout title="Request for translation">
                    Complete the form and submit your request for translation
                </RequestHeaderLayout>
                <div className="">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center py-6">

                            <div className="my-3 w-2/3">
                                <label htmlFor="lang1" className="text-md">Document language</label>
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
                            <div className="my-3 w-2/3">
                                <IPFSUploadFile setCID={setCID} cid={cid} label="Document to translate" />
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

export default Translation