import React, { useState } from 'react';
import PostService from '../API/PostService';
import { useEffect } from 'react';
import { InputDescription } from '../components/InputDescription';

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
		  
      window.location.href = '/intensives';
      } else {
        alert('NOBODY');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка авторизации');
    }
  };
  useEffect(()=>{
    if(document.cookie.split("=")[1]) window.location.href = '/intensives'
  },[])

  return (
    <div className="body">
      <div className="main-block">
        <div className="center-block">
          <div className="list-content column-container">
            <div className="title font-32">Авторизация</div>
    <form onSubmit={handleSubmit} className='column-container'>
    <InputDescription
                    valueProp={login}
                    onChange={setLogin}
                    descriptionProp={"Логин"}
                  />
     <InputDescription
                    valueProp={pass}
                    onChange={setPass}
                    descriptionProp={"Пароль"}
                  />
      <button className='button-classic' type="submit">Войти</button>
    </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Authorization;