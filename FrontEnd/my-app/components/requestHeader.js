

const RequestHeaderLayout = (props) => {

    return (
      <div className="flex flex-col items-center justify-center mb-5">
          <h1 className="text-4xl">{props.title}</h1>
            {props.children}
      </div>
    )
}

export default RequestHeaderLayout