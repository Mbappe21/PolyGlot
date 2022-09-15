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
            <div className="w-full h-full text-black px-32 overflow-auto">
            <div className="mb-7">
                <h1 className="text-4xl text-center">Protect Earth</h1>
            </div>

            <div>
                <div className="w-1/2">
                    <p className="text-md">Current language: Spanish</p>
                    <p className="text-md">Target language: German</p>
                    <p className="text-md">Amount Proposed: 1 ETH</p>
                    <p className="text-md">Since: 3 days</p>
                    <p className="text-md">Period: 20 days</p>

                    <div>
                        <label htmlFor="description" className="text-lg">Description:</label>
                        <textarea name="description" id="" readOnly cols="30" rows="10" className="border block w-full p-2 shadow-inner"
                        placeholder="Small description of the job to do ..."
                        ></textarea>
                    </div>
                    
                    <div className="flex justify-around">
                        <button className="drop-shadow px-6 py-1 bg-blue-600 text-white rounded-lg font-bold mt-4">Apply to translate</button>
                        <button className="drop-shadow px-6 py-1 bg-amber-600 text-white rounded-lg font-bold mt-4">Return to dashboard</button>
                    </div>
                </div>
            </div>
            
        </div>
            </div>

        </div>
    );
}

export default Index;
