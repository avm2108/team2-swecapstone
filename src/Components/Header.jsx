import React, { useState } from "react";
import { Nav, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";
import adminImage from "../assets/Images/admin.jpg";
import HeadImage from "../assets/Images/HeadImage.png";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Header = () => {
	const navigate = useNavigate();
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	return (
		<header className="absolute top-0 z-10">
			<div className="nav-top bg-mainyellow w-[100vw] h-20 flex justify-center items-center">
				{!showSidebar && (
					<FontAwesomeIcon
						icon={faBars}
						onClick={toggleSidebar}
						className="sidebar-toggle text-maingreen my-auto left-6 right-auto"
					/>
				)}
				<img src={HeadImage} alt="Head Image" className="w-auto h-12" />
			</div>

			<Col
				sm={showSidebar ? 3 : 0}
				md={2}
				className={`text-light sidebar font-Style absolute top-0 ${
					showSidebar ? "show" : "hide"
				}`}
			>
				<div className="sidebar d-flex align-items-end ">
					{showSidebar && (
						<FontAwesomeIcon
							icon={faTimes}
							onClick={toggleSidebar}
							className="close-icon"
						/>
					)}
				</div>

				<Nav
					className="flex-column d-flex align-items-center space-y-5"
					style={{ height: "87vh" }}
				>
					<div>
						<div className="w-42 text-center flex">
							<Image src={adminImage} width={30} height={30} roundedCircle />
							&nbsp; &nbsp;
							<span className="m-auto text-[#4EB780] text-xl">
								Administrator
							</span>
						</div>
					</div>
					<div onClick={() => navigate("/Dashboard")}>
						<span>Dismissal Dashboard</span>
					</div>
					<div onClick={() => navigate("/Dashboard/AddStudent")}>
						<span>Add Student</span>
					</div>
					<div onClick={() => navigate("/Dashboard/EditStudent")}>
						<span>View Students</span>
					</div>
					<div onClick={() => navigate("/Dashboard/ScheduledReleases")}>
						<span>Release Scheduling</span>
					</div>
					<div onClick={() => navigate("/")}>
						<span>Log Out</span>
					</div>
				</Nav>
			</Col>
		</header>
	);
};

export default Header;
