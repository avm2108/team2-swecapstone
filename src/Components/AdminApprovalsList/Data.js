import img from "../../assets/Images/admin.jpg";

export const data = [
	{
		id: 1,
		status: "Pending",
		student: { name: "John Doe", pic: img },
		releaseDate: "10-9-2023",
		approvalDate: "N/A",
		guardian: {
			name: "Bobby The Builder",
			img: img,
		},
		reason: "Early Release for Doctor Appointment.",
	},
	{
		id: 2,
		status: "Approved",
		student: { name: "Alice Johnson", pic: img },
		releaseDate: "10-9-2023",
		approvalDate: "10-9-2023",
		guardian: {
			name: "Bobby The Builder",
			img: img,
		},
		reason: "Early Release for Doctor Appointment.",
	},
	{
		id: 3,
		status: "Approved",
		student: { name: "Olivia Gordon", pic: img },
		releaseDate: "10-9-2023",
		approvalDate: "10-12-2023",
		guardian: {
			name: "Bobby The Builder",
			img: img,
		},
		reason: "Early Release for Doctor Appointment.",
	},
	{
		id: 4,
		status: "Approved",
		student: { name: "Jessie Pinkman", pic: img },
		releaseDate: "10-9-2023",
		approvalDate: "9-10-2023",
		guardian: {
			name: "Bobby The Builder",
			img: img,
		},
		reason: "Early Release for Doctor Appointment.",
	},
	{
		id: 5,
		status: "Pending",
		student: { name: "Alice Johnson", pic: img },
		releaseDate: "10-9-2023",
		approvalDate: "N/A",
		guardian: {
			name: "Bobby The Builder",
			img: img,
		},
		reason: "Early Release for Doctor Appointment.",
	},
	{
		id: 6,
		status: "Approved",
		student: { name: "Alice Johnson", pic: img },
		releaseDate: "10-9-2023",
		approvalDate: "10-09-2023",
		guardian: {
			name: "Bobby The Builder",
			img: img,
		},
		reason: "Early Release for Doctor Appointment.",
	},
	{
		id: 7,
		status: "Approved",
		student: { name: "Alice Johnson", pic: img },
		releaseDate: "10-9-2023",
		approvalDate: "10-12-2023",
		guardian: {
			name: "Bobby The Builder",
			img: img,
		},
		reason: "Early Release for Doctor Appointment.",
	},
];
