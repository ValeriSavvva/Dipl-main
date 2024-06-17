import React, { Component, useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { InputDescription } from "./InputDescription";
import { InputRadio } from "./InputRadio";
import { InputRadioDescription } from "./InputRadioDescription";
import { InputDelete } from "./InputDelete";
import { InputDeleteConteiner } from "./InputDeleteConteiner";
import { SelectDescription } from "./SelectDescription";
import { ChooseModal } from "./ChooseModal";
import PostService from "../API/PostService";
import { useContext } from "react";
import { Context } from "../context";
import { Link } from "react-router-dom";

const ListCreateIntensiv = (props) => {
  const [showCrit, setShowCrit] = useState(false);

  const [idSelectInsensive, setIdSelectInsensive] = useContext(Context);

  const [intensiveName, setIntensiveName] = useState("");
  const [intensiveDescription, setIntensiveDescription] = useState("");

  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const [windowTeachers, setWindowTeachers] = useState(false);
  const [windowFlows, setWindowFlows] = useState(false);
  const [windowStudRoles, setWindowStudRoles] = useState(false);
  const [itemsWindow, setItemsWindow] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [responseFlows, setResponseFlows] = useState([]);
  const [responseTeachers, setResponseTeachers] = useState([]);
  const [responseStudentRoles, setResponseStudentRoles] = useState([]);

  const [flows, setFlows] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentRoles, setStudentRoles] = useState([]);

  useEffect(() => {
    setIsOpen(windowTeachers || windowFlows || windowStudRoles);
    windowTeachers
      ? setItemsWindow([...responseTeachers])
      : windowFlows
      ? setItemsWindow([...responseFlows])
      : windowStudRoles
      ? setItemsWindow([...responseStudentRoles])
      : setItemsWindow([]);
  }, [windowTeachers, windowFlows, windowStudRoles]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        PostService.getTeachers(),
        PostService.getFlows(),
        PostService.getStudenRoles(),
        
      ]).then((response) => {
        setResponseTeachers(
          response[0].data.results.map((teacher) => {
            return { id: teacher.user.id, name: teacher.user.last_name };
          })
        );
        setResponseFlows(response[1].data.results);
        setResponseStudentRoles(response[2].data.results);
      });
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    // e.preventDefault();
    try {
      const ids_studentRoles = studentRoles?.map((item) => item.id);
      const ids_flows = flows?.map((item) => item.id);
      const ids_teachers = teachers?.map((item) => item.id);
      const response = PostService.postIntensives(
        intensiveName,
        intensiveDescription,
        "2024-06-11T16:35:51.736Z",
        "2024-06-11T16:35:51.736Z",
        ids_flows,
        ids_teachers,
        ids_studentRoles
      ).then(res=>{ setIdSelectInsensive(res.data.id)});

      if (response) {
      } 
		else {
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка авторизации");
    }
  };

  return (
    <div className="body">
      <SideMenu />
      <div className="main-block">
        <div className="center-block">
          <ChooseModal
            items={itemsWindow}
            itemsForResults={
              windowTeachers
                ? teachers
                : windowFlows
                ? flows
                : windowStudRoles
                ? studentRoles
                : null
            }
            isOpen={isOpen}
            onClose={
              windowTeachers
                ? setWindowTeachers
                : windowFlows
                ? setWindowFlows
                : windowStudRoles
                ? setWindowStudRoles
                : null
            }
            onSave={
              windowTeachers
                ? setTeachers
                : windowFlows
                ? setFlows
                : windowStudRoles
                ? setStudentRoles
                : null
            }
          />
          <div className="list-content column-container">
            <div className="title ">
              <div className="font-32">Создать интенсив</div>
            </div>
            <div className="column-container">
              <div className="element-list-input">
                <div className="font-18 bold-font">Интенсив</div>
              </div>
              <form>
                <InputDescription
                  valueProp={intensiveName}
                  onChange={setIntensiveName}
                  descriptionProp={"Название интенсива"}
                />
                <InputDescription
                  valueProp={intensiveDescription}
                  onChange={setIntensiveDescription}
                  descriptionProp={"Описание интенсива"}
                />
                <div className="element-list-input">
                  <div className="font-18 bold-font">Время проведения</div>
                </div>
                <div className="displey-row">
                  <InputDescription
                    valueProp={dateStart}
                    onChange={setDateStart}
                    descriptionProp={"Дата начала"}
                    typeProp={"date"}
                  />
                  <InputDescription
                    valueProp={dateEnd}
                    onChange={setDateEnd}
                    descriptionProp={"Дата окончания"}
                    typeProp={"date"}
                  />
                </div>

                <div className="element-list-input">
                  <div className="font-18 bold-font"> Участники</div>
                </div>
               
                <div className="element-list-input column-container">
                  <div className="">Список преподаватель</div>
                  <button type="button" onClick={() => setWindowTeachers(true)}>
                    {" "}
                    Выбрать{" "}
                  </button>
                  <div className="flex">
                    {teachers.length > 0 ? (
                      teachers.map((item) => (
                        <div className="ml-4 text-sm element-st">
                          {item.name}
                        </div>
                      ))
                    ) : (
                      <span className="text-[#6B7280]">
                        Выберите преподавателей
                      </span>
                    )}
                  </div>
                </div>

                <div className="element-list-input column-container">
                  <div className="">Список учебных групп</div>
                  <button type="button" onClick={() => setWindowFlows(true)}>
                    {" "}
                    Выбрать{" "}
                  </button>
                  <div className="flex">
                    {flows.length > 0 ? (
                      flows.map((item) => (
                        <div className="ml-4 text-sm element-st">
                          {item.name}
                        </div>
                      ))
                    ) : (
                      <span className="text-[#6B7280]">Выберите потоки</span>
                    )}
                  </div>
                </div>
                <div className="element-list-input column-container">
                  <div className="">Список ролей для студентов</div>
                  <button
                    type="button"
                    onClick={() => setWindowStudRoles(true)}
                  >
                    {" "}
                    Выбрать{" "}
                  </button>
                  <div className="flex">
                    {flows.length > 0 ? (
                      studentRoles.map((item) => (
                        <div className="ml-4 text-sm element-st">
                          {item.name}
                        </div>
                      ))
                    ) : (
                      <span className="text-[#6B7280]">Выберите роли</span>
                    )}
                  </div>
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
                  <Link
                   to={`/intensiv`}
                    className="button-classic margin element-list-input"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Создать интенсив
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCreateIntensiv;
