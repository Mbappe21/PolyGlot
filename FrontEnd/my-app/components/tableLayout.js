


const TableLayout = (props) => {

    return (
        <div>
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
                        <tr className="hover:bg-slate-50 border-t-2" key={index}>
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

export default TableLayout