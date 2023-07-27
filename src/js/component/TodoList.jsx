import React, { useState, useEffect } from "react";

const apiURL = "https://express-blog-xa7v.onrender.com/todo/users/linnovel"

const TodoList = () => {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({ task: "" });
  const [mouseOver, setMouseOver] = useState(false);
  const [task, setTask] = useState({
    label: "",
    done: true
  })
  const getTodoList = async () => {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    setUserList(data)
  }



  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    setTask({ ...task, [event.target.name]: event.target.value })
  };

  const handleUser = (event) => {
     (event.key === "Enter") 
      const newTodo = [...userList, task];
      updateApi(newTodo)
    
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      const array = [...userList, user];
      setUserList(array);
    }
  };
  
  const updateApi = async (userList) => {
    const response = await fetch(apiURL, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userList)
    });
    if (response.ok) {
      getTodoList();
    }
  }


  const handleTask =  (event) => {
    if (event.key === "Enter") {
      const newTodo = [...userList, task];
      updateApi(newTodo)
    }
  };



  const handleDelete =  async (deleteIndex) => {
    const updateTodoList = userList.filter(
      (element, indice) => indice !== deleteIndex);
      updateApi(updateTodoList)
  };

 

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleOut() {
    setMouseOver(false);
  }

  useEffect(() => {
    getTodoList();
  }, [])
  return (
    <div onKeyDown={handleTask}>
      <div className="container" onKeyDown={handleEnter}>
        <h1 className="text-center fw-bold font-monospace fs-1">To-Do List!</h1>
        <div className="d-flex justify-content-center w-100">
          <ul className="list-group shadow bg-body-tertiary rounded-0 w-50 p-1 ">
            <li className="list-group-item d-flex p-1">
              <input
                type="text"
                style={{
                  backgroundColor: `${mouseOver ? "lightgreen" : "lightyellow"
                    }`,
                }}
                placeholder="Write Something and Click The Button to Add"
                name="label"
                value={task.label}
                className="text-area border border-0 w-100 m-1 p-1 rounded-3 "
                onChange={handleChange}
                onMouseOver={handleMouseOver}
                onMouseOut={handleOut}
              ></input>
              <button
                className="btn btn-outline-success p-1"
                onClick={handleUser}
              >
                Add Task
              </button>
            </li>
            {userList.map((element, indice) => {
              return (
                <li className="list-group-item" key={indice}>
                  {element.label}
                  <button className="btn" onClick={() => handleDelete(indice)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;