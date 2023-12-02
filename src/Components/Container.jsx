import React from "react";

const Container = ({ children }) => {
	return (
		<div className="mx-2 my-2 m-auto ml-auto mr-auto justify-center items-center">
			{children}
		</div>
	);
};

export default Container;
