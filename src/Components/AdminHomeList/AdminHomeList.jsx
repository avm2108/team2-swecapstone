import React, { useState } from "react";
import { data } from "./Data";

const AdminHomeList = () => {
	const [Data, setData] = useState(data);

	const handleDismissClick = (id) => {
		const updatedData = Data.filter((item) => item.id !== id);
		setData(updatedData);
	};

	return (
		<table className="w-full mt-1 divide-y divide-gray-200 text-semibold text-[0.6rem] sm:text-[0.8rem]">
			<thead>
				<tr className="h-10">
					<th className="p-1 sm:p-2">Status</th>
					<th className="p-1 sm:p-2">Students</th>
					<th className="p-1 sm:p-2">Grade</th>
					<th className="p-1 sm:p-2">Scoop-up Person</th>
					<th className="p-1 sm:p-2">Position</th>
				</tr>
			</thead>
			<tbody>
				{Data.map((item, index) => (
					<tr
						key={item.id}
						className={index % 2 === 0 ? "bg-gray-100 h-10" : "h-10"}
					>
						<td className="p-1 sm:p-2">
							<button className="border-maingreen border-[1px] h-[1.1rem] text-maingreen px-2 sm:px-2 rounded text-[0.6rem] flex justify-center items-center">
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
						<td className="p-1 sm:p-2">{item.grade}</td>
						<td className="p-1 sm:p-2 flex items-center">
							<img
								src={item.scoopUpPerson.pic}
								alt={item.scoopUpPerson.name}
								className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-1 sm:mr-2"
							/>
							<p className="pl-1 my-auto">{item.scoopUpPerson.name}</p>
						</td>
						<td className="p-1 sm:p-2">
							<button
								className="bg-[#ff0000] text-white h-[1.1rem] px-1 sm:px-2 py-0.5 rounded-[3px] text-[0.6rem] sm:text-[0.7rem] flex justify-center items-center"
								onClick={() => handleDismissClick(item.id)}
							>
								Dismiss
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default AdminHomeList;
