import React, { useEffect, useState } from 'react';
import axios from 'axios';

import List from '../List';
import Badge from '../Badge'


import closeForm from '../../assets/img/close.svg';
import './Add.scss';


const AddButtonList = ({colors, onAdd}) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleColor, setVisibleColor] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    if (Array.isArray(colors)) {
      setVisibleColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisibleForm(false);
    setInputValue('');
    setVisibleColor(colors[0].id);
  };
  const addList = () => {
    if (!inputValue) {
      alert('Введите текст');
      return;
    }
    setIsLoading(true);
    axios.post('http://localhost:3001/lists', { 
      name: inputValue, 
      colorId: visibleColor
    })
    .then(({ data }) => {
      const color = colors.filter(c => c.id === visibleColor)[0];
      const listObj = {...data, color};
      onAdd(listObj);
      onClose();
    }).finally(() =>{
        setIsLoading(false);
    }).catch(() => {
        alert('ошибка')
    });
  }
  
  return (
    <div className="add-list">
      <List 
      click ={() => setVisibleForm(!visibleForm)}
      
      items={[
      {
        className: 'list_add-button',
        icon: (<svg 
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>),
        name: 'Добавить папку'
      }
    ]}
    />
    {visibleForm && 
    (<div className="add-list_form">
      <img 
        onClick ={onClose}
        src={closeForm} alt='close form' className="add-list_form-close">
      </img>
      <input 
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className='field' type="text" placeholder='Название папки' 
      />
      <div className="add-list_form-colors">
        <ul>
          {colors.map(color =>(
          <Badge 
            onClick={() => setVisibleColor(color.id)} 
            key={color.id} 
            color={color.name}
            className={visibleColor === color.id && 'active'}
          />))}
        </ul>
      </div>
      <button onClick={addList} className='button'>{isLoading ? "Добавление..." : "Добавить"}</button>
    </div>
    )}
  </div>
  );
};


export default AddButtonList;