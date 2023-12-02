import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes and Route
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import RegisterSchool from "./Pages/RegisterSchool.jsx";
import Dashboard from "./Pages/Admin/AdminDashbaord.jsx";
import AdminHome from "./Pages/Admin/AdminHome.jsx";
import AddStudent from "./Pages/Admin/AddStudent.jsx";
import EditStudent from "./Pages/Admin/EditStudent.jsx";
import AdminScheduledReleases from "./Pages/Admin/AdminScheduledReleases.jsx";
import ApprovalModal from "./Components/ApprovalModal.jsx";
import AdminHomeV2 from "./Pages/Admin/AdminHomeV2.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/RegisterSchool" element={<RegisterSchool />} />
				<Route path="/Dashboard" element={<Dashboard />} />
				<Route path="/AdminHome" element={<AdminHome />} />
				<Route path="/Dashboard/AddStudent" element={<AddStudent />} />
				<Route path="/Dashboard/EditStudent" element={<EditStudent />} />
				<Route path="/Dashboard/AdminHome/v2" element={<AdminHomeV2 />} />
				<Route
					path="/Dashboard/ScheduledReleases"
					element={<AdminScheduledReleases />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
