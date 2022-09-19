import Link from "next/link"
import Button from "./button"


const BackToDashboardButton = () => {

    return (
        <Link href="/dashboard/">
          <div>
            <Button content="Back to dashboard" type="secondary"/>
          </div>
        </Link>
    )
}
export default BackToDashboardButton