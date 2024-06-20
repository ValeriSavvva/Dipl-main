import SideMenu from "../components/SideMenu";
import { useEffect, useState } from "react";
import PostService from "../API/PostService";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext } from "react";
import { Context } from "../context";
import { Link } from "react-router-dom";
import {convertDateFormat,
  convertBackDateFormat,
  formatDate,
   filterNotIncludeObjectsByNames,
   filterIncludeObjectsByNames
 } from '../utils';

const Intensiv = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try{
        const id = Number(localStorage.getItem('id'));
        await PostService.getIntensiv(id).then((res) => {
          setData(res.data);
        });
      }catch(e){
        window.location.href='/intensives';
      }
      
    };

    if(!PostService.token){window.location.href='/'}
    fetchData();
  });

  return (
    <div className="body">
      <SideMenu />
      <div className="main-block">
        <div className="center-block">
          <div className="list-content column-container">
            <div className="title ">
              {data ? (
                <div className="font-32">{data?.name}</div>
              ) : (
                <Skeleton></Skeleton>
              )}
            </div>
            <div className="column-container">
              <div className="element-list-input">
                <div className="font-18 bold-font">{
                  (data)?
                  (formatDate(convertBackDateFormat(data?.created_at)))+
                  ' - '+
                  (formatDate(convertBackDateFormat(data?.close_dt))||'дата окончания не проставлена')
                  :null
                }
                </div>
              </div>

              <div className="element-list-input">
                {data ? (
                  <div className="font-18">{data.description}</div>
                ) : (
                  <Skeleton></Skeleton>
                )}
              </div>
              <div className="element-list-input">
                <div className="font-18 bold-font">Участники</div>
              </div>
              <div className="element-list-input column-container">
                <div className="">Список учебных потоков</div>
                <div className="flex flex-wrap">
                  {data ? (
                    data.flow.map((elem) => (
                      <div className="ml-4 text-sm selectedInList">{elem}</div>
                    ))
                  ) : (
                    <Skeleton></Skeleton>
                  )}
                </div>
                <div className="element-list-input column-container">
                  <div className="">Список ролей для студентов</div>
                  <div className="flex flex-wrap">
                    {data ? (
                      data.roles.map((elem) => (
                        <div className="ml-4 text-sm selectedInList">{elem}</div>
                      ))
                    ) : (
                      <Skeleton></Skeleton>
                    )}
                  </div>
                </div>
                <div className="element-list-input column-container">
                  <div className="">Список преподавателей</div>
                  <div className="flex flex-wrap">
                    {data ? (
                      data.teacher_command.lenght ? (
                        data.teacher_command.map((elem) => (
                          <div className="ml-4 text-sm selectedInList">{elem}</div>
                        ))
                      ) : (
                        <div>Преподаватели не выбраны</div>
                      )
                    ) : (
                      <Skeleton></Skeleton>
                    )}
                  </div>
                </div>
                <div className="element-list-input flex justify-between">
                    <button className="button-classic w-100 "><Link to='/createIntensive'>Редактировать </Link></button>
                    <button className="button-ser" onClick={()=>PostService.deleteIntensiv(localStorage.getItem('id'))}>Удалить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { Intensiv };
