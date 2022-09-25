import { useState } from "react"
import { useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import Button from "../button"
import Card from "../card"
import Modal from "../modal"
import ModalCard from "./ModalCard"



const VoteTranslatorButton = () =>{

    const [hidden, setHidden] = useState(true)
    const [value, setValue] = useState('')
    const [vote, setVote] = useState()


    const { data: signer } = useSigner()
    const contract = useContract({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer
    })

    const handleInput = (e) =>{
        setValue(e.target.value)
    }

    const voteTranslator = (userAddr, vote) =>{
        contract.voteTranslator(userAddr, vote)
        .then(val => console.log(val))
        .catch(err => console.log(err))
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
                    <label>Translator address</label>
                      <input className="border-black rounded-md h-8 border-2" name="vote" value={value} onInput={handleInput}/>
                      <span onClick={()=>voteTranslator(value, vote)}>
                        <Button type="primary" content="Vote" />
                      </span>
                      <span onClick={()=>setVote(true)}>
                        <Button type="primary" content="Approve" />
                      </span>
                      <span onClick={()=>setVote(false)}>
                        <Button type="primary" content="Reject" />
                      </span>
                    </div>
                    </div>
                  </div>
                </ModalCard>
 
            </Modal>
          )
        }

            <span onClick={() => setHidden(false)}>
                <Card cardTitle="Vote a translator" href="/requests/becometranslator">
                    <p>Vote for new translator </p>
                </Card>
            </span>
        </div>
    )
}

export default VoteTranslatorButton