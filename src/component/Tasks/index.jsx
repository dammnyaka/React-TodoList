import axios from 'axios';
import React from 'react';



import editSvg from '../../assets/img/edit.svg'
import './Tasks.scss';


export default function Tasks({list, index, onEdit}) {
  // console.log(list);

  const editTitle = () => {
    const newTitle = window.prompt('name title', list.name);
    if(newTitle) {
      onEdit(list.id, newTitle)
      axios.patch()
    }
  }


  return (
    <div className="tasks">
        <h2 className="tasks_title">{list.name}
        <img onClick={editTitle} src={editSvg} alt="edit icon" />
        </h2>
        <div className="tasks_items">
            {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
            {list.tasks.map((task) => 
              <div key={task.id} className="tasks_items-row">
                <div className="checkbox">
                  <input id={`task-${task.id}`} type="checkbox" />
                  <label htmlFor={`task-${task.id}`}>
                    <svg 
                      width="11" 
                      height="8" 
                      viewBox="0 0 11 8" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" 
                      stroke="#FFFFFF" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"/>
                    </svg>
                  </label>
                </div>
                <input readOnly value={task.text}/>
              </div>
            )}
        </div>
    </div>
  )
}





