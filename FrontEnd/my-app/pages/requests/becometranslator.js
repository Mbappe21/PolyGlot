import DashboardLayout from "../../components/dashboardLayout"
import RequestHeaderLayout from "../../components/requestHeader"
import Button from "../../components/button"
import BackToDashboardButton from "../../components/backDashboard"

import dynamic from 'next/dynamic';

const WorldIDWidget = dynamic(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);

const BecomeTranslator = (props) => {

    return (
        <DashboardLayout>
            <div className="w-full h-full text-black p-5 overflow-auto">
                <RequestHeaderLayout title="Become translator">
                  <p className="text-gray-600 text-lg">Complete the form and apply to become translator</p>
                  <div className="text-center text-gray-500 ml-4 mt-2 font-semibold w-3/5">
                      <p >On applying, you'll receive three documents to translate for validators. If all of your translations are approved, you'll become a translator.</p>
                  </div>
                </RequestHeaderLayout>
                <div className="">
                    <form action="" onSubmit={(e)=>e.preventDefault()}>
                        <div className="flex flex-col items-center py-6">
                            <div className="my-3 w-3/12">
                                <label htmlFor="t-language" className="text-md">Your current language</label>
                                <select name="t-language"  className="border block w-full p-2 shadow-inner bg-white" id="">
                                    <option value="english">English</option>
                                    <option value="french">French</option>
                                    <option value="lingala">Lingala</option>
                                </select>
                            </div>
                            <div className="my-3 w-3/12">
                                <label htmlFor="t-language" className="text-md">Language applied for</label>
                                <select name="t-language"  className="border block w-full p-2 shadow-inner bg-white" id="">
                                    <option value="english">English</option>
                                    <option value="french">French</option>
                                    <option value="lingala">Lingala</option>
                                </select>
                            </div>
                            <div className="my-3">
                                <WorldIDWidget
                                    actionId="wid_staging_3085eefaf486046c0907b4fc08634820" 
                                    signal="my_signal"
                                    enableTelemetry
                                    onSuccess={(verificationResponse) => console.log(verificationResponse)}
                                    onError={(error) => console.error(error)}
                                />
                            </div>
                            <div className="my-3 flex justify-between">
                                <Button type="primary" content="Apply"/>
                                <BackToDashboardButton/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default BecomeTranslator