let projects = [];
let activeProjectId = null;
let timerIntervals = {};
let selectedFileName = 'projects.json'; // Default file name for saving

// DOM Elements
const projectList = document.getElementById('projectList');
const totalProjects = document.getElementById('totalProjects');
const addProjectButton = document.getElementById('addProjectButton');
const loadFileButton = document.getElementById('loadFileButton');
const downloadDataButton = document.getElementById('downloadDataButton'); // DOM Element for Download Data Button

// Add New Project
addProjectButton.addEventListener('click', () => {
    const projectName = prompt('Enter project name:');
    if (!projectName) return;

    const now = new Date().toISOString();

    const newProject = {
        id: Date.now(),
        name: projectName,
        totalTime: 0,
        dateCreated: now,
        lastTrackingDate: null,
        sessions: [],
    };

    projects.push(newProject);
    saveProjects();
    renderProjects();
});

// Load New File
loadFileButton.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        selectedFileName = file.name; // Save the selected file name
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                projects = JSON.parse(e.target.result).projects || [];
                saveProjects();
                renderProjects();
            } catch (error) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    });
    fileInput.click();
});

// Render Projects
function renderProjects() {
    projectList.innerHTML = ''; // Clear the project list
    totalProjects.textContent = projects.length; // Update total projects count

    projects.forEach((project) => {
        const projectRow = document.createElement('div');
        projectRow.className = 'project-row';

        // Add 'active-project' class if this project is being tracked
        if (activeProjectId === project.id) {
            projectRow.classList.add('active-project');
        }

        // Display project name, total time, and action buttons
        projectRow.innerHTML = `
            <span>${project.name}</span>
            <span>${formatTime(project.totalTime)}</span>
            <button class="start-stop-btn">${activeProjectId === project.id ? 'Stop' : 'Start'}</button>
            <button class="edit-btn">Edit</button>
            <button class="details-btn">Details</button>
            <button class="delete-btn">Delete</button>
        `;

        // Start/Stop Button
        projectRow.querySelector('.start-stop-btn').addEventListener('click', () => {
            if (activeProjectId === project.id) {
                stopTimer(project);
            } else {
                startTimer(project);
            }
        });

        // Edit Button
        projectRow.querySelector('.edit-btn').addEventListener('click', () => {
            const newName = prompt('Edit project name:', project.name);
            if (newName) {
                project.name = newName;
                saveProjects();
                renderProjects();
            }
        });

        // Details Button
        projectRow.querySelector('.details-btn').addEventListener('click', () => {
            alert(`Project: ${project.name}\nTotal Time: ${formatTime(project.totalTime)}\nDate Created: ${new Date(
                project.dateCreated
            ).toLocaleString()}\nLast Tracked: ${
                project.lastTrackingDate ? new Date(project.lastTrackingDate).toLocaleString() : 'Never'
            }`);
        });

        // Delete Button
        projectRow.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete "${project.name}"?`)) {
                projects = projects.filter((p) => p.id !== project.id);
                if (activeProjectId === project.id) stopTimer(project);
                saveProjects();
                renderProjects();
            }
        });

        projectList.appendChild(projectRow);
    });
}

// Start Timer
function startTimer(project) {
    if (activeProjectId) stopTimer(projects.find((p) => p.id === activeProjectId)); // Stop any active project

    activeProjectId = project.id; // Set the current project as active
    const startTime = Date.now() - project.totalTime; // Adjust start time based on total time

    // Start the timer interval
    timerIntervals[project.id] = setInterval(() => {
        project.totalTime = Date.now() - startTime; // Update total time
        saveProjects(); // Save to browser cache
        renderProjects(); // Re-render the project list
    }, 1000);
}

// Stop Timer
function stopTimer(project) {
    clearInterval(timerIntervals[project.id]); // Clear the timer interval
    project.lastTrackingDate = new Date().toISOString(); // Update the last tracking date
    activeProjectId = null; // Clear the active project
    saveProjects(); // Save to browser cache
    renderProjects(); // Re-render the project list
}

// Save Projects to Local Storage (Browser Cache)
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Save to JSON File (Triggered by "Download Data" Button)
function saveToFile() {
    const dataStr = JSON.stringify({ projects }, null, 2); // Format JSON with indentation
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary download link
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFileName;
    a.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
}

// Load Projects from Local Storage
function loadProjects() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
    }
    renderProjects();
}

// Event Listener for "Download Data" Button
downloadDataButton.addEventListener('click', () => {
    saveToFile(); // Trigger file download
});

// Format Time in HH:MM:SS
function formatTime(ms) {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Initialize App
loadProjects();