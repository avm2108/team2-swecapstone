import React from "react";
import { useNavigate } from "react-router-dom";
import HeadImage from "../assets/Images/HeadImage.png";
import { Form } from "react-bootstrap";
function RegisterSchool() {
	const navigate = useNavigate();
	const HandleRegisterSchool = () => {
		navigate("/Dashboard");
	};

	return (
		<div className="home-container-main">
			<img src={HeadImage} className="image-Setting" alt="Not found" />
			<br />
			<br />
			<div className="home-container-Login">
				<br />
				<br />
				<p>Register Your School</p>
				<br />
				<Form style={{ width: "80%" }}>
					<Form.Group
						className="mb-3 position-relative"
						controlId="userForm.ControlInput1"
					>
						<Form.Control
							type="text"
							placeholder="School Name"
							required
							className="border-success border-3"
						/>
						<span className="required-indicator">*</span>
					</Form.Group>
					<Form.Group
						className="mb-3 position-relative"
						controlId="userForm.password"
					>
						<Form.Control
							type="text"
							placeholder="School Code"
							required
							className="border-success border-3"
						/>
						<span className="required-indicator">*</span>
					</Form.Group>
					<Form.Group
						className="mb-3 position-relative"
						controlId="userForm.ControlInput1"
					>
						<Form.Control
							type="text"
							placeholder="Dismissal Time"
							required
							className="border-danger border-3"
						/>
						<span className="required-indicator">*</span>
					</Form.Group>
				</Form>

				<button className="Sign-In-Button" onClick={HandleRegisterSchool}>
					Register
				</button>
			</div>
		</div>
	);
}

export default RegisterSchool;
