import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import AdminApprovalsList from "../../Components/AdminApprovalsList/AdminApprovalsList";
import Container from "../../Components/Container";
import { data } from "../../Components/AdminApprovalsList/Data";

const AdminScheduledReleases = () => {
	const [pendingCount, setPendingCount] = useState(0);
	const [approvedCount, setApprovedCount] = useState(0);

	const updateCounts = () => {
		const pendingStudents = data.filter((item) => item.status === "Pending");
		const approvedStudents = data.filter((item) => item.status === "Approved");

		setPendingCount(pendingStudents.length);
		setApprovedCount(approvedStudents.length);
	};

	useEffect(() => {
		updateCounts();
	}, []);

	return (
		<>
			<Header />

			{/* // top panel */}
			<div className="releases-top-panel mt-20 w-[100vw] h-20 border-maingreen border-b-[1px] flex justify-around items-center">
				<div className="approved-box bg-[#214c34] h-10 w-40 flex justify-evenly px-2 items-center rounded-[5px] border-[#214c34] border-[1px]">
					<div className="flex flex-col h-[100%] w-[100%] justify-evenly -space-y-2">
						<h4 className="text-[0.9rem] font-roboto font-semibold text-mainyellow">
							{approvedCount}
						</h4>
						<h4 className="text-[0.8rem] text-[#4eb780]">APPROVED</h4>
					</div>
					<AiOutlineCheckCircle className="w-6 h-6 text-mainyellow" />
				</div>
				<div className="pending-box bg-mainyellow h-10 w-40 flex justify-evenly px-2 items-center rounded-[5px] border-maingreen border-[1px]">
					<div className="flex flex-col h-[100%] w-[100%] justify-evenly -space-y-2">
						<h4 className="text-[0.9rem] font-roboto font-semibold text-maingreen">
							{pendingCount}
						</h4>
						<h4 className="text-[0.8rem] text-[#214c34]">PENDING</h4>
					</div>
					<AiOutlineClockCircle className="w-6 h-6 text-maingreen" />
				</div>
			</div>

			{/* Approvals List */}
			<Container>
				<AdminApprovalsList updateCount={updateCounts} />
			</Container>
		</>
	);
};

export default AdminScheduledReleases;
