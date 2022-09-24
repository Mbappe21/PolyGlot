import RequestHeaderLayout from "../../components/requestHeader"
import DashboardLayout from "../../components/dashboardLayout"
import { useContract, useContractRead, useSigner } from "wagmi"
import { contractABI, ContractAddress } from "../../datas/constDatas"
import { useEffect, useState } from "react"
import Card from "../../components/card"
import Button from "../../components/button"
import { CIDS } from "../../datas/ipfsLink"
import Link from "next/link"
import Modal from "../../components/modal"
import Image from "next/image"


const Documentation = (props) => {

 const cids = CIDS
 const [hidden, setHidden] = useState(true)
 const [qrcode, setQrcode] = useState()

 const openModal = (qrcode) => {
  setQrcode(qrcode)
  setHidden(false)
 }
  

  return (
    <DashboardLayout>
      {
        !hidden
        ? (
            <Modal setHidden={setHidden}>
                <Card>
                    <span>
                        <Image
                         src={"/qrcodes/"+qrcode+".png"} width={200} height={200} />
                    </span>
                </Card>
            </Modal>
        )
        : ''
      }
        <div className="w-full h-full text-black p-5 overflow-auto">
          <RequestHeaderLayout title="Documentation">
            Explore our documetation about web3 universe.
          </RequestHeaderLayout>
          <div className="grid grid-cols-3 gap-2 px-32" id="card-container">
            {
              cids.map(val => (
                <Card cardTitle={val.title} key={val.cid}>
                  <div className="flex justify-center">
                    <Link href={`https://${val.cid}.ipfs.w3s.link`} target="blank">
                        <span>
                            <Button content="Read" type="primary" />
                        </span>
                    </Link>
                    <span onClick={() => openModal(val.qrcode)}>
                      <Button content="QR CODE" type="secondary" />
                    </span>
                  </div>
                </Card>                 
              ))
            }
          </div>
        </div>
        <scrip>
          
        </scrip>
    </DashboardLayout>
  )
}

export default Documentation