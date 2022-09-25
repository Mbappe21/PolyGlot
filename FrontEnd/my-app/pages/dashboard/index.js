import React, { useContext, useState } from 'react';
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
import { RoleContext, RoleProvider } from '../../contexts/role';
import { get20Request } from '../../datas/get20Requests';
import VoteTranslatorButton from '../../components/nteractButtons/voteTranslator';
import GiveTestTranslationButton from '../../components/nteractButtons/giveTestTranslation';
import SubmitTranslationButton from '../../components/nteractButtons/submitTranslation';
import ApproveTranslationButton from '../../components/nteractButtons/approveTranslation';
import RecollectFundsButton from '../../components/nteractButtons/recollectFunds';
import CollectRequestButton from '../../components/nteractButtons/collectRequest';
import PaidForApprovedButton from '../../components/nteractButtons/paidForApproved';
import PaidForDenied from '../../components/nteractButtons/paidForDenied';
import PaidForDeniedButton from '../../components/nteractButtons/paidForDenied';
import PaidTranslatorButton from '../../components/nteractButtons/paidTranslator';
import Button from '../../components/button';
import InfoModalButton from '../../components/nteractButtons/InfosModal';


const Dashboard = () => {
    return (
        <div>          
          <DashboardLayout>
          <div className="bg-white mb-5">
              <RequestHeaderLayout title="Dashboard">
                All your management here
              </RequestHeaderLayout>
                <div className="px-32">
                  <div className="mb-10 mt-10">
                    <h1 className='text-center text-2xl mb-3'>Get Started</h1>
                      <div className="flex justify-center gap-4">
                        <CardLink cardTitle="Become a translator" href="/requests/becometranslator">
                          <p>Start earn money by offering a translator service</p>
                        </CardLink>
                        <CardLink cardTitle="Get documentation" href="/dashboard/documentation">
                          <p>Consult web3 documentation in many languages</p>
                        </CardLink>
                        <CardLink cardTitle="Ask for translation" href="/requests/translation">
                          <p>Request to ask translation for your documents</p>
                        </CardLink>
                      </div>
                  </div>
                  <h1 className='text-center text-2xl mb-3'>For validators</h1>
                    <div className="mb-3">
                        <div className="grid grid-cols-3 gap-4">
                          <InfoModalButton/>
                        </div>
                    </div>
                <h1 className='text-center text-2xl mb-3'>Functionality</h1>
                    <div className="mb-3">
                        <div className="grid grid-cols-3 gap-4">
                          <VoteTranslatorButton/>
                          <GiveTestTranslationButton/>
                          <SubmitTranslationButton/>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="grid grid-cols-3 gap-4">
                          <ApproveTranslationButton/>
                          <RecollectFundsButton/>
                          <CollectRequestButton/>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="grid grid-cols-3 gap-4">
                          <PaidForApprovedButton/>
                          <PaidForDeniedButton/>
                          <PaidTranslatorButton/>
                        </div>
                    </div>                   
                </div>
            </div>
          </DashboardLayout>
        </div>
    );
}

export default Dashboard;
