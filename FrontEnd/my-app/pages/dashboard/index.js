import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboardLayout';
import CardLink from '../../components/cardLink';
import RequestHeaderLayout from '../../components/requestHeader';
import { useAccount, useContract, useSigner } from 'wagmi';
import { contractABI, ContractAddress } from '../../datas/constDatas';
import TableGetTranslation from '../../components/tableGetTranslation';
import { isNullAddr } from '../../utils/functions';
import TableSubmitTranslation from '../../components/tableSubmitTranslation';
import TablePendingTranslator from '../../components/tablePendingTranslator';
import TableJugeTranslation from '../../components/tableJugeTranslation';


const Dashboard = () => {

  const [pendingTrans, setPendingTrans] = useState({ is: false, check: false})

  const {data: signer} = useSigner()
  const { address } = useAccount()

  const contract = useContract({
    addressOrName: ContractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer
  })
  
  if(!pendingTrans.check){
    contract.findPendingTranslator(address)
    .then(val => {
      if(isNullAddr(val[0])){
        setPendingTrans({ is: false, check: false})
      } else {
        setPendingTrans({ is: true, check: true, nOfRequest: val.nOfRequest})
      }
    }).catch(err =>{
      console.log(err)
    })

  }

    return (
        
        <div>          
          <DashboardLayout>
          <div className="bg-white">
              <RequestHeaderLayout title="Dashboard">

              </RequestHeaderLayout>
                <div className="px-32">
                    {pendingTrans.is
                      ? (
                        <div className='mb-10'>
                            <h2 className="text-2xl">Information</h2>
                            <div className="text-gray-500 ml-4 mt-2 font-semibold w-3/5">
                                <p >You have applied for translator role, your request is processing.</p>
                                <p className='text-2xl text-gray-600'>Number of test document receive : {parseInt(pendingTrans.nOfRequest) ?parseInt(pendingTrans.nOfRequest) : 0}</p>
                            </div>
                        </div>
                      ) : ''

                    }
                    {/* <!--use global state to verify--> */}
                    <TableJugeTranslation title="test juge translation" />
                    <TablePendingTranslator title="test" />
                    {/* <TableSubmitTranslation title="My Requests for translation accept" /> */}
                    {/* <TableGetTranslation title="My Requests translation emmit" /> */}

                     
                    


                    <div className="mb-3">
                        <div className="flex justify-center gap-4">
                          <CardLink cardTitle="Become a translator" href="/requests/becometranslator">
                            <p>Start earn money by offering a translator service</p>
                          </CardLink>
                          <CardLink cardTitle="Get documentation" href="/request/translation">
                            <p>Consult web3 documentation in many languages</p>
                          </CardLink>
                          <CardLink cardTitle="Ask for translation" href="/request/translation">
                            <p>Request to ask translation for your documents</p>
                          </CardLink>
                        </div>
                    </div>

                </div>
            </div>
          </DashboardLayout>
        </div>
    );
}

export default Dashboard;
