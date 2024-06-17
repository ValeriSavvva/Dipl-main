"use client";
import React from "react";
import DragElement from "../components/DragComponents/DragElement";
import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import SideMenu from "../components/SideMenu";
import DragContainer from '../components/DragComponents/DragContainer';
import Modal from '../components/ModalWindow'

const base = [    
  { index: 0, content: 'Мындрила М.А,' },
  { index: 1, content: 'Сындрила М.А,' },
  { index: 2, content: 'Иындрила М.А,' },
  { index: 3, content: 'Тындрила М.А,' },
  { index: 4, content: 'Уындрила М.А,' },
  { index: 5, content: 'Шындрила М.А,' },
  { index: 6, content: 'Зындрила М.А,' },
  { index: 7, content: 'Мындрила М.А,' },
  { index: 8, content: 'Мындрила М.А,' },
  { index: 9, content: 'Мындрила М.А,' },
  { index: 10, content: 'Мындрила М.А,' }]

const TEAM_NAMES = [{id:'Команда1', name:"Команда 1"}, {id:'Команда2', name:"Команда 2"}];


function CreateCommand() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [countTeams, setCountTeams] = useState(2);
  const [teams, setTeams] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    setTeamMembers(base);
    setTeams(TEAM_NAMES);
    setSearchResults(teamMembers);
  }, []);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(()=>{
    if(searchTerm) setSearchResults(teamMembers.filter(item =>
      item.content.toLowerCase().includes(searchTerm.toLowerCase())))
      else setSearchResults(teamMembers)
  },[searchTerm,teamMembers])

  const handleModalClose = (option) => {
    setIsModalOpen(false);
    // setSelectedOption(option);
    // setTeams([]);
    let massTeam = [];
    for(let i=1 ; i<= countTeams; i++){
      massTeam.push({id:`Команда`+i, name:`Команда ${i}`})
    }
    setTeams(massTeam)
  };





  return (
	  <div className="body">
		  <SideMenu />
		  <div className="main-block">
			  <div className="center-block">
        <div className="font-roboto min-h-screen">

        <Modal isOpen={isModalOpen} onClose={handleModalClose} />
        {/* <Modal></Modal> */}

          <div className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="title">
              <div className="font-32">Команды</div>
              <p className="text-sm text-[#6B7280]">
                Создайте команды и распределите участников интенсива по командам
              </p>
            </div>
          </div>




          <div className="max-w-6xl mx-auto p-6 space-y-6">
            <div className="flex items-center space-x-2 mb-4  flex-row">
              <input
                type="number"
                onChange={(e)=>{setCountTeams(+e.target.value)}}
                className="w-12 p-2 border border-[#D1D5DB] rounded-md text-center"
                // defaultValue={countTeams}
                value={countTeams}
              />
              <button type="button" className="button-classic" onClick={()=>{setIsModalOpen(true)}} >Изменить</button>
            </div>
            <div className="flex gap margin-top">

              <div className="">


                <div className="left-column-command">
                  <h2 className="text-lg font-bold text-[#333]">
                    Созданные команды
                  </h2>
                  <p className="text-sm text-[#6B7280]">
                    Для добавления участников в команды вы можете использовать
                    выделенный список или переместить свободных участников в
                    команды с помощью drag and drop
                  </p>
                  {teams.map((teamName) => {
                    // console.log(teamName)
                    return(
                    <DragContainer key={teamName.id} teamName={teamName.name} func={setTeamMembers} team={teamMembers}/>)
                  })
                    }
                </div>
              </div>
              <div>
                <div className="bg-white p-6 container-free-students">
                  <h2 className="text-lg font-bold mb-4">
                    Свободные участники
                  </h2>
                  <div className="flex items-center mb-4 search-full-screen ">
                    <i className="fa fa-search text-[#6B7280]"></i>
                    <input
                      type="text"
                      placeholder="Поиск"
                      className="w-full p-2 border-0"
                      value={searchTerm} onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="container-free-students-list">
                      {searchResults.map((index) => (
                        <DragElement key={index.index} data={index} selectedMembers={selectedMembers} setSelectedMembers={setSelectedMembers}></DragElement>
                      ))}
                    </div>
                  </div>
                  <button className="button-classic">
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	 </div>
  );
}





export default CreateCommand;



