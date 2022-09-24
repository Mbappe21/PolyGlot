

const Card = (props) => {

    return (
        <div className="hover:bg-slate-50 hover:cursor-pointer drop-shadow text-center border w-full p-3 rounded-md bg-white">
            <h5 className=" font-semibold text-md break-all">{ props.cardTitle }</h5>
            <div>
              {props.children}
            </div>
        </div>
    )
}

export default Card