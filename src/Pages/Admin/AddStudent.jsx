import React, { useState } from "react";
import Header from "../../Components/Header";
import Container from "../../Components/Container";

const AddStudent = () => {
	// Form Data
	const [formData, setFormData] = useState({
		student: {
			firstName: "",
			lastName: "",
			gradeLevel: "",
			address: "",
			apartment: "",
			city: "",
			state: "",
			zipCode: "",
			dob: "",
			image: "",
		},
		guardians: [
			{
				firstName: "",
				lastName: "",
				phoneNumber: "",
				email: "",
				relation: "",
				image: null,
			},
		],
	});

	// Function to add a new guardian section
	const addGuardian = () => {
		setFormData((prevData) => ({
			...prevData,
			guardians: [
				...prevData.guardians,
				{
					firstName: "",
					lastName: "",
					phoneNumber: "",
					email: "",
					relation: "",
				},
			],
		}));
	};

	// Handle Form Change
	const handleChange = (e, index) => {
		const { name, value } = e.target;

		if (index === undefined) {
			// If index is undefined, update student data
			setFormData((prevData) => ({
				...prevData,
				student: {
					...prevData.student,
					[name]: value,
				},
			}));
		} else {
			// If index is defined, update guardian data
			setFormData((prevData) => ({
				...prevData,
				guardians: prevData.guardians.map((guardian, i) => {
					if (i === index) {
						return {
							...guardian,
							[name]: value,
						};
					}
					return guardian;
				}),
			}));
		}
	};

	const handleGuardianImageChange = (e, index) => {
		const selectedImage = e.target.files[0];

		if (index !== undefined) {
			console.log("yes");
			setFormData((prevData) => ({
				...prevData,
				guardians: prevData.guardians.map((guardian, i) => {
					if (i === index) {
						return {
							...guardian,
							image: URL.createObjectURL(selectedImage),
						};
					}
					return guardian;
				}),
			}));
		} else {
			console.log("no");
			setFormData((prevData) => ({
				...prevData,
				student: {
					...prevData.student,
					image: URL.createObjectURL(selectedImage),
				},
			}));
		}
	};

	// Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form Data:", formData);
		setFormData({
			student: {
				firstName: "",
				lastName: "",
				gradeLevel: "",
				address: "",
				apartment: "",
				city: "",
				state: "",
				zipCode: "",
				dob: "",
				img: "",
			},
			guardians: [
				{
					firstName: "",
					lastName: "",
					phoneNumber: "",
					email: "",
					relation: "",
					image: null,
				},
			],
		});
	};

	return (
		<>
			<Header />

			{/* Heading */}
			<div className="heading text-[#214C34] w-[100vw] h-14 mt-20 flex justify-center items-center border-b-[1px] border-maingreen">
				<h1 className="text-[1.4rem] m-auto">Add Student</h1>
			</div>

			{/* // form */}

			<Container>
				<h2 className="text-[1rem] my-3 text-[#214c34]">Student Details</h2>
				<form
					onSubmit={handleSubmit}
					className="flex justify-center flex-col mt-4 w-[100%]"
				>
					{/* Image input on the left */}
					<div className="flex flex-col items-center mr-8">
						<label htmlFor="upload" className="mb-4">
							{formData.student.image ? (
								<img
									src={formData.student.image}
									alt="Uploaded"
									className="w-48 h-48 object-cover"
								/>
							) : (
								<div className="w-48 h-48 border border-gray-300 flex items-center justify-center font-roboto">
									Upload Image
								</div>
							)}
							<input
								type="file"
								id="upload"
								className="hidden"
								accept="image/*"
								onChange={(e) => handleGuardianImageChange(e)}
							/>
						</label>
					</div>
					<div className="flex flex-col items-center">
						{/* First Name Input */}
						<div className="form-input">
							<label htmlFor="firstName">First Name</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								value={formData.student.firstName}
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>
						{/* Last Name Input */}
						<div className="form-input">
							<label htmlFor="lastName">Last Name</label>
							<input
								type="text"
								name="lastName"
								id="lastName"
								value={formData.student.lastName}
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>

						{/* Date of Birth */}
						<div className="form-input">
							<label htmlFor="dob">Date of Birth</label>
							<input
								type="date"
								name="dob"
								id="dob"
								pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
								value={formData.student.dob}
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>

						{/* Grade Level Dropdown */}
						<div className="form-input">
							<label htmlFor="gradeLevel">Grade Level</label>
							<select
								name="gradeLevel"
								id="gradeLevel"
								value={formData.student.gradeLevel}
								onChange={(e) => handleChange(e)}
								required
								className=""
							>
								<option value="">Select Grade</option>
								<option value="A+">A+</option>
								<option value="A">A</option>
								<option value="B+">B+</option>
								<option value="B-">B-</option>
							</select>
						</div>

						{/* Address Input */}
						<div className="form-input">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								name="address"
								id="address"
								value={formData.student.address}
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>

						{/* Apartment Input */}
						<div className="form-input">
							<label htmlFor="apartment">Apartment, Suite, etc.</label>
							<input
								type="text"
								name="apartment"
								id="apartment"
								value={formData.student.apartment}
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>

						{/* City Input */}
						<div className="form-input">
							<label htmlFor="city">City</label>
							<input
								type="text"
								name="city"
								id="city"
								value={formData.student.city}
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>

						{/* State Input */}
						<div className="form-input">
							<label htmlFor="state">State/Province</label>
							<input
								type="text"
								name="state"
								id="state"
								value={formData.student.state}
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>

						{/* Zip Code Input */}
						<div className="form-input">
							<label htmlFor="zipCode">Zip Code</label>
							<input
								type="text"
								name="zipCode"
								id="zipCode"
								value={formData.student.zipCode}
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>
					</div>

					<div className="w-[100%] flex justify-between items-center">
						<h2 className="text-[1.1rem] my-3 text-[#214c34]">
							Guardian Details
						</h2>
						<button
							onClick={addGuardian}
							className="border-b-[1px] border-maingreen text-maingreen h-6"
						>
							+Add Guardian
						</button>
					</div>

					{formData.guardians.map((guardian, index) => (
						<div key={index} className="flex flex-col items-center mt-4 mb-0">
							<div className="flex justify-between items-center w-[100%] mb-4">
								<h3 className="text-[1rem] ml-0 mr-auto">
									Guardian {index + 1}
								</h3>
								<div className="w-[70%] h-[1px] bg-maingreen"></div>
							</div>
							{/* Image input for guardian */}
							<div className="flex flex-col items-center mr-8">
								<label htmlFor={`upload-${index}`} className="mb-4">
									{guardian.image ? (
										<img
											src={guardian.image}
											alt="Uploaded"
											className="w-48 h-48 object-cover"
										/>
									) : (
										<div className="w-48 h-48 border border-gray-300 flex items-center justify-center font-roboto">
											Upload Image
										</div>
									)}
									<input
										type="file"
										id={`upload-${index}`}
										className="hidden"
										accept="image/*"
										onChange={(e) => handleGuardianImageChange(e, index)}
									/>
								</label>
							</div>

							{/* Guardian First Name */}
							<div className="form-input">
								<label htmlFor="firstName">First Name</label>
								<input
									type="text"
									name="firstName"
									id="firstName"
									value={guardian.firstName}
									onChange={(e) => handleChange(e, index)}
									required
								/>
							</div>

							{/* Guardian Last Name */}
							<div className="form-input">
								<label htmlFor="lastName">Last Name</label>
								<input
									type="text"
									name="lastName"
									id="lastName"
									value={guardian.lastName}
									onChange={(e) => handleChange(e, index)}
									required
								/>
							</div>

							{/* Guardian Phone Number */}
							<div className="form-input">
								<label htmlFor="phoneNumber">Phone Number</label>
								<input
									type="number"
									name="phoneNumber"
									id="phoneNumber"
									value={guardian.phoneNumber}
									onChange={(e) => handleChange(e, index)}
									required
								/>
							</div>

							{/* Email */}
							<div className="form-input">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									name="email"
									id="email"
									value={guardian.email}
									onChange={(e) => handleChange(e, index)}
									required
								/>
							</div>

							{/* Relation */}
							<div className="form-input">
								<label htmlFor="relation">Child Relation</label>
								<input
									type="text"
									name="relation"
									id="relation"
									value={guardian.relation}
									onChange={(e) => handleChange(e, index)}
									required
								/>
							</div>
						</div>
					))}

					{/* Submit Button */}
					<div className="buttons flex w-[88%] h-auto justify-around mx-auto mb-4">
						<button
							type="button"
							className="border-[#ca0000] border-[1px] rounded-xl text-[#CA0000] px-4 py-2 mt-4"
							onClick={handleSubmit}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="rounded-xl text-white bg-maingreen px-4 py-2 mt-4"
						>
							Submit
						</button>
					</div>
				</form>
			</Container>
		</>
	);
};

export default AddStudent;
