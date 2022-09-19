import RequestHeaderLayout from "../../components/requestHeader"
import DashboardLayout from "../../components/dashboardLayout"
import Button from "../../components/button"
import Card from "../../components/card"

const List = (props) => {

  return (
    <DashboardLayout>
        <div className="w-full h-full text-black p-5 overflow-auto">
          <RequestHeaderLayout title="Client Request">
            See latests clients requests
          </RequestHeaderLayout>
          <div className="grid grid-cols-4 gap-2 px-32">
            <Card cardTitle="Protect Earth">
              <p>Current language: Spanish</p>
              <p>Target language: German</p>
              <p>Amount Proposed: 1 ETH</p>
              <p>Since: 3 days</p>
              <p>Period: 20 days</p>
              <div className="flex justify-center">
                <Button content="Detail" type="primary"/>
              </div>
            </Card>
            <Card cardTitle="Protect Earth">
              <p>Current language: Spanish</p>
              <p>Target language: German</p>
              <p>Amount Proposed: 1 ETH</p>
              <p>Since: 3 days</p>
              <p>Period: 20 days</p>
              <div className="flex justify-center">
                <Button content="Detail" type="primary"/>
              </div>
            </Card>
          </div>
        </div>
    </DashboardLayout>
  )
}

export default List