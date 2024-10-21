import React, { useEffect, useRef, useState } from "react";
import Todoitems from "./Todoitems";
import todologo from "../assets/todologo.png"

const Todo = () =>{

    const [todoList,setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")): []);
    const inputRef = useRef();


    const add = () => {
        const inputText= inputRef.current.value.trim();
        if(inputText===""){
            return null;
        }
        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev)=>[...prev,newTodo]);
        inputRef.current.value="";
    }

    const deleteTodo = (id) => {
        setTodoList((prvTodos)=>{
            return prvTodos.filter((todo)=>todo.id !== id)
        })
    }

    const toggle = (id)=> {
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete:!todo.isComplete}
                }

                return todo;
            })
        })

    }

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todoList))
    },[todoList])


    return(
        <div className="bg-slate-100 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px]  rounded-2xl max-[400px]:max-w-80 ">
            
            <div className="flex items-center mt-7 gap-2">
                <img  className="w-10" src={todologo} alt=""></img>
                <h1 className="text-3xl font-semibold">To-Do List</h1>
            </div>

            <div className="flex items-center my-7 bg-gray-200 rounded-full max-[400px]:max-w-66 ">
                <input ref={inputRef}  className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600     max-[400px]:max-w-48" type="text" placeholder="Add a task"></input>
                <button onClick={add} className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer    max-[400px]:max-w-">ADD+</button>
            </div>

            <div>
                {todoList.map((item,index)=>{
                    return <Todoitems key={index} id={item.id} text={item.text} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}></Todoitems>
                })}
            </div>
        </div>
    )
}

export default Todo