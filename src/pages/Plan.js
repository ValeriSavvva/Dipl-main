import { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import PostService from "../API/PostService";
import arowBut from '../icons/arowBut.svg';

const Plan = () => {

	useEffect(() => {

	})

	const Stage = ({ title, dateRange, steps }) => (
		<section className="flex flex-col justify-center items-start px-4 py-4 w-full leading-[150%] max-md:max-w-full">
			<h2 className="font-bold font-18">{title}</h2>
			<time className="color-title font-14">{dateRange}</time>
			{steps.map((step, index) => (
				<div key={index} className="flex p-4" >
					<img loading="lazy" src={step.imageSrc} alt="" className="p-2" />
					<div className="flex flex-col justify-center">
						<p className="p-1 text-base font-16">{step.title}</p>
						<time className="p-1 text-sm font-14">{step.date}</time>
					</div>
				</div>
			))}
		</section>
	);



	const stages = [
		{
			title: "Этап Знакомство с темой",
			dateRange: "12.09.21 - 13.09.21",
			steps: [
				{
					title: "Презентация тем командам",
					date: "12.09.21 - 12.09.21",
					imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c52598e48a7b62724fc32f6709ff87fe408e7418fc4cedb28c713d76c2c7279?apiKey=846541071cbf40a28d303604e165349a&",
				},
			],
		},
		{
			title: "Этап Формулировка идеи",
			dateRange: "14.09.21 - 15.09.21",
			steps: [
				{
					title: "Выступление команд",
					date: "14.09.21 - 14.09.21",
					imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c52598e48a7b62724fc32f6709ff87fe408e7418fc4cedb28c713d76c2c7279?apiKey=846541071cbf40a28d303604e165349a&",
				},
			],
		},
		{
			title: "Этап Реализация",
			dateRange: "15.09.21 - 15.10.21",
			steps: [
				{
					title: "Защита проектов",
					date: "15.10.21 - 16.10.21",
					imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c52598e48a7b62724fc32f6709ff87fe408e7418fc4cedb28c713d76c2c7279?apiKey=846541071cbf40a28d303604e165349a&",
				},
			],
		},
	];

	return (
		<div className="body">
			<SideMenu />
			<div className="main-block">
				<div className="center-block">
					<div className="column-container">
						<div className="title flex justify-between align-center">
							<div className="font-32">План интенсива</div>
							<button className='button-ser flex gap'>
								<div className=" font-bold font-14">Редактировать</div>
								<img
									height={10}
									width={10}
									loading="lazy"
									src={arowBut}
									className="aspect-[0.96] fill-black"
								/>
							</button>
						</div>
						<div className="space"></div>
						{stages.map((stage, index) => (
							<Stage
								key={index}
								title={stage.title}
								dateRange={stage.dateRange}
								steps={stage.steps}
							/>
						))}
					</div>

				</div>
			</div>
		</div>
	)
}

export default Plan

