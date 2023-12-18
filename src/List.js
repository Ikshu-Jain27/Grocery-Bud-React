// REFER TO THE FINAL FOLDER FOR CODE. THE SETUP IS NOT WORKING PROPERLY. THOUGH YOU CAN REFER TO SETUP FOR COMMENTS


import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ items, removeItem, editItem}) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const {id, title} = item;
        return (
          <article key={id} className='grocery-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button 
                type='button' 
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button 
                type='button' 
                className='delete-btn'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
