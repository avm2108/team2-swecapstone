import React from "react";
import Header from "../../Components/Header";
import TopPanel from "../../Components/TopPanel";
import AdminHomeList from "../../Components/AdminHomeList/AdminHomeList";

const AdminHome = () => {
	return (
		<>
			<Header />
			<TopPanel />
			<AdminHomeList />
		</>
	);
};

export default AdminHome;
