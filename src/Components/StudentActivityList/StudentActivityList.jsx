import React from "react";
import { Data } from "./Data";
import { BiSolidRightArrow } from "react-icons/bi";

const MobileList = () => {
	return (
		<div className="bg-gray-100 mb-1">
			{Data.map((data, index) => (
				<div
					key={index}
					className={`flex justify-between w-[100%] items-center px-2 py-2 ${
						index % 2 === 0 ? "bg-white" : "bg-gray-200"
					}`}
				>
					<div className="w-12 p-2 rounded-full">
						<img
							src={data.img}
							alt="Img"
							className="rounded-full border border-gray-400"
						/>
					</div>
					<div className="w-auto ml-0 mr-auto p-2 mt-auto mb-auto">
						<p className="text-[0.6rem] my-auto">{data.sentence}</p>
					</div>
					<div className="w-20 p-2 flex justify-end">
						<button className="my-auto h-5 text-[0.6rem] w-20 text-[#214c34] rounded text-center p-0 flex justify-around items-center">
							VIEW ALL
							<BiSolidRightArrow />
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default MobileList;
