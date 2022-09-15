import React from 'react';
import Card from '../../component/card';
import Nav from '../../component/nav';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const WorldIDWidget = dynamic(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);


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
                        <h1 className="text-4xl">Become translator</h1>
                        <p className="text-gray-600 text-lg">Complete the form and apply to become translator</p>
                        <div className="text-center text-gray-500 ml-4 mt-2 font-semibold w-3/5">
                            <p >On applying, you'll receive three documents to translate for validators. If all of your translations are approved, you'll become a translator.</p>
                        </div>
                    </div>
                    <div className="px-32">

                        <form action="">
                            
                            <div className="flex flex-col items-center py-6">
                                <div className="my-3 w-3/12">
                                    <label htmlFor="t-language" className="text-md">Language applied for</label>
                                    <select name="t-language"  className="border block w-full p-2 shadow-inner bg-white" id="">
                                        <option value="english">English</option>
                                        <option value="french">French</option>
                                        <option value="lingala">Lingala</option>
                                    </select>
                                </div>
                                {/* <div class="hover:cursor-pointer w-full py-3 px-5 rounded-full align-text-bottom drop-shadow-sm border hover:bg-gray-50"
                                >
                                    <label for="" class="flex items-center justify-center hover:cursor-pointer">
                                        <p class="text-center"> English</p>
                                        <input type="checkbox" class="hidden"  v-model="on" value="props.value"/>
                                    </label>
                                </div>
                                <div class="hover:cursor-pointer w-full py-3 px-5 rounded-full align-text-bottom drop-shadow-sm border hover:bg-gray-50"
                                >
                                    <label for="" class="flex items-center justify-center hover:cursor-pointer">
                                        <p class="text-center"> Lingala</p>
                                        <input type="checkbox" class="hidden"  v-model="on" value="props.value"/>
                                    </label>
                                </div>
                                <div class="hover:cursor-pointer w-full py-3 px-5 rounded-full align-text-bottom drop-shadow-sm border hover:bg-gray-50"
                                >
                                    <label for="" class="flex items-center justify-center hover:cursor-pointer">
                                        <p class="text-center"> French</p>
                                        <input type="checkbox" class="hidden"  v-model="on" value="props.value"/>
                                    </label>
                                </div> */}
                                <div className="my-3">
                                    <WorldIDWidget
                                        actionId="wid_BPZsRJANxct2cZxVRyh80SFG" 
                                        signal="my_signal"
                                        enableTelemetry
                                        onSuccess={(verificationResponse) => console.log(verificationResponse)}
                                        onError={(error) => console.error(error)}
                                    />
                                </div>
                                <div className="my-3">
                                    <button className="drop-shadow mr-4 px-6 py-1 bg-blue-600 text-white rounded-lg font-bold mt-4">Apply</button>
                                    <button className="drop-shadow mx-4 px-6 py-1 bg-amber-600 text-white rounded-lg font-bold mt-4">Cancel</button>
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
