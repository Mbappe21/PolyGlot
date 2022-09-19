

const Modal = (props) => {

  const handleClick = (e) => {
    props.setHidden(true)
  }

    return (
        <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-70 z-50 flex items-center justify-center">
                <button onClick={handleClick} className="bg-gray-500  bg-opacity-60 hover:bg-black 
                hover:drop-shadow-lg drop-shadow-md absolute p-4 rounded-full top-20 right-20 z-50">
                  <div className="rotate-45">
                    <span className="text-5xl text-white font-semibold">+</span>
                  </div>
                </button>
                <div>
                    {props.children}
                </div>
            </div>
            
        </div>
    )
}

export default Modal