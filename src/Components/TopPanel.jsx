import React, { useState } from "react";
const TopPanel = () => {
	// Use State
	const [numberOfStudents, updateNumberOfStudents] = useState(212);
	const [numberOfTeachers, updateNumberOfTeachers] = useState(23);
	const [studentsInAttendence, updateStudentsInAttendence] = useState(198);
	const [studentsDismissed, updateStudentsDismissed] = useState(0);

	return (
		<div className="counter-div w-[100vw] h-18 mt-20 border-maingreen border-b-2">
			<ul className="flex justify-between w-[100%] list-none h-[100%] p-0">
				<li className="admindashboard-top-div-list-li">
					<h4>{numberOfStudents}</h4>
					<p>STUDENTS</p>
				</li>
				<li className="admindashboard-top-div-list-li">
					<h4>{numberOfTeachers}</h4>
					<p>TEACHERS</p>
				</li>
				<li className="admindashboard-top-div-list-li admindashboard-top-div-list-li-3">
					<h4>
						{studentsInAttendence}/{numberOfStudents}
					</h4>
					<p>IN ATTENDENCE</p>
				</li>
				<li
					className="admindashboard-top-div-list-li"
					style={{ border: "none" }}
				>
					<h4>
						{studentsDismissed}/{numberOfStudents}
					</h4>
					<p>DISMISSED</p>
				</li>
			</ul>
		</div>
	);
};

export default TopPanel;
