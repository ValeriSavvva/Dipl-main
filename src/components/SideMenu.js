import React, { Component, useContext, useEffect, useState } from "react";
import { Context } from "../context";
import PostService from "../API/PostService";
import { Link } from "react-router-dom";

const SideMenu = () => {

	const [idSelectInsensive, setIdSelectInsensive] = useContext(Context);
	const [data, setData] = useState();

	useEffect(() => {
		
		const fetchData = async () => {
			const id = (idSelectInsensive && idSelectInsensive > 0)
			    ? idSelectInsensive
				: Number(localStorage.getItem('id'));
			try{
				await PostService.getIntensiv(id).then((res) => {
					setData(res.data);
					console.log(res.data);
				});
			}catch(e){
				window.location.href='/intensives'
			}
			

		};

		fetchData();
	}, [idSelectInsensive])

	return (
		<div className="side-menu-cont">
			<div className="column-container">
				<div className="title-block">
					<div className="font-18">Доступные роли</div>
				</div>
				<div className="header-list-conainer column-container">
					<div className="elem-list">
						<div className="font-14 ">Администратор</div>
					</div>
				</div>

			</div>
			<div className="column-container">
				<div className="title-block column-container">
					<div className="font-18">{data?.name}</div>
					<div className="font-14 color-title">10.01.2021-21.09.2022</div>
				</div>

				<div className="header-list-conainer column-container">
					<Link to='/intensiv' >Настройки интенсива</Link>
					<Link to='/statisticsIntensive' >Статистика</Link>
					<Link to='/commands' >Управление командами</Link>
					<Link to='/plan' >План интенсива</Link>
					<Link to='/manageMenu' >Управление системой</Link>
				</div>
			</div>
		</div>

	);
}

export default SideMenu;
