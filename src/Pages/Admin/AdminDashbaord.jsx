import React, { useState } from "react";
import Header from "../../Components/Header";
import Container from "../../Components/Container";
import MobileList from "../../Components/StudentActivityList/StudentActivityList";
import TopPanel from "../../Components/TopPanel";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineCar } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsPersonX } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";

const Dashboard = () => {
	return (
		<>
			<Header />
			<TopPanel />

			{/* // Dashboard Tracking */}

			<Container>
				<div className="tracking-component grid grid-cols-2 gap-3 mt-3 mx-2">
					<div className="comp-1 w-[10.5rem] h-30 bg-maingreen text-center rounded-lg">
						<h2 className="text-white font-bold font-roboto text-[0.6rem] pt-2 px-2">
							ATTENDENCE TRACKING
						</h2>
						<div className="outer flex flex-col w-[100%]">
							<div className="inner admindashboard-tracking-component-inner">
								<h4 className="text-mainyellow">136</h4>
								<h3>ON TIME</h3>
								<AiOutlineCheckCircle />
							</div>
							<div className="inner admindashboard-tracking-component-inner">
								<h4 className="text-red-500">48</h4>
								<h3>LATE</h3>
								<AiOutlineClockCircle />
							</div>
							<div
								className="inner admindashboard-tracking-component-inner"
								style={{ border: "none" }}
							>
								<h4 className="text-[#007136]">14</h4>
								<h3>ABSENT</h3>
								<BsPersonX />
							</div>
						</div>
					</div>
					<div className="comp-2 w-[10.5rem] h-30 bg-maingreen text-center rounded-lg">
						<h2 className="text-white font-bold font-roboto text-[0.6rem] pt-2 px-2">
							DISMISSAL TRACKING
						</h2>
						<div className="outer flex flex-col w-[100%]">
							<div className="inner admindashboard-tracking-component-inner">
								<h4 className="text-mainyellow">9</h4>
								<h3>SCOOP-UP CHANGES</h3>
								<SlCalender />
							</div>
							<div className="inner admindashboard-tracking-component-inner">
								<h4 className="text-red-500">3</h4>
								<h3>EARLY RELEASES</h3>
								<AiOutlineCar />
							</div>
							<div
								className="inner admindashboard-tracking-component-inner"
								style={{ border: "none" }}
							>
								<h4 className="text-[#007136]">2</h4>
								<h3>REQUESTS</h3>
								<SlCalender />
							</div>
						</div>
					</div>
					<div className="comp-3 w-[10.5rem] h-30 bg-maingreen text-center rounded-lg">
						<h2 className="text-white font-bold font-roboto text-[0.6rem] pt-2 px-2">
							ATTENDENCE TRACKING
						</h2>
						<div className="outer flex flex-col w-[100%]">
							<div className="inner admindashboard-tracking-component-inner">
								<h4 className="text-mainyellow">136</h4>
								<h3>ON TIME</h3>
								<AiOutlineCheckCircle />
							</div>
							<div className="inner admindashboard-tracking-component-inner">
								<h4 className="text-red-500">48</h4>
								<h3>LATE</h3>
								<AiOutlineClockCircle />
							</div>
							<div
								className="inner admindashboard-tracking-component-inner"
								style={{ border: "none" }}
							>
								<h4 className="text-[#007136]">14</h4>
								<h3>ABSENT</h3>
								<BsPersonX />
							</div>
						</div>
					</div>
					<div className="comp-4 w-[10.5rem] h-30 bg-maingreen text-center rounded-lg">
						<h2 className="text-white font-bold font-roboto text-[0.6rem] pt-2 px-2">
							ATTENDENCE TRACKING
						</h2>
						<div className="outer flex flex-col w-[100%]">
							<div className="inner admindashboard-tracking-component-inner">
								<h4 className="text-mainyellow">136</h4>
								<h3>ON TIME</h3>
								<AiOutlineCheckCircle />
							</div>
							<div className="inner admindashboard-tracking-component-inner">
								<h4 className="text-red-500">48</h4>
								<h3>LATE</h3>
								<AiOutlineClockCircle />
							</div>
							<div
								className="inner admindashboard-tracking-component-inner"
								style={{ border: "none" }}
							>
								<h4 className="text-[#007136]">14</h4>
								<h3>ABSENT</h3>
								<BsPersonX />
							</div>
						</div>
					</div>
				</div>
			</Container>

			{/* // Student Activity */}

			<Container>
				<div className="student-activity-component w-[97%] rounded-lg border-maingreen border-[1px] h-auto ml-2 mt-3">
					<div className="top w-[100%] border-maingreen border-b-[1px] h-8 flex justify-between px-3 items-center my-auto">
						<h4 className="text-[0.8rem] my-auto text-[#214c34]">
							Student Activity
						</h4>
						<button className="my-auto h-5 text-[0.7rem] w-20 text-[#214c34] border-[#214c34] border-[1px] rounded text-center p-0">
							VIEW ALL
						</button>
					</div>
					<MobileList />
				</div>
			</Container>
		</>
	);
};

export default Dashboard;
