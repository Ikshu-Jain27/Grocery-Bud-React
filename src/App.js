// REFER TO THE FINAL FOLDER FOR CODE. THE SETUP IS NOT WORKING PROPERLY. THOUGH YOU CAN REFER TO SETUP FOR COMMENTS


import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list')); // since we are storing it as a string, we also need to parse
  }
  else{
    return []
  }
}


function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false, 
    msg: '', 
    type: ''
  })
  const handleSumbit = (e) => {
    e.preventDefault();
    if(!name){
      // display alert
      showAlert( true, 'danger', 'please enter value' )
    }
    else if(name && isEditing){
      // deal with edit
      setList(
        list.map((item) => {
          if(item.id === editID){
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    }
    else{
      // show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList({...list, newItem});
      setName('');
    }
  }

  // to speed up the process, get all the values before setAlert as we will be calling setAlert multiple times
  const showAlert = (show=false, type="", msg="") => { // values set by default
    // ES6 FEATURE
    // If the property name matches to the variable name that holds the value then it can be done as follows
    setAlert({show, type, msg}) // or setAlert({show:show, type, msg})
  }

  // clear list functionality
  const clearList = () => {
    showAlert( true, 'danger', 'empty list')
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'empty list')
    setList(list.filter((item) => item.id !== id)) // add the item into the list only if its id does not match with the id of the item to be removed
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title) // to let the user know the item he is editing, add the name to the input box
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list)) // we need a key value pair, therefore, 'list' is our key. We can only store it as a string, therefore, JSON.stringify(list)
  }, [list])
  // now everytime we do something with the list the old values are overwritten by the new values of the list

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSumbit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input 
            type='text' 
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>{isEditing ? 'edit' : 'submit'}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  ) 
}

export default App
