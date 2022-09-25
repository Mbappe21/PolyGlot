import { useState } from "react"
import Card from "../card"
import Modal from "../modal"
import ModalCard from "./ModalCard"
import Image from "next/image"



const InfoModalButton = () =>{

    const [hidden, setHidden] = useState(true)

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
                  <div className="flex justify-center items-center border-black h-[500px]  flex-col w-full broder">
                    <h1>JOIN EPNS CHANNEL</h1>
                    <Image width={200} height={200} src="/epns.png"/>
                      <ol>
                        <li> Connect your Metamask to: https://staging.epns.io/#/channels </li >
                        <li> Opt-in the “New notifications” channel </li>
                        <li> Download the EPNS Chrome extension and add your wallet address to receive updates https://chrome.google.com/webstore/detail/epns-protocol-alpha/lbdcbpaldalgiieffakjhiccoeebchmg </li>
                      </ol>
                    </div>
                  </div>
              </div>
              </ModalCard>
            </Modal>
          )
        }

            <span onClick={() => setHidden(false)}>
                <Card cardTitle="Get Pay For Approve">
                    <p>Give a test </p>
                </Card>
            </span>
        </div>
    )
}

export default InfoModalButton