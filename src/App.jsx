import React, { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { TodoContextProvider } from './context/TodoContext';



const App = () => {

  const [todos, setTodos] = useState([]);

  console.log(todos, 'todos');

  const addTodo = (todoText) => {
    setTodos((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          text: todoText,
          checked : false,
        },
      ]
    })
  }

  const updateTodo = (id, editTodo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? editTodo : prevTodo )))
  }
  
  // const updateTodo = (id, editTodo) => {
  //   console.log(id, 'id');
  //   console.log(editText, 'TEXT');
  //   setTodos((prev) => {
  //     return [

  //       prev.map((item) => {
  //         if (item.id === id) {
  //           return {
  //             editTodo,
  //           }
  //         } else {
  //           return {
  //             item
  //           }
  //         }
  //       })

  //     ]

  //   })
  // }

  const todoChecked = (id) => {
    setTodos((prev) => prev.map(item => item.id === id ? {...item , checked : !item.checked} : item))
  }

  const deteteTodo = (id) =>  {
    setTodos((prev) => prev.filter(item => item.id !== id))
  }
  useEffect(() => {
    const getTodosFromLocal =  JSON.parse(localStorage.getItem('mytodos'));
    console.log(getTodosFromLocal,'getTodosFromLocal');

    if(getTodosFromLocal && getTodosFromLocal.length > 0){
    setTodos(getTodosFromLocal)
    console.log(todos,'todos after');
    }
  } , [])

  useEffect(() => {
      localStorage.setItem('mytodos' , JSON.stringify(todos));
  } , [todos])



  return (
    <TodoContextProvider value={{ todos, addTodo, updateTodo , deteteTodo , todoChecked }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todos) => (
              <div className="w-full" key={todos.id}>
                <TodoItem todos={todos} />

              </div>

            ))}

          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
