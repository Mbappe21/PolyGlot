import React from 'react';
import Card from '../../component/card';
import Nav from '../../component/nav';
import Link from 'next/link';


const becomeTranslator = () => {
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
                    <div>
                        <h1 className="text-4xl">Become translator</h1>
                        <p className="text-gray-600 text-lg">Complete the form and apply to become translator</p>
                    </div>
                    <div>
                        <form action="">
                            <div className="grid grid-cols-2 gap-2 p-6">
                                <div>
                                    <label htmlFor="t-language" className="text-md">Apply for</label>
                                    <select name="t-language"  className="border block w-full p-2 shadow-inner bg-white" id="">
                                        <option v-htmlFor="option in props.options" value="option.value">French</option>
                                        <option v-htmlFor="option in props.options" value="option.value">English</option>
                                        <option v-htmlFor="option in props.options" value="option.value">Lingala</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default becomeTranslator;
