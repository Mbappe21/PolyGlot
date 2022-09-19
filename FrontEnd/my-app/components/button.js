

const Button = (props) => {

  const bgColor = props.type.toLowerCase() === "primary"
  ? "bg-blue-600"
  : props.type.toLowerCase() === "secondary"
  ? "bg-amber-600"
  : "bg-gray-600"

  return (
      <button className={"drop-shadow mx-4 px-6 py-1 hover:scale-105 "+bgColor+" text-white rounded-lg font-semibold mt-4"}>
            {props.content}
      </button>
  )
}

export default Button