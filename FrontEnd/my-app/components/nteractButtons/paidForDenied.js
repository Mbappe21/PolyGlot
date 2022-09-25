import { useState } from "react"
import { useAccount, useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import Button from "../button"
import Card from "../card"
import Modal from "../modal"
import ModalCard from "./ModalCard"



const PaidForDeniedButton = () =>{

    const [hidden, setHidden] = useState(true)
    const [value, setValue] = useState('')
    const [denied, setDenied] = useState()


    const { data: signer } = useSigner()
    const { address } = useAccount()
    const contract = useContract({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer
    })

    const handleInput = (e) =>{
        setValue(e.target.value)
    }

    const hasDenied = () =>{
      contract.hasDenied(address, value)
      .then(val => setDenied(val))
      .catch(err => console.log(err))
    }

    const getPaidAfterDenial = (e) => {
      e.preventDefault()
        contract.getPaidAfterDenial(parseInt(value))
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
                    <input className="border-black rounded-md h-8 border-2" type="number" name="vote" value={value} onInput={handleInput}/>
                    <span onClick={hasDenied}>
                      <Button type="primary" content="Search" />
                    </span>
                    </div>
                    <div className="flex flex-col w-2/3 items-center h-[500px] justify-center">
                    {
                        denied ? (
                        <div>
                          <span onClick={getPaidAfterDenial}>
                            <Button type="success" content="Collect funds"/>
                          </span>
                        </div>
                      ):"You have not denied this request"
                    }
                    </div>
                  </div>
                  </div>
                  </ModalCard>
            
              
            </Modal>
          )
        }

            <span onClick={() => setHidden(false)}>
                <Card cardTitle="Get Pay For Deny">
                    <p>Give a test </p>
                </Card>
            </span>
        </div>
    )
}

export default PaidForDeniedButton