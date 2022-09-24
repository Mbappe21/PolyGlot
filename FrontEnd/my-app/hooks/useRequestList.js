import { useContract, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../datas/constDatas"


export const useRequestList = () => {

    const { data: signer } = useSigner()
    const contract = useContract({
      addressOrName: ContractAddress,
      contractInterface: contractABI,
      signerOrProvider: signer
    })

    const isNullAddr = (addr) => {
        return parseInt(addr.slice(2)) === 0 ? true : false
      }
    let arr = []
    const getRequests = (contract, i, arr) => {
        return contract.findRequest(i)
            .then(val => {
            if(isNullAddr(val[0]["_hex"])){
                return arr
            } else {
                let nextI = i + 1
                arr.push(val)
                return getRequests(contract, nextI, arr)
            }
            })
            .catch(error =>{
            console.log('test',error)
            return
            })

    }
    getRequests(contract, 1, arr)

    console.log("arr test : ", arr[0])
    return arr
    
}