import Link from "next/link"
import { useRouter } from "next/router"

const ActiveLink = (props) => {

  const router = useRouter()

  return (
      <Link href={`${props.href}/`}>
          <a className={router.pathname == props.href ? "text-blue-900 font-bold" : "text-black"}>
            {props.name}
          </a>
      </Link>
  )
}

export default ActiveLink