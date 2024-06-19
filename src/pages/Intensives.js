import React, { Component, useContext } from "react";
import PostService from "../API/PostService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Context } from "../context";
import{formatDate,convertBackDateFormat} from '../utils';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Intensives = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const [data, setData]=useState(null);
  const [filter, setFilter] = useState('all');

  // useEffect(()=>{

  // },[filter])

  useEffect(() => {
    const fetchData = async () => {
      try{
        await PostService.getIntensives().then((response)=>{setData(response.data)});
      }catch(e){
        console.log(e);
      }

    };
    fetchData();
    localStorage.setItem('id', -1)
  }, []);

  const fillIntensiveTable=()=> {
    if (!data) {
      return null;
    }
    let intensives = data?.results.map((results) => (
		 <tr key={results.id} className="border-b">
        <td className="px-6 py-4 "><Link to={'/intensiv'} onClick={() => { localStorage.setItem('id', results.id)}}>{results.name} </Link></td>
        {(windowWidth < 940)? null:<td className="px-6 py-4">{results.description}</td>}
        {(windowWidth < 720)? null:<td className="px-6 py-4">{formatDate(convertBackDateFormat(results.created_at))}</td>}
        {(windowWidth < 720)? null:<td className="px-6 py-4">{formatDate(convertBackDateFormat(results.updated_at))}</td>}
        {(windowWidth < 470)? null:<td className="px-6 py-4">{results.flow.map((elem)=>(elem))}
        </td>}
        </tr>
    ));

    return intensives;
  }


  // const handleFilterChange=(event)=> {
  //   this.setState({ filter: event.target.value });
  // }

  let intensives=fillIntensiveTable();

    return (
      <div className="main-block">
        <div className="center-block">
          <div className="">
            <div className="bg-[#FFFFFF] p-6 w-full flex flex-col">
              <div className="title font-32">Интенсивы</div>
              <button className="button-classic margin-right">
                <Link to={{pathname:'/createIntensive',propsNew:true}}> Создать интенсив</Link>
              </button>

              <div className="search-full-screen">
                <input className="w-full" name="search" placeholder="Поиск" />
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="filter">
                <button
                  value="active"
                  onClick={()=>setFilter('active')}
                  className={`rounded-md py-2 px-4 ${filter === "active" ? "font-bold" : ""}`}
                  >
                  Актуальные
                </button>
                <button
                  value="past"
                  onClick={()=>setFilter('past')}
                  className={`rounded-md py-2 px-4 ${filter === "past" ? "font-bold" : ""}`}
                  >
                  Прошедшие
                </button>
                <button
                  value="all"
                  onClick={()=>setFilter('all')}
                  className={`rounded-md py-2 px-4 ${filter === "all" ? "font-bold" : ""}`}
                  >
                  Все
                </button>
                <div className="common-line-filter">
                  <div className={filter === "active" ? "line-filter" : ""}></div>
                  <div className={filter === "past" ? "line-filter" : ""}></div>
                  <div className={filter === "all" ? "line-filter" : ""}></div>
                  <div className="black-line-filter"></div>
                </div>
              </div>
              <div className="overflow-x-auto bg-white rounded-lg">
                {
                  (intensives) ?
                  (
                    <table className="border rounded table">
                  <thead className="bg-[#F1F5F9] border-b">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">
                        Название
                      </th>
                      {(windowWidth < 940)? null:<th className="px-6 py-3 text-left font-semibold">
                        Описание
                      </th>}
                      {(windowWidth < 720)? null:<th className="px-6 py-3 text-left font-semibold">
                        Начало интенсива
                      </th>}
                      {(windowWidth < 720)? null:<th className="px-6 py-3 text-left font-semibold">
                        Окончание интенсива
                      </th>}
                      {(windowWidth < 470)? null:<th className="px-6 py-3 text-left font-semibold">
                        Участники
                      </th>}
                    </tr>
                  </thead>
                  <tbody>
                    {intensives || (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center">
                          Загрузка данных...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                  ):
                  (<div style={{ height: '20vh', width: '50vw', overflow: 'hidden'  }}>
                  <Skeleton height={'100%'} width={'100%'} />
                </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Intensives;
