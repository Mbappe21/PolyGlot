import { useState } from "react"
import Modal from "./modal"

const TableWithModal = (props) => {

  const [hidden, setHidden] = useState(true)

  const openModal = () => {
    setHidden(false)
  }

    return (
      <div>

        {
          hidden
          ? ''
          : (
            <Modal setHidden={setHidden}>
              <div className="hover:bg-slate-50 hover:cursor-pointer drop-shadow text-center border w-full p-3 rounded-md bg-white">
                  <h5 className=" font-semibold text-lg">Select the file translate</h5>
                  <form action="">
                      <div className="grid grid-cols-1 my-5 px-32">
                          <label htmlFor="file" className="text-md">Document translate</label>
                          <div className="mb-2 flex">
                              <input type="file" name="file" className="border bg-white block w-full p-2 shadow-inner"/>
                          </div>
                      </div>
                      <div className="flex justify-center">
                          <button className="drop-shadow mx-4 px-6 py-1 bg-blue-600 text-white rounded-lg font-bold mt-4">Submit</button>
                      </div>
                  </form>
              </div>
            </Modal>
          )
        }

        <div className='mb-10'>
          <h2 className="text-2xl">{props.title}</h2>
          
          <table className='table-auto w-full text-gray-600'>
              <thead className='bg-gray-100'>
                <tr className="border">
                    {
                      props.headList.map(item =>
                        <th className="p-2">{item}</th>
                      )
                    }
                </tr>
              </thead>
              <tbody className="border">
                  {
                    props.lines.map((line, index) => 
                      <tr className="hover:bg-slate-50 hover:cursor-pointer border-t-2" title="click to view more" key={index} onClick={openModal}>
                        {
                          line.map(col =>
                            <td className="p-2" key={`${index}-${col}`}>{col}</td>
                          )
                        }
                      </tr>
                    )
                  }
              </tbody>
          </table>
        </div>   
      </div>
    )
}

export default TableWithModal