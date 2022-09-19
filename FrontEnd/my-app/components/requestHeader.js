

const RequestHeaderLayout = (props) => {

    return (
      <div className="flex flex-col items-center justify-center mb-10">
          <h1 className="text-4xl">{props.title}</h1>
          <p className="text-gray-600 text-lg">
          </p>
            {props.children}
      </div>
    )
}

export default RequestHeaderLayout