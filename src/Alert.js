// REFER TO THE FINAL FOLDER FOR CODE. THE SETUP IS NOT WORKING PROPERLY. THOUGH YOU CAN REFER TO SETUP FOR COMMENTS


import React, { useEffect } from 'react'

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000)
    return () => clearTimeout(timeout)
  },[list]) // dependancy of list is set up. Therefore, everytime the list is going to change, we'll get a new set of timeout. Had it been [] instead of [list] then if an item is added and the entire list is immediately cleared then in that case it is counted as one action and all the prompts are just shown in 3 sec. But now the prompts which are being followed by some other prompts would disappear as soon as the new prompts occurs or after 3 sec whichever time is lesser. For each prompt the timeout starts from 0.
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
