import { useState ,useEffect} from "react";
import "./todo.css";
import { Todoinput } from "../Todoinput/Todoinput";


/*-------------------------------------////-----------------------------------*/

export const Todo = () => {
  /-----------------------States----------------------/;
  const isExist = localStorage.getItem("todos") 
  const [userInputData, setUserInputData] = useState("");
  const  [todosArray, setTodosArray] = useState(
    isExist ? JSON.parse(isExist) : []
  );
  const [inputSectionStatus, setInputSectionStatus] = useState(false);
  const [editButtonStatus, setEditButtonStatus] = useState(null);
  const [editedInputValues, setEditedInputValues] = useState({});
  
  useEffect(()=>{
    localStorage.setItem("todos",
    JSON.stringify(todosArray))
  },[todosArray])



  const HandleFetchInput = (event) => {
    setUserInputData(event.target.value);
  };

  /--------------------------------------------------------------------------/;
  //ADD NEW TODO//

  const AddTodo = () => {
    if (userInputData === "") {
      setInputSectionStatus(true);
      setTimeout(() => {
        setInputSectionStatus(false);
      }, 800);
    } else {
      setTodosArray([
        ...todosArray,
        { TodoList: userInputData, id: Date.now(), status: false },
      ]);
      setUserInputData("");
    }
  };

  /-------------------------------------------------------------------------------/;
  //TODO DELETE FUNCTION//

  const HandleDelete = (TodoId) => {
    setTodosArray(todosArray.filter((Tododata) => Tododata.id !== TodoId));
  };
/---------------------------------------------------------------------------------------/
//TODO COMPLETE

  const HandleComplete = (TodoId) => {
    let complete = todosArray.map((Tododata) => {
      if (Tododata.id === TodoId) {
        return { ...Tododata, status: !Tododata.status };
      }
      return Tododata;
    });
    setTodosArray(complete);
  };

  /-------------------------------------------------------------------------------------/;
  //TODO EDIT SECTION//

  const HandleEdit = (TodoId) => {
    if (editButtonStatus === TodoId) {
      setEditButtonStatus(null);
    } else {
      setEditButtonStatus(TodoId);
      const todoToEdit = todosArray.find((Tododata) => Tododata.id === TodoId);
      setEditedInputValues((prevInputValues) => (
         {
           ...prevInputValues,
           [TodoId]: todoToEdit.TodoList,
         }
      ));
    }
  };

  /-----------------------------------------------------------------------------------/;
  //TODO EDIT CANCEL SECTION//

  const HandleCancel = () => {
    setEditButtonStatus("");
    setUserInputData("");
  };

  /--------------------------------------------------------------------------------------/;
  //TODO EDIT SAVE SECTION//

  const HandleSave = (TodoId) => {
    const updatedaTodoList = todosArray.map((Tododata) => {
      if (Tododata.id === TodoId) {
        return { ...Tododata, TodoList: editedInputValues[TodoId] };
      }
      return Tododata;
    });
    setTodosArray(updatedaTodoList);
    setEditButtonStatus("");
  };

  /---------------------------------------------------------------------------------------/;
  // TODO CHANGED VALUE HANDLING SECTION //

  const HandleInputChange = (TodoId, newValue) => {
    setEditedInputValues((prevInputValues) => ({
      ...prevInputValues,
      [TodoId]: newValue,
    }));
  };
  /--------------------------------------------------------------------------------------------/;
  return (
   
    <div className="main-div">
      <div className="background">
        <div className="back-div"></div>
        <div className="front-div">
          <h1>Todo List</h1>
          <Todoinput
            HandleFetchInput={HandleFetchInput}
            AddTodo={AddTodo}
            userInputData={userInputData}
          />
             {/* ----------------------------------------------------------------- */}
          {todosArray.map((Tododata) => (
            <div className="list-container" key={Tododata.id}>

              {/*----------------------------------------------------------------*/}

              {editButtonStatus != null && editButtonStatus === Tododata.id ? (
                <div className="error-maindiv">
                  <div className="input-div2">
                    <input
                      type="text"
                      value={editedInputValues[Tododata.id] || ""}
                      onChange={(event) =>
                        HandleInputChange(Tododata.id, event.target.value)
                      }
                    />
                  </div>
                  <div className="save-btn">
                    <button onClick={() => HandleSave(Tododata.id)}>
                      Save
                    </button>
                  </div>
                  <div className="cancel-btn">
                    <button onClick={HandleCancel}>Cancel</button>
                  </div>
                </div>
      // -------------------------------   
              ) : (
      //  ------------------------------         
                <>
                  <div
                    onClick={() => HandleComplete(Tododata.id)}
                    id={Tododata.status ? "listcomplete" : ""}
                    className="text"
                  >
                    <p>{Tododata.TodoList}</p>
                  </div>
                  <button
                    className="img1"
                    onClick={() => HandleEdit(Tododata.id)}
                  >
                    <img src="src\assets\image 7.png" alt="" />
                  </button>
                  <button
                    onClick={() => HandleDelete(Tododata.id)}
                    className="img2"
                  >
                    <img src="src\assets\image 9.png" alt="" />
                  </button>
                </>
              )}
            </div>
          ))}
  {/* ------------------------------------------------------         */}
          {inputSectionStatus && (
            <div className="main-poster">
              <div className="poster">
                <span>Ooops....!</span>
                <br />
                <span>Input field is empty</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
