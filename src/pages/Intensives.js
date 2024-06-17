import React, { Component, useContext } from "react";
import PostService from "../API/PostService";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Context } from "../context";

const Intensives = () => {

  const [idSelectInsensive, setIdSelectInsensive] = useContext(Context);

  useEffect(()=>{
    console.log(idSelectInsensive);
  },[idSelectInsensive]);

  const [data, setData]=useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try{
        await PostService.getIntensives().then((response)=>{setData(response.data)});
      }catch(e){
        console.log(e);
      }
      
    };

    fetchData();

    setIdSelectInsensive(-1);
  }, []);

  const fillIntensiveTable=()=> {
    if (!data) {
      return null;
    }
    let intensives = data?.results.map((results) => (
		 <Link to={'/intensiv'} onClick={() => { setIdSelectInsensive(results.id) }} key={results.id} className="border-b">
        <td className="px-6 py-4 ">{results.name}</td>
        <td className="px-6 py-4">{results.description}</td>
        <td className="px-6 py-4">{results.created_at}</td>
        <td className="px-6 py-4">{results.updated_at}</td>
        <td className="px-6 py-4">
        </td>
      </Link>
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
                  // onClick={this.handleFilterChange}
                  // className={`rounded-md py-2 px-4 ${this.state.filter === "active" ? "font-bold" : ""}`}
                  >
                  Актуальные
                </button>
                <button
                  value="past"
                  // onClick={this.handleFilterChange}
                  // className={`rounded-md py-2 px-4 ${this.state.filter === "past" ? "font-bold" : ""}`}
                  >
                  Прошедшие
                </button>
                <button
                  value="all"
                  // onClick={this.handleFilterChange}
                  // className={`rounded-md py-2 px-4 ${this.state.filter === "all" ? "font-bold" : ""}`}
                  >
                  Все
                </button>
                <div className="common-line-filter">
                  {/* <div className={this.state.filter === "active" ? "line-filter" : ""}></div> */}
                  {/* <div className={this.state.filter === "past" ? "line-filter" : ""}></div> */}
                  {/* <div className={this.state.filter === "all" ? "line-filter" : ""}></div> */}
                  <div className="black-line-filter"></div>
                </div>
              </div>
              <div className="overflow-x-auto bg-white rounded-lg">
                <table className="border rounded">
                  <thead className="bg-[#F1F5F9] border-b">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">
                        Название
                      </th>
                      <th className="px-6 py-3 text-left font-semibold">
                        Описание
                      </th>
                      <th className="px-6 py-3 text-left font-semibold">
                        Начало интенсива
                      </th>
                      <th className="px-6 py-3 text-left font-semibold">
                        Окончание интенсива
                      </th>
                      <th className="px-6 py-3 text-left font-semibold">
                        Участники
                      </th>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default Intensives;
