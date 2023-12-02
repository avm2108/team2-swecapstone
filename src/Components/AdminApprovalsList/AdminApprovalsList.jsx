import React, { useState } from "react";
import { data } from "./Data";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import ApprovalModal from "../ApprovalModal";

const AdminHomeList = ({ updateCount }) => {
	const [Data, setData] = useState(data);
	const [selectedStudent, setSelectedStudent] = useState({});
	const [showModal, setShowModal] = useState(false);

	const handleDismissClick = (id) => {
		const updatedData = Data.filter((item) => item.id !== id);
		setData(updatedData);
	};

	const handleApprove = (item) => {
		setSelectedStudent(item);

		if (item.status !== "Approved") {
			setShowModal(!showModal);
		} else {
			alert("Already Approved");
		}
	};

	return (
		<>
			<table className="w-full mt-1 divide-y divide-gray-200 text-semibold text-[0.6rem] sm:text-[0.8rem]">
				<thead>
					<tr className="h-10">
						<th className="p-1 sm:p-2">Status</th>
						<th className="p-1 sm:p-2">Students</th>
						<th className="p-1 sm:p-2">Release Date</th>
						<th className="p-1 sm:p-2">Approval Date</th>
						<th className="p-1 sm:p-2"></th>
					</tr>
				</thead>
				<tbody>
					{Data.map((item, index) => (
						<tr
							key={item.id}
							className={
								index % 2 === 0 ? "bg-gray-100 h-10 my-auto" : "h-10 my-auto"
							}
						>
							<td className="p-1 sm:p-2">
								<button
									className={
										item.status == "Approved"
											? "bg-maingreen text-[#214c34] h-[1.1rem] px-2 sm:px-2 rounded text-[0.5rem] flex justify-center items-center w-12"
											: "bg-mainyellow text-[#214c34] h-[1.1rem] px-2 sm:px-2 rounded text-[0.5rem] flex justify-center items-center w-12"
									}
								>
									{item.status}
								</button>
							</td>
							<td className="p-1 sm:p-2 flex items-center">
								<img
									src={item.student.pic}
									alt={item.student.name}
									className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-1 sm:mr-2"
								/>
								<p className="pl-1 my-auto">{item.student.name}</p>
							</td>
							<td className="p-1 sm:p-2">{item.releaseDate}</td>
							<td className="p-1 sm:p-2">{item.approvalDate}</td>

							<td className="my-auto sm:p-2 flex space-x-1 items-center justify-center p-auto h-10">
								<button
									className="bg-[#214c34] text-white h-[1.1rem] px-[0.7rem] sm:px-2 py-0.7 rounded-[3px] text-[0.6rem] sm:text-[0.7rem] flex justify-center items-center"
									onClick={() => handleApprove(item)}
								>
									View
								</button>
								<button className="bg-[#4eb780] text-white h-[1.1rem] px-1 sm:px-2 py-0.5 rounded-[3px] text-[0.6rem] sm:text-[0.7rem] flex justify-center items-center">
									<FaCheck />
								</button>
								<button
									className="bg-[#4f4f4f] text-white h-[1.1rem] px-1 sm:px-2 py-0.5 rounded-[3px] text-[0.6rem] sm:text-[0.7rem] flex justify-center items-center"
									onClick={() => handleDismissClick(item.id)}
								>
									<RxCross2 />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{showModal ? (
				<ApprovalModal
					student={selectedStudent}
					show={setShowModal}
					updateCount={updateCount}
				/>
			) : (
				""
			)}
		</>
	);
};

export default AdminHomeList;
