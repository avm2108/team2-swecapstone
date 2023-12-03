# SWE7903 Software Engineering Capstone

## Team 2 Introduction 
- Iya Massah - Product Owner
- Alexis McNeill - Team Lead
- Milly Namukasa - Scrum Master
- Ryheem Heard - iOS & Backend Developer
- Kiran Kumar Burugu - Android Developer
- Gabriel Peret Pimentel - Android Developer

## Project Description 

Scooper is a mobile application designed to address challenges associated with school drop off and pick up. Scooper will function seamlessly across different devices and platforms including mobile devices and desktops.

## Technology Stack 
- Communication: Microsoft Teams
- Project Management: Trello
- Version Control: GitHub
- Frontend: Swift, React, JavaScript
- Database: Firebase
- External APIs: Core Location (Geofencing)

## Stakeholders
Scooper's stakeholders consist of Iya (client), school administration, faculty, staff, parents, and the Scooper development team.

# Building and Running Application
## Prerequisites
- [Node.js](https://nodejs.org/en/download/)
* Ensure that Node.js is available on your PATH. You can test it by running:
```bash
node --version
```

## Installation
1. Clone the repository
2. Install dependencies
* From the root project directory run:
```bash
npm run build-app
```
- This will install the dependencies needed by the frontend and the backend.
3. The previous step will also create a ".env" configuration file in the root of the backend directory. This file contains environmental variables that are used by the backend server, and as each developer will have different values for these variables, it is not included in the repository. The .env file holds fields by default to specify the port on which the backend server will run, the MongoDB connection string, and the secret key used to sign JWTs and cookies. You will need to fill in these fields with the appropriate values for your local environment.
4. Start the application
* From the root project directory run:
```bash
npm start
```
- This will start the frontend development server. A browser window should open automatically and navigate to http://localhost:3000. If it does not, you can manually navigate to that URL.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
