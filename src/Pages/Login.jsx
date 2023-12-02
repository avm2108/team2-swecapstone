import React from "react";
import { useNavigate } from "react-router-dom";
import HeadImage from "../assets/Images/HeadImage.png";
import { Form } from "react-bootstrap";
function Login() {
	const navigate = useNavigate();
	const HandleSignIn = () => {
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
				<p>Welcome back!</p>
				<br />
				<Form style={{ width: "80%" }}>
					<Form.Group
						className="mb-3 position-relative"
						controlId="userForm.ControlInput1"
					>
						<Form.Control
							type="email"
							placeholder="Email"
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
							type="password"
							placeholder="Password"
							required
							className="border-danger border-3"
						/>
						<span className="required-indicator">*</span>
					</Form.Group>
				</Form>

				<button className="Sign-In-Button" onClick={HandleSignIn}>
					Sign In
				</button>
				<p id="forget-password">
					Forgot Password? <a href="/">Click here</a>
				</p>
			</div>
		</div>
	);
}

export default Login;
