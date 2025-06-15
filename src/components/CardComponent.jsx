import React from 'react'

const CardComponent = ({name, list, updateactname, updateactchk}) => {
  return (
    <>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{name}</h2>
            {list && list?.length > 0 ? (list.map((item) =>(
                <div key={item.id} id={item.id}  className="flex items-center gap-3 my-2">
                    <input
                    type="checkbox"
                    name="checkbox"
                    onChange={()=>updateactchk(item.id)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <input
                    type="text"
                    name="taskname"
                    value={item.description}
                    onChange={(e)=> updateactname(e.target.value, item.id)}
                    className={`flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                        ${item.status === "completed"
                        ? "border-transparent bg-gray-100 cursor-not-allowed"
                        : "border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    }`}
                    disabled={item.status === "completed"} />
              </div>
              
            ))):(<h5>No Task</h5>)}
        </div>
    </>
  )
}

export default CardComponent