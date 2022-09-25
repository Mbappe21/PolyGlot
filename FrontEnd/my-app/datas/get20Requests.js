import { useContractRead } from "wagmi"
import { contractABI, ContractAddress } from "./constDatas"

export const get20Request = () => {

    const request1 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 1
      })
    const request2 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 2
      })
    const request3 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 3
      })
    const request4 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 4
      })
    const request5 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 5
      })
    const request6 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 6
      })
    const request7 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 7
      })
    const request8 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 8
      })
    const request9 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 9
      })
    const request10 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 10
      })
    const request11 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 11
      })
    const request12 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 12
      })
    const request13 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 13
      })
    const request14 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 14
      })
      const request15 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 15
      })
      const request16 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 16
      })
      const request17 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 17
      })
      const request18 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 18
      })
      const request19 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 19
      })
      const request20 = useContractRead({
        addressOrName: ContractAddress,
        contractInterface: contractABI,
        functionName: 'findRequest',
        args: 20
      })

      return [
        request1.data, request2.data, request3.data, request4.data, request5.data,
        request6.data, request7.data, request8.data, request9.data, request10.data,
        request11.data, request12.data, request13.data, request14.data, request15.data,
        request16.data, request17.data, request18.data, request19.data, request20.data,
    ].filter(ele => parseInt(ele?.[0]["_hex"]) !== 0)
  }