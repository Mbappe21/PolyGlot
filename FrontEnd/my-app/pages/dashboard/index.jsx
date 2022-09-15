import React from 'react';
import Card from '../../component/card';
import Nav from '../../component/nav';
import Link from 'next/link';


const Index = () => {
    const data = {
        "name": "For python web service" ,
        "min_desc": ""
    }

    return (
        <div>
            <div className='bg-blue-900 px-8 mb-3'>
                <Nav />
                <div className="flex justify-center my-2 text-black p-2 rounded-lg border bg-white">
                    <ul className="flex justify-center gap-2">
                        <li className="mx-4">
                            <Link href="/dashboard/">Dashboard</Link>
                        </li>
                        <li className="mx-4">
                            <Link href="/requests/list/">Clients requests</Link>
                        </li>
                        <li className="mx-4">
                            <a href="">Documentation</a>
                        </li>
                        <li className="mx-4">
                            <Link href="/requests/translation/">Request for translation</Link>
                        </li>
                    </ul>                
                </div> 
            </div>
            

            <div>
                <div className="flex flex-col items-center justify-center mb-10">
                    <h1 className="text-4xl">Dashboard</h1>
                    {/* <p className="text-gray-600 text-lg">Complete the form and submit your request for translation</p> */}
                </div>
                <div className="px-32">

                    <div className='mb-10'>
                        <h2 className="text-2xl">Information</h2>
                        <div className="text-gray-500 ml-4 mt-2 font-semibold w-3/5">
                            <p >You have applied for translator role, your request is processing.</p>
                        </div>
                    </div>

                    <div className='mb-10'>
                        <h2 className="text-2xl">Mes dernières requettes</h2>
                        <table className='table-auto w-full text-gray-600'>
                            <thead className='bg-gray-100'>
                                <tr className="border">
                                    <th className="p-2">Doc language</th>
                                    <th className="p-2">Target language</th>
                                    <th className="p-2">Accepted by</th>
                                    <th className="p-2">Stage</th>
                                </tr>
                            </thead>
                            <tbody className="border">
                                <tr className="hover:bg-slate-50 border-t-2">
                                    <td className="p-2">English</td>
                                    <td className="p-2">Lingala</td>
                                    <td className="p-2">0x3535A222222</td>
                                    <td className="p-2">1</td>
                                </tr>
                                <tr className="hover:bg-slate-50 border-t-2">
                                    <td className="p-2">English</td>
                                    <td className="p-2">English</td>
                                    <td className="p-2">English</td>
                                    <td className="p-2">English</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div>
                        <div className="flex justify-center gap-4">
                            <Link href="/requests/becometranslator/">
                                <div className="hover:bg-slate-50 hover:cursor-pointer drop-shadow text-center border w-64 p-3 rounded-md bg-white">
                                    <h5 className=" font-semibold text-lg">Become a translator</h5>
                                    <p>Start earn money by offering a translator service</p>
                                </div>
                            </Link>
                            <div className="hover:bg-slate-50 hover:cursor-pointer drop-shadow text-center border w-64 p-3 rounded-md bg-white">
                                <h5 className=" font-semibold text-lg">Get documentation</h5>
                                <p>Consult web3 documentation in many languages</p>
                            </div>
                            <Link href="/requests/translation/">
                                <div className="hover:bg-slate-50 hover:cursor-pointer drop-shadow text-center border w-64 p-3 rounded-md bg-white">
                                    <h5 className=" font-semibold text-lg">Ask for translation</h5>
                                    <p>Request to ask translation for your documents</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Index;
