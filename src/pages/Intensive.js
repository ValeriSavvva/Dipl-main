import SideMenu from "../components/SideMenu";
import { useEffect, useState } from "react";
import PostService from "../API/PostService";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext } from "react";
import { Context } from "../context";

const Intensiv = (props) => {
  const [data, setData] = useState();
  const [idSelectInsensive, setIdSelectInsensive] = useContext(Context);

  useEffect(() => {
    console.log("idSelectInsensive", idSelectInsensive);
    const fetchData = async () => {
        // const id = (idSelectInsensive && idSelectInsensive > 0)
        //     ? idSelectInsensive
        //     : Number(localStorage.get('id'));
        await PostService.getIntensiv(idSelectInsensive).then((res) => {
          setData(res.data);
        });
      
    };

    fetchData();
  }, [idSelectInsensive]);

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
                <div className="font-18 bold-font">01.01.2023 - 30.01.2023</div>
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
                <div className="flex">
                  {data ? (
                    data.flow.map((elem) => (
                      <div className="ml-4 text-sm element-st">{elem}</div>
                    ))
                  ) : (
                    <Skeleton></Skeleton>
                  )}
                </div>
                <div className="element-list-input column-container">
                  <div className="">Список ролей для студентов</div>
                  <div className="flex">
                    {data ? (
                      data.roles.map((elem) => (
                        <div className="ml-4 text-sm element-st">{elem}</div>
                      ))
                    ) : (
                      <Skeleton></Skeleton>
                    )}
                  </div>
                </div>
                <div className="element-list-input column-container">
                  <div className="">Список преподавателей</div>
                  <div className="flex">
                    {data ? (
                      data.teacher_command.lenght ? (
                        data.teacher_command.map((elem) => (
                          <div className="ml-4 text-sm element-st">{elem}</div>
                        ))
                      ) : (
                        <div>Преподаватели не выбраны</div>
                      )
                    ) : (
                      <Skeleton></Skeleton>
                    )}
                  </div>
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
