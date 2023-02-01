import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header';
import {v4 as uuidv4} from "uuid"
function App() {
  const initialState = JSON.parse(localStorage.getItem('todos')) || [];
   const [input,setInput] = useState('')
   const [todos,setTodos] = useState(initialState)
   const [editTodo,setEditTodo] = useState(null);
   useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
   },[todos]);

   const handleDelete = ({ id })=>{
    setTodos(todos.filter((obj)=> obj.id !==id));
   }
   const handleEdit = ({id})=>{
    const findTodo = todos.find((obj)=> obj.id === id);
    setEditTodo(findTodo);

   };
   const updateTodo = (title,id,completed)=>{
    const newTodo = todos.map((obj)=>
      obj.id === id ? {title,id,completed} :obj
    );
    setTodos(newTodo);
    setEditTodo()
   } ;
   useEffect(()=>{
    if(editTodo){
      setInput(editTodo.title)
    }else{
      setInput('')
    }
   },[setInput,editTodo])


  return (
      <div className="app">
      <div className="mainHeading">
        <div>
          <Header/>
        </div>
      </div>
      <div className="subHeading">
        <br />
        {/* <h2>Whoop, it's Wednesday 🌝 ☕ </h2> */}
      </div>
      <div className="input">
        
        <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={()=>{
        if(!editTodo){
       setTodos([...todos,{id: uuidv4(),title:input,completed:false }])
       setInput('')
        }else{
          updateTodo(input,editTodo.id,editTodo.completed)
        }
        
      }
    }
         className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {
          todos.map((obj)=>{

       return( 
          <div className="todo" key={obj.id}>
          <div className="left">
            <input value={obj.title} onChange={(e)=>{
              console.log(e.target.checked);
              console.log(obj);
              setTodos(todos.filter(obj2=>{
                if(obj2.id===obj.id){
                  obj2.completed = e.target.checked;
                }
                return obj2;
              }))
            }}
     
            
              type="checkbox" name="" id=""  />
            <p>{obj.title}</p>
          </div>
          <div className="right" > 
            <i  onClick={()=> handleEdit(obj)} className="fa-solid fa-pen-to-square"></i>
            <i  onClick={()=> handleDelete(obj)} className="fas fa-times"></i>
          </div>
        </div>
        )
          
        })  }
        
      </div>
    </div>
      

  );
}

export default App;
