import React, { useState } from "react";

// const empty = "";
// const emptyBox = [];

const TodoList = () => {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({ task: "" });
  const [mouseOver, setMouseOver] = useState(false);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleUser = () => {
    const newArray = [...userList, user];
    setUserList(newArray);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      const array = [...userList, user];
      setUserList(array);
    }
  };

  const handleDelete = (deleteIndex) => {
    const filterArray = userList.filter(
      (element, indice) => indice !== deleteIndex
    );
    setUserList(filterArray);
  };

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleOut() {
    setMouseOver(false);
  }

  return (
    <>
      <div className="container" onKeyDown={handleEnter}>
        <h1 className="text-center fw-bold font-monospace fs-1">To-Do List!</h1>
        <div className="d-flex justify-content-center w-100">
          <ul className="list-group shadow bg-body-tertiary rounded-0 w-50 p-1 ">
            <li className="list-group-item d-flex p-1">
              <input
                type="text"
                style={{
                  backgroundColor: `${
                    mouseOver ? "lightgreen" : "lightyellow"
                  }`,
                }}
                placeholder="Write Something and Click The Button to Add"
                name="task"
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
                  {element.task}
                  <button className="btn" onClick={() => handleDelete(indice)}>
                    <i class="fas fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;