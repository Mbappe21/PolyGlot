import { useState } from "react"
import { useAccount, useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import Button from "../button"
import Card from "../card"
import Modal from "../modal"
import ModalCard from "./ModalCard"



const PaidForApprovedButton = () =>{

    const [hidden, setHidden] = useState(true)
    const [value, setValue] = useState('')
    const [approved, setApproved] = useState()


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

    const hasApproved = () =>{
      contract.hasApproved(address, value)
      .then(val => setDenied(val))
      .catch(err => console.log(err))
    }

    const getPaidAfterApproval = (e) => {
      e.preventDefault()
        contract.getPaidAfterApproval(parseInt(value))
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
                      <span onClick={hasApproved}>
                        <Button type="primary" content="Search" />
                      </span>
                    </div>
                    <div className="flex flex-col w-2/3 items-center h-[500px] justify-center">
                      {
                        approved ? (
                            
                            <div>
                              <span onClick={getPaidAfterApproval}>
                                <Button type="success" content="Collect funds"/>
                              </span>
                            </div>
                        ):"You have not approuved this request"
                      }
                      </div>
                  </div>
              </div>
              </ModalCard>
            </Modal>
          )
        }

            <span onClick={() => setHidden(false)}>
                <Card cardTitle="Get Pay For Approve">
                    <p>If you have approved a request get your paid </p>
                </Card>
            </span>
        </div>
    )
}

export default PaidForApprovedButton