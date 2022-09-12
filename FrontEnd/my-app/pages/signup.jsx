export default function() {
  return (
      <div className="">
        <form className="w-[512px] h-96 p-8 bg-slate-50 bg-opacity-20 flex flex-col items-center gap-6 rounded-xl ">
          <h3 className="font-medium text-2xl pb-5">Setting up your account</h3>

          <div className="flex flex-col w-72 font-medium gap-2">
              <label htmlFor="">Account type</label>
              <select name="" id="" className="py-2 px-4 text-black rounded-md">
                  <option value="">Member</option>
              </select>
          </div>
          <div className="flex flex-col w-72 font-medium gap-2">
              <label htmlFor="">Select language</label>
              <select name="" id="" className="py-2 px-4 text-black rounded-md">
                  <option value="" >English</option>
                  <option value="" >Frensh</option>
              </select>
          </div>

          <div>
              <button className="py-1 px-10 bg-blue-500 hover:bg-blue-600 rounded-md font-medium">Validate</button>
          </div>
        </form>
      </div>
  )
}
