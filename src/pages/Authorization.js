import React, { useState } from 'react';
import PostService from '../API/PostService';

const Authorization = () => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    // console.log(JSON.stringify({email: login, password: pass}));
    e.preventDefault();
    try {
		 const response =  await PostService.postAuthorization(login, pass);
      
      if (response) {
      //   Сохраняем токен в localStorage
      //   localStorage.setItem('token', token);
      //   Перенаправляем пользователя на защищенную страницу
			console.log(response)
		  
      //   window.location.href = '/intensives';
      } else {
        alert('NOBODY');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка авторизации');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Логин 
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
      </label>
      <label>
        Пароль 
        <input type="text" value={pass} onChange={(e) => setPass(e.target.value)} />
      </label>
      <button type="submit">Войти</button>
    </form>
  );
};

export default Authorization;