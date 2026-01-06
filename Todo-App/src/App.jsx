import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [valueStore, setValueStore] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, SetValue] = useState("");
  const [isModified, setModified] = useState(null);


  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(valueStore));
  },[valueStore])

  function handleAddData() {
    const newTodo = {
      id: Date.now(),
      textValues: inputValue,
      complete:false,
    }

    if (inputValue) {
      setValueStore([...valueStore, newTodo]);
      SetValue("");
    }
  }

  function handleSaveData()
  {
    let ModifiedData = valueStore.map((item) => {
      return item.id === isModified.id ? {...item, textValues:inputValue} : item
    });
    
    setValueStore(ModifiedData);
    SetValue("");
    setModified(null);
  }

  function handleUpdateData(id)
  {
    let UpdateData = valueStore.find((item)=>{
      return item.id === id
    });
    
    setModified(UpdateData);
    SetValue(UpdateData.textValues);
  }

  function handleDeleteData(id)
  {
    let DeleteData = valueStore.filter((item)=>{
      return item.id !== id;
    });
    
    setValueStore(DeleteData);
  }

  function handleCompleteTask(id)
  {
    let CompleteTask = valueStore.map((item)=>{
      return item.id === id ? {...item,complete:!item.complete} : item
    });
    
    setValueStore(CompleteTask);
  }

  return (
    <>
      <div>
        <h1>ToDo - App</h1>
        <div className='content'>
        <input type="text"
          value={inputValue}
          placeholder='Type Anything'
          onChange={(e) => { SetValue(e.target.value) }}
        />
        <button onClick={ isModified ? handleSaveData :handleAddData}>{isModified ? "Save" : "Add"}</button>
        </div>

        <ul>
          {
            valueStore.map((item) => {
              return <li key={item.id} onDoubleClick={()=>handleCompleteTask(item.id)}   style={{ textDecoration: item.complete ? "line-through" : "none" }}>
                {item.textValues}
                <button onClick={()=>{handleUpdateData(item.id)}}>Update</button>
                <button onClick={()=>{handleDeleteData(item.id)}}>Delete</button>
                </li>
            })
          }
        </ul>
      </div>
    </>
  )
}

export default App
