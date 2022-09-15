import React from 'react';
import Card from '../../component/card';
import Nav from '../../component/nav';
import Link from 'next/link';


const Translation = () => {
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
                <div className="w-full h-full text-black p-5 overflow-auto">
                    <div className="flex flex-col items-center justify-center mb-10">
                        <h1 className="text-4xl">Request for translation</h1>
                        <p className="text-gray-600 text-lg">Complete the form and submit your request for translation</p>
                    </div>
                    <div>
                        <form action="">
                            <div className="grid grid-cols-2 mt-10 gap-6 mb-3 px-32">
                                <div className="mb-1">
                                    <label htmlFor="" className="text-md">Theme</label>
                                    <div className="mb-2 flex">
                                        <input type="text" name="theme" className="border block w-full p-2 shadow-inner"
                                        placeholder="Topic of document to translate"
                                        />
                                        <button  className="bg-gray-200 px-5">Clear</button>
                                    </div>
                                </div>
                                
                                <div className="mb-1">
                                    <label htmlFor="period" className="text-md">Period for translation</label>
                                    <div className="mb-2 flex">
                                        <input type="text" name="period" className="border block w-full p-2 shadow-inner"
                                        placeholder="Deadline given for translation"
                                        />
                                        <button className="bg-gray-200 px-5">Clear</button>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="amount" className="text-md">Amount for the job</label>
                                    <div className="mb-2 flex">
                                        <input type="text" name="amount" className="border block w-full p-2 shadow-inner"
                                        placeholder="Amount proposed to the translater"
                                        />
                                        <button  className="bg-gray-200 px-5">Clear</button>
                                    </div>
                                </div>

                                <div className="mb-1">
                                    <label htmlFor="currency" className="text-md">Currency</label>
                                    <select name="currency"  className="border block w-full p-2 shadow-inner bg-white" id="">
                                        <option htmlFor="option in props.options" value="option.value">Clear</option>
                                    </select>
                                </div>

                                <div className="mb-1">
                                    <label htmlFor="d-language" className="text-md">Document language</label>
                                    <select name="d-language"  className="border block w-full p-2 shadow-inner bg-white" id="">
                                        <option htmlFor="option in props.options" value="option.value">Clear</option>
                                    </select>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="t-language" className="text-md">Target language</label>
                                    <select name="t-language"  className="border block w-full p-2 shadow-inner bg-white" id="">
                                        <option htmlFor="option in props.options" value="option.value">Clear</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 my-5 px-32">
                                <div>
                                    <label htmlFor="description" className="text-md">Description</label>
                                    <textarea name="description" id="" cols="30" rows="10" className="border block w-full p-2 shadow-inner"
                                    placeholder="Small description of the job to do ..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 my-5 px-32">
                                <label htmlFor="file" className="text-md">Document to translate</label>
                                <div className="mb-2 flex">
                                    <input type="file" name="file" className="border bg-white block w-full p-2 shadow-inner"/>
                                    <button  className="bg-gray-200 px-5">Clear</button>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button className="drop-shadow mx-4 px-6 py-1 bg-blue-600 text-white rounded-lg font-bold mt-4">Submit request</button>
                                <button className="drop-shadow mx-4 px-6 py-1 bg-amber-600 text-white rounded-lg font-bold mt-4">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Translation;
