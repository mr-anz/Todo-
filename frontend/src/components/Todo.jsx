import React, { useState } from 'react'
import {FcTodoList} from 'react-icons/fc'
import {BsCheck2All} from 'react-icons/bs'
import { useStateContext } from '../context'

const Todo = () => {
  const { itemComplete, address, addTodoItem, incompleteTasks, completedTasks} = useStateContext()
  const [task,setTask] = useState();
  const handleSubmit = async(e) => {
    e.preventDefault()
    if(address){
      if (!task) return
      await addTodoItem(task)
      setTask('')
    } else {
      alert('Connect to Wallet')
    }
  }

  const handleComplete = (task)=> async(e) => {
    e.preventDefault()
    if(address){
      await itemComplete(task)
      window.location.reload()      
    } else {
      alert('Connect to Wallet')
    }
  }


  console.log(incompleteTasks, completedTasks)

  return (
    <div className="bg-[#93ff00] glass mx-auto p-4 rounded-xl space-y-20">

        <div className="relative mb-4  flex w-full mt-12 flex-wrap items-center gap-2 justify-between text-gray-500 border rounded-2xl bg-gray-50 focus:bg-white focus:border-indigo-600">
            <div className="flex px-2  items-center gap-4">
              
            <FcTodoList className='text-xl'/>
            <input
                type="text"
                placeholder="Todo"
                name='task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className=" outline-none bg-inherit text-lg relative m-0 -mr-0.5 block w-[100px] sm:w-[300px] flex-auto focus:border-indigo-600"
                />
                </div>
            <button 
              onClick={handleSubmit}
              className='p-2 h-full relative z-[2] hover:bg-zinc-300 hover:shadow-lg  focus:shadow-lg focus:outline-none text-white flex items-center rounded-l 
                        rounded-2xl bg-zinc-600 px-6 py-2.5 '
            >
                Submit
            </button>
        </div>

        <div className="space-y-1">
            <h1 className="mt-10 text-2xl font-semibold">Todo List</h1>
            {incompleteTasks.map((item,id) => (
            <div  class="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-lg font-medium text-secondary-900 hover:bg-blue-100 bg-white">
              <span className="">{item.task}</span>
              <div class="space-x-2 ">
                <button onClick={handleComplete(Number(item.id))} className="bg-zinc-600 text-white p-3 rounded-xl">
                  <BsCheck2All/>
                </button>
          </div>
        </div> 
            ))}

        </div>



        <div className="space-y-1 pb-20">
            <h1 className="mt-10 text-2xl font-semibold">Completed List</h1>
            {completedTasks.map((item) => (
            <div class="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-lg font-medium text-secondary-900  bg-gray-300">
              {item.task}
              <div class="space-x-2 ">
          
          </div>
        </div> 
         ))}

        </div>
    </div>
  )
}

export default Todo