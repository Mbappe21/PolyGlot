import { createContext, useEffect, useState } from "react"
import { useAccount, useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"
import { isNullAddr } from "../utils/functions"



export const RoleContext = createContext()

export const RoleProvider = ({children}) => {
    const [isTranslator, setIsTranslator] = useState(false)
    const [isPendingTranslator, setIsPendingTranslator] = useState(false)
    const [isValidator, setIsValidator] = useState(false)

    const { signer } = useSigner()
    const { address } = useAccount()
    const contract = useContract({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
    })

    useEffect(() =>{

        const getUser = (contract) =>{
            contract.findTranslator(address)
            .then(val => {
                if(isNullAddr(val.translator)){
                    setIsTranslator(false)
                } else {
                    setIsTranslator(true)
                    if(val.validator){
                        setIsValidator(true)
                    } else {
                        setIsValidator(false)
                    }
                }
            }). catch (err => console.log(err))
    
        }
    
    
        contract.findPendingTranslator(address)
        .then(val => {
            console.log("val",val)
            if(isNullAddr(val.translator)){
                setIsPendingTranslator(false)
                console.log(val.translator)
            } else {
                console.log("test",val.translator)
                setIsPendingTranslator(true)
                setIsValidator(false)
                setIsTranslator(false)
            }
        }).catch(err => console.log(err))
    })

    return (
        <RoleContext.Provider value={{ isTranslator, isValidator, isPendingTranslator }}>
            {children}
        </RoleContext.Provider>
    )

}