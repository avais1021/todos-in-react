import React, { useRef, useState } from 'react';

import { useTodoContext } from '../context/TodoContext';

const TodoItem = ({ todos }) => {

  const { updateTodo, deteteTodo, todoChecked } = useTodoContext();

  const [isEditable, setIsEditable] = useState(false);

  const [editText, setEditText] = useState(todos.text);

  const inputRef = useRef(null);

  console.log(editText, 'editText');

  console.log(isEditable, 'isEditable');

  // const editTodo = () => {
  //   alert(1)
  //   updateTodo( todos.id , editText)
  // }

  const editTodo = () => {
    updateTodo(todos.id, { ...todos, text: editText })
  }
  const toggleCompleted = () => {
    todoChecked(todos.id)
  }


  return (
    <div
      className={`flex items-center border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black  ${todos.checked ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"} `}>
      <input
        type="checkbox"
        className="cursor-pointer w-7 h-12"
        checked={todos.checked}
        onChange={toggleCompleted}
      />
      <textarea
        type="text"
        className={`border-teal-950 border outline-none w-full bg-transparent rounded-lg px-2 ${todos.checked ? 'line-through' : ''} ${isEditable ? "bg-lime-100 border-amber-400" : ""} `}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        readOnly={!isEditable}
        ref={inputRef}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (isEditable) {
            editTodo();
            setIsEditable(false)
          } else {
            setIsEditable(true)
          }
          if (inputRef.current) {
            // debugger
            inputRef.current.focus();
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);

          }
        }}
        disabled={todos.checked}
      >
        {isEditable ? "✅" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deteteTodo(todos.id)}
      >
        ❌
      </button>
    </div>
  )
}

export default TodoItem
