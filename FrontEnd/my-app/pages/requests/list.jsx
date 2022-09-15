import React from 'react';
import Card from '../../component/card';
import Nav from '../../component/nav';
import Link from 'next/link';


const List = () => {
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
                            <Link href="/requests/list">Clients requests</Link>
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
            <div className="w-full h-full text-black p-5 overflow-auto">
            <div className="flex flex-col items-center justify-center mb-10">
                <h1 className="text-4xl">Client Request</h1>
                <p className="text-gray-600 text-lg">See latests clients requests</p>
            </div>

            <div className="grid grid-cols-4 gap-2 px-32">
                <div>
                    <div className="drop-shadow border w-64 p-3 rounded-md bg-white">
                        <h5 className="text-center font-semibold text-lg">Protect earth</h5>
                        <p>Current language: Spanish</p>
                        <p>Target language: German</p>
                        <p>Amount Proposed: 1 ETH</p>
                        <p>Since: 3 days</p>
                        <p>Period: 20 days</p>
                        <div className="flex justify-center">
                            <button className="drop-shadow px-6 py-1 bg-blue-500 text-white rounded-lg font-bold mt-4">Detail</button>

                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="drop-shadow border w-64 p-3 rounded-md bg-white">
                        <h5 className="text-center font-semibold text-lg">Protect earth</h5>
                        <p>Current language: Spanish</p>
                        <p>Target language: German</p>
                        <p>Amount Proposed: 1 ETH</p>
                        <p>Since: 3 days</p>
                        <p>Period: 20 days</p>
                        <div className="flex justify-center">
                            <button className="drop-shadow px-6 py-1 bg-blue-500 text-white rounded-lg font-bold mt-4">Detail</button>

                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="drop-shadow border w-64 p-3 rounded-md bg-white">
                        <h5 className="text-center font-semibold text-lg">Protect earth</h5>
                        <p>Current language: Spanish</p>
                        <p>Target language: German</p>
                        <p>Amount Proposed: 1 ETH</p>
                        <p>Since: 3 days</p>
                        <p>Period: 20 days</p>
                        <div className="flex justify-center">
                            <button className="drop-shadow px-6 py-1 bg-blue-500 text-white rounded-lg font-bold mt-4">Detail</button>

                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="drop-shadow border w-64 p-3 rounded-md bg-white">
                        <h5 className="text-center font-semibold text-lg">Protect earth</h5>
                        <p>Current language: Spanish</p>
                        <p>Target language: German</p>
                        <p>Amount Proposed: 1 ETH</p>
                        <p>Since: 3 days</p>
                        <p>Period: 20 days</p>
                        <div className="flex justify-center">
                            <button className="drop-shadow px-6 py-1 bg-blue-500 text-white rounded-lg font-bold mt-4">Detail</button>

                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="drop-shadow border w-64 p-3 rounded-md bg-white">
                        <h5 className="text-center font-semibold text-lg">Protect earth</h5>
                        <p>Current language: Spanish</p>
                        <p>Target language: German</p>
                        <p>Amount Proposed: 1 ETH</p>
                        <p>Since: 3 days</p>
                        <p>Period: 20 days</p>
                        <div className="flex justify-center">
                            <button className="drop-shadow px-6 py-1 bg-blue-500 text-white rounded-lg font-bold mt-4">Detail</button>

                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="drop-shadow border w-64 p-3 rounded-md bg-white">
                        <h5 className="text-center font-semibold text-lg">Protect earth</h5>
                        <p>Current language: Spanish</p>
                        <p>Target language: German</p>
                        <p>Amount Proposed: 1 ETH</p>
                        <p>Since: 3 days</p>
                        <p>Period: 20 days</p>
                        <div className="flex justify-center">
                            <button className="drop-shadow px-6 py-1 bg-blue-500 text-white rounded-lg font-bold mt-4">Detail</button>

                        </div>
                    </div>
                </div>
                
                <div>
                    <div className="drop-shadow border w-64 p-3 rounded-md bg-white">
                        <h5 className="text-center font-semibold text-lg">Protect earth</h5>
                        <p>Current language: Spanish</p>
                        <p>Target language: German</p>
                        <p>Amount Proposed: 1 ETH</p>
                        <p>Since: 3 days</p>
                        <p>Period: 20 days</p>
                        <div className="flex justify-center">
                            <button className="drop-shadow px-6 py-1 bg-blue-500 text-white rounded-lg font-bold mt-4">Detail</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>

        </div>
    );
}

export default List;
