# Time Tracker Web App

## Overview
The Time Tracker Web App is a simple web application designed to help users track the time spent on their drawing projects. Users can start and stop a timer, manage their projects, and save their data for future sessions.

## Features
- Start and stop timer functionality
- Add, edit, and delete projects
- View details of each project
- Load and save project data using JSON files
- Persistent storage of the active project data in local storage

## Project Structure
```
time-tracker-web-app
├── src
│   ├── index.html          # Main HTML document for the web app
│   ├── styles
│   │   └── style.css       # Styles for the web app
│   ├── scripts
│   │   ├── app.js          # Main JavaScript logic for timer and project management
│   │   └── storage.js      # Handles loading and saving project data
│   └── data
│       └── sample.json     # Sample JSON file with example project data
├── README.md               # Documentation for the project
└── .gitignore              # Specifies files to ignore by Git
```

## Getting Started
1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser to run the application.
3. Use the provided buttons to start and stop the timer, and manage your projects.

## Usage
- Click the "Start" button to begin tracking time on your current project.
- Click the "Stop" button to stop the timer and save the recorded time.
- Use the project management features to add, edit, or delete projects as needed.
- Load a custom JSON file from local storage to manage your project data.

## Contributing
Feel free to submit issues or pull requests to improve the application. Your contributions are welcome!

## License
This project is open-source and available under the MIT License.