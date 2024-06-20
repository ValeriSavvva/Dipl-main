import React, { Component, useState } from "react";
import SideMenu from "../components/SideMenu";
import { InputDescription } from "../components/InputDescription";
import  {SelectDescription}  from "../components/SelectDescription";
import { useEffect } from "react";
import PostService from "../API/PostService";


const CreateIntensive = () => {

    const [teachers, setTeachers]=useState([]);
    const [flows, setFlow]=useState([]);
    const [rolesStudent, setRolesStudent]=useState([]);

  useEffect(() => {
    async function fetchDataAndSet() {
        const rolesStudentList = await PostService.getRolesOnIntensives();
        const teachersList = await PostService.getTeachers();
        const flowsList = await PostService.getFlows();
        
        Promise.all([rolesStudentList, teachersList, flowsList]).then((values) => {
        setTeachers(values[1].data);
        setFlow(values[2].data);
        setRolesStudent(values[0].data);
        });
        }
        
        if(!PostService.token){window.location.href='/'};
        fetchDataAndSet();
  }, []);

  const fillFlows=()=> {
    if (!flows) {
      return null; // или можно вернуть индикатор загрузки
    }
    let flowsList = flows?.results?.map((results) => (
        <option value={results.id}>{results.name}</option>
    ));

    return flowsList;
  }

  const fillTeachers=()=> {
    if (!teachers) {
      return null; // или можно вернуть индикатор загрузки
    }
    let teachersList = teachers?.results?.map((results) => (
        <option value={results.id}>{results.user.last_name}</option>
    ));

    return teachersList;
  }

  const fillRolesStudent=()=> {
    if (!rolesStudent) {
      return null; // или можно вернуть индикатор загрузки
    }
    let rolesStudentList = rolesStudent?.results?.map((results) => (
        <option value={results.id}>{results.name}</option>
    ));

    return rolesStudentList;
  }
  let flowsRender = fillFlows();
  let rolesStudentRender = fillRolesStudent();
  let teachersRender = fillTeachers();


  return (
    <div className="body">
      <SideMenu />
      <div className="main-block">
        <div className="center-block">
          <div className="list-content column-container">
            <div className="title ">
              <div className="font-32">Создать интенсив</div>
            </div>
            <div className="column-container">
              <div className="element-list-input">
                <div className="font-18 bold-font">Интенсив</div>
              </div>
              <InputDescription descriptionProp={"Название интенсива"} />
              <InputDescription descriptionProp={"Описание интенсива"} />
              <div className="element-list-input">
                <div className="font-18 bold-font">Время проведения</div>
              </div>
              <div className="displey-row">
                <InputDescription
                  descriptionProp={"Дата начала"}
                  typeProp={"date"}
                />
                <InputDescription
                  descriptionProp={"Дата окончания"}
                  typeProp={"date"}
                />
              </div>

              <div className="element-list-input">
                <div className="font-18 bold-font"> Участники</div>
              </div>

              <div className="element-list-input column-container">
                <div className="">Список учебных потоков</div>
                <select className="element-input-style" onChange={(e)=>setFlow(e.target.value)}>
                  {flowsRender}
                </select>
              </div>

              <div className="element-list-input column-container">
                <div className="">Список ролей для студентов</div>
                <select className="element-input-style" onChange={(e)=>setRolesStudent(e.target.value)}>
                  {rolesStudentRender}
                </select>
              </div>

              <div className="element-list-input column-container">
                <div className="">Список преподавателей</div>
                <select className="element-input-style" onChange={(e)=>setTeachers(e.target.value)}>
                  {teachersRender}
                </select>
              </div>

              <div className="element-list-input">
                <div className="font-18 bold-font"> Файлы для студентов</div>
              </div>

              <div>
                <div className="border-2 border-dashed border-[#9CA3AF] rounded-md p-4 text-[#6B7280] file-block ">
                  <label
                    htmlFor="fileUpload"
                    className="block text-sm font-medium mb-1 cursor-pointer"
                  >
                    Перетащите необходимые файлы
                  </label>
                  <input
                    id="fileUpload"
                    name="fileUpload"
                    type="file"
                    className="block text-sm text-[#6B7280] file:mr-4 file:py-2 file:px-4 file:rounded-md
                               file:border-0 file:text-sm file:font-semibold file:bg-[#E0E7FF] file:text-[#1D4ED8] cursor-pointer"
                    multiple
                  />
                </div>
              </div>
              <div>
                <button className="button-classic margin element-list-input">
                  Создать интенсив
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateIntensive;
