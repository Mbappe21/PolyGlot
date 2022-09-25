

const ModalCard = (props) => {

    return (
        <div className="drop-shadow border h-[500px] w-[800px] p-3 rounded-md bg-white">
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default ModalCard