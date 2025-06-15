import React, { useState, useRef } from 'react'
import CardComponent from './CardComponent'
import { ToastContainer, toast } from 'react-toastify';

const TodoListTailwind = () => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(1);

  const inputRef = useRef(null);
  
  const addActive = () =>{
    const inputValue = inputRef.current?.value.trim();
    if(!inputValue){
      toast.error("Please enter a task name!", { autoClose: 1000, pauseOnHover: false });
      return;
    }
    setList((prev) => [...prev, {id:count, description: inputValue, checked: false, status: "active"}])
    setCount((prev) => prev + 1);
    toast.success("Task added successfully!", { autoClose: 1000, pauseOnHover: false });
    inputRef.current.value = '';
  }

  const updateTodoActive =(value, id)=>{
    const updated = [...list];
    const position = updated.findIndex((item) => item.id === id); 
    updated[position].description = value;
    setList(updated);
  }

  const activeMoveToComplete = (id) =>{
    const updated = [...list];
    const index = updated.findIndex((item) => item.id === id); 
    updated[index].checked = !updated[index].checked;
    if(updated[index].checked && updated[index].description.trim() !== ''){
      updated[index].status = "completed";
    }
    setList(updated)
  }

  const compRemoveTask = (id) =>{
    const updated = [...list];
    const index = updated.findIndex((item) => item.id === id); 
    if(updated[index].checked){
      const filtered = updated.filter(item => item.id !== id); 
      setList(filtered)
    }
  }

  return (
    <div>
      <ToastContainer position="top-center" theme="colored" />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-white tracking-wide">TODO</span>
                <div className='gap-6 p-6'>
                  <input type="text" id="todoVal" ref={inputRef} placeholder="Add a task..." className="flex-1 h-10 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm"/>
                  <button className="h-10 pt-1 px-4 py-1.5 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 transition text-sm" onClick={()=>addActive()}>+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100 min-h-screen pt-20">
          <CardComponent name="Active" updateactname={updateTodoActive} updateactchk={activeMoveToComplete} list={list && list.filter((item)=>item.status=="active")} />
          <CardComponent name="Completed" updateactchk={compRemoveTask} list={list && list.filter((item)=>item.status=="completed")} />
      </div>

    </div>
  )
}

export default TodoListTailwind