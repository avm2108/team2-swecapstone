import React from "react";
import { PiWarningOctagon } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { PiClipboardText } from "react-icons/pi";
import { data } from "./AdminApprovalsList/Data";

const ApprovalModal = ({ show, student, updateCount }) => {
	const studentsData = data;

	// get date
	const currentDate = new Date();

	const day = currentDate.getDate();
	const month = currentDate.getMonth() + 1; // Month starts from 0, so add 1
	const year = currentDate.getFullYear();

	const formattedDay = day < 10 ? `0${day}` : day;
	const formattedMonth = month < 10 ? `0${month}` : month;

	const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

	// get time
	let hours = currentDate.getHours();
	const minutes = currentDate.getMinutes();

	const amOrPm = hours >= 12 ? "pm" : "am";
	hours %= 12;
	hours = hours || 12;

	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	const formattedTime = `${hours}:${formattedMinutes}${amOrPm}`;

	const handleApproval = () => {
		const std = studentsData.find((item) => item.id === student.id);
		std.status = "Approved";
		show(false);

		updateCount();
	};

	return (
		<div className="approval-modal">
			<div className="heading flex justify-center bg-[#ca0000] w-[75%] mx-auto items-center space-x-3 py-[4px] rounded px-2 mb-1">
				<PiWarningOctagon className="text-white w-7 h-7" />
				<h1 className="text-[1rem] text-white my-auto font-roboto">
					Approval Needed
				</h1>
			</div>

			{/* // Person */}
			<div className="flex w-[100%] h-10 justify-between">
				<IoPersonOutline className="m-auto w-5 h-5" />
				<div className="flex bg-[#ffffff] w-[80%] items-center space-x-2 border-[#4eb780] border-[1px] rounded h-[100%] px-2 mr-5">
					<img
						src={student.student?.pic}
						alt="IMAGE"
						className="w-auto h-6 rounded-full"
					/>
					<h4 className="text-[0.8rem] font-roboto my-auto">
						{student.student?.name}
					</h4>
				</div>
			</div>

			{/* time and vehicle */}
			<div className="flex w-[100%] h-10 justify-between">
				<GoClock className="m-auto w-5 h-5" />
				<div className="bg-[#ffffff] w-[80%] items-left py-1 border-[#4eb780] border-[1px] rounded h-[100%] px-2 mr-5 flex flex-col justify-between">
					<h5 className="text-[0.8rem] font-roboto my-auto">{formattedDate}</h5>
					<h4 className="text-[0.8rem] text-maingreen font-roboto my-auto">
						{formattedTime}
					</h4>
				</div>
			</div>

			<div className="flex w-[100%] h-10 justify-between">
				<FaCarAlt className="m-auto w-5 h-5" />
				<div className="bg-[#ffffff] w-[80%] items-left py-1 border-[#4eb780] border-[1px] rounded h-[100%] px-2 mr-5 flex">
					<h4 className="text-[0.8rem] font-roboto my-auto">Car</h4>
				</div>
			</div>

			{/* // guardian */}
			<div className="flex w-[100%] h-10 justify-between">
				<IoPersonOutline className="m-auto w-5 h-5" />
				<div className="flex bg-[#ffffff] w-[80%] items-center space-x-2 border-[#4eb780] border-[1px] rounded h-[100%] px-2 mr-5">
					<img
						src={student.guardian?.img}
						alt="IMAGE"
						className="w-auto h-6 rounded-full"
					/>
					<h4 className="text-[0.8rem] font-roboto my-auto">
						{student.guardian?.name}
					</h4>
				</div>
			</div>

			{/* // note */}
			<div className="flex w-[100%] h-16 justify-between">
				<PiClipboardText className="m-auto w-5 h-5" />
				<div className="bg-[#ffffff] w-[80%] items-left py-1 border-[#4eb780] border-[1px] rounded h-[100%] px-2 mr-5 flex">
					<h4 className="text-[0.8rem] font-roboto my-auto">
						{student?.reason}
					</h4>
				</div>
			</div>

			{/* Submit Button */}
			<div className="buttons flex w-[88%] h-auto justify-around mx-auto mt-3">
				<button
					type="button"
					className="border-[#ca0000] border-[1px] rounded-xl text-[#CA0000] px-3 py-[7px]"
					onClick={() => show(false)}
				>
					Cancel
				</button>
				<button
					type="submit"
					className="rounded-xl text-white bg-maingreen px-3 py-[7px]"
					onClick={() => handleApproval()}
				>
					Approve
				</button>
			</div>
		</div>
	);
};

export default ApprovalModal;
