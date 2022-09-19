import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/mainLayout';
import DashboardLayout from '../../components/dashboardLayout';
import TableLayout from '../../components/tableLayout';
import CardLink from '../../components/cardLink';
import Card from '../../components/card';
import TableWithModal from '../../components/tableWithModal';
import RequestHeaderLayout from '../../components/requestHeader';


const Dashboard = () => {

  const headList = ["Doc language", "Target language", "Accepted by", "Stage"]

  const tableContent = [
    ["Bonjour", "Bonsoir", "Salut", "Au revoir"],
    ["Bonjour", "Bonsoir", "Salut", "Au revoir"],
    ["Bonjour", "Bonsoir", "Salut", "Au revoir"],
  ]


    return (
        
        <div>          
          <DashboardLayout>
          <div className="bg-white">
              <RequestHeaderLayout title="Dashboard">

              </RequestHeaderLayout>
                <div className="px-32">

                    <div className='mb-10'>
                        <h2 className="text-2xl">Information</h2>
                        <div className="text-gray-500 ml-4 mt-2 font-semibold w-3/5">
                            <p >You have applied for translator role, your request is processing.</p>
                        </div>
                    </div>

                    <TableWithModal title="test with modal" headList={headList} lines={tableContent}/>

                    <TableLayout title="My transaltion asked" headList={headList} lines={tableContent} />

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
